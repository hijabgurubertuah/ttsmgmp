import { useState, useEffect } from 'react';
import {
  doc,
  setDoc,
  increment,
  onSnapshot,
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
      setDoc(
        statsDocRef,
        {
          totalVisitors: increment(1),
          todayVisitors: increment(1),
          todayDate: todayStr,
        },
        { merge: true }
      )
        .then(() => {
          localStorage.setItem('tts_visited_date', todayStr);
        })
        .catch((err) => {
          console.warn('Failed to update visitor count:', err);
        });
    }

    // 3. Online Presence Heartbeat
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
    const heartbeatInterval = setInterval(sendHeartbeat, 20000); // heartbeat every 20s

    // 4. Realtime Listener for Total and Today Visitors
    const unsubscribeStats = onSnapshot(
      statsDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.todayDate === todayStr) {
            setTodayVisitors(data.todayVisitors || 0);
          } else {
            setTodayVisitors(1);
          }
          setTotalVisitors(data.totalVisitors || 0);
        } else {
          // Initialize if document does not exist yet
          setDoc(statsDocRef, {
            totalVisitors: 1,
            todayVisitors: 1,
            todayDate: todayStr,
          }, { merge: true }).catch(() => {});
        }
        setIsLoading(false);
      },
      (err) => {
        console.warn('Stats snapshot error:', err);
        setIsLoading(false);
      }
    );

    // 5. Realtime Listener for Online Presence Count
    const presenceColRef = collection(db, 'presence');
    const unsubscribePresence = onSnapshot(
      presenceColRef,
      (snapshot) => {
        const now = Date.now();
        let activeUsers = 0;
        snapshot.forEach((d) => {
          const pData = d.data();
          if (pData.updatedAt && now - pData.updatedAt < 60000) {
            activeUsers++;
          }
        });
        setOnlineCount(Math.max(1, activeUsers));
      },
      (err) => {
        console.warn('Presence snapshot error:', err);
      }
    );

    return () => {
      clearInterval(heartbeatInterval);
      unsubscribeStats();
      unsubscribePresence();
      deleteDoc(presenceDocRef).catch(() => {});
    };
  }, []);

  return { totalVisitors, todayVisitors, onlineCount, isLoading };
}

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
