import { useState, useEffect } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  runTransaction,
  serverTimestamp,
  deleteDoc,
  collection,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  onlineCount: number;
  isLoading: boolean;
}

export function useVisitorStats(): VisitorStats {
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [todayVisitors, setTodayVisitors] = useState<number>(0);
  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Get or create session ID for online presence
    let sessionId = sessionStorage.getItem('tts_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      sessionStorage.setItem('tts_session_id', sessionId);
    }

    const todayStr = getTodayDateString();
    const statsDocRef = doc(db, 'stats', 'visitor_counter');
    const presenceDocRef = doc(db, 'presence', sessionId);

    // 2. Register visitor count if not visited today
    const visitedDate = localStorage.getItem('tts_visited_date');
    if (visitedDate !== todayStr) {
      runTransaction(db, async (transaction) => {
        const statsDoc = await transaction.get(statsDocRef);
        if (!statsDoc.exists()) {
          const initialData = {
            totalVisitors: 1,
            todayVisitors: 1,
            todayDate: todayStr,
          };
          transaction.set(statsDocRef, initialData);
          return { total: 1, today: 1 };
        } else {
          const data = statsDoc.data();
          const isNewDay = data.todayDate !== todayStr;
          const currentTotal = typeof data.totalVisitors === 'number' ? data.totalVisitors : 0;
          const currentToday = typeof data.todayVisitors === 'number' ? data.todayVisitors : 0;

          const nextTotal = currentTotal + 1;
          const nextToday = isNewDay ? 1 : currentToday + 1;

          transaction.update(statsDocRef, {
            totalVisitors: nextTotal,
            todayVisitors: nextToday,
            todayDate: todayStr,
          });
          return { total: nextTotal, today: nextToday };
        }
      })
        .then((result) => {
          localStorage.setItem('tts_visited_date', todayStr);
          if (isMounted && result) {
            setTotalVisitors(result.total);
            setTodayVisitors(result.today);
          }
        })
        .catch((err) => {
          console.warn('Failed to update visitor count:', err);
        });
    }

    // 3. Online Presence Heartbeat (every 30 seconds)
    const sendHeartbeat = () => {
      setDoc(
        presenceDocRef,
        {
          sessionId,
          lastSeen: serverTimestamp(),
          updatedAt: Date.now(),
        },
        { merge: true }
      ).catch(() => {});
    };

    sendHeartbeat();
    const heartbeatInterval = setInterval(sendHeartbeat, 30000);

    // 4. Fetch Stats (Total & Today Visitors) periodically every 60 seconds
    const fetchStats = async () => {
      try {
        const snap = await getDoc(statsDocRef);
        if (isMounted) {
          if (snap.exists()) {
            const data = snap.data();
            const total = typeof data.totalVisitors === 'number' ? data.totalVisitors : 1;
            // Jika tanggal di server sama dengan hari ini, gunakan todayVisitors.
            // Jika tanggal di server adalah kemarin/sebelumnya dan belum ada yang berkunjung hari ini, set 0.
            const today = data.todayDate === todayStr ? (data.todayVisitors || 1) : 0;
            setTotalVisitors(total);
            setTodayVisitors(today);
          } else {
            setTotalVisitors(1);
            setTodayVisitors(1);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Error fetching visitor stats:', err);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchStats();
    const statsInterval = setInterval(fetchStats, 60000);

    // 5. Fetch Online Presence Count periodically every 30 seconds
    const fetchPresence = async () => {
      try {
        const snap = await getDocs(collection(db, 'presence'));
        if (isMounted) {
          const now = Date.now();
          let activeUsers = 0;
          snap.forEach((d) => {
            const pData = d.data();
            if (pData.updatedAt && now - pData.updatedAt < 75000) {
              activeUsers++;
            }
          });
          setOnlineCount(Math.max(1, activeUsers));
        }
      } catch (err) {
        console.warn('Error fetching presence:', err);
      }
    };

    fetchPresence();
    const presenceInterval = setInterval(fetchPresence, 30000);

    return () => {
      isMounted = false;
      clearInterval(heartbeatInterval);
      clearInterval(statsInterval);
      clearInterval(presenceInterval);
      deleteDoc(presenceDocRef).catch(() => {});
    };
  }, []);

  return { totalVisitors, todayVisitors, onlineCount, isLoading };
}

function getTodayDateString(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date());
  } catch {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
