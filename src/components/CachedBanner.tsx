import React, { useEffect, useState } from 'react';

const DB_NAME = 'mgmp_tts_offline_assets';
const STORE_NAME = 'banners';
const BANNER_KEY = 'top_banner_cover';
const LOCAL_URL = '/banner-mgmp.png';
const REMOTE_URL = 'https://i.ibb.co.com/prynFRkH/1000353298.png';

// Buka / Inisialisasi IndexedDB
function openBannerDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Ambil Blob dari IndexedDB
async function getCachedBannerBlob(): Promise<Blob | null> {
  try {
    const db = await openBannerDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(BANNER_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Simpan Blob ke IndexedDB
async function saveBannerBlob(blob: Blob): Promise<void> {
  try {
    const db = await openBannerDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(blob, BANNER_KEY);
  } catch (err) {
    console.warn('Gagal menyimpan cache offline banner:', err);
  }
}

// Simpan ke CacheStorage API (PWA Offline Cache)
async function saveToCacheStorage(url: string, response: Response): Promise<void> {
  if ('caches' in window) {
    try {
      const cache = await caches.open('banner-images-cache');
      await cache.put(url, response.clone());
    } catch {
      // Abaikan jika tidak didukung
    }
  }
}

export const CachedBanner: React.FC = () => {
  // Default URL lokal yang sudah di-precache
  const [src, setSrc] = useState<string>(LOCAL_URL);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    let createdUrl: string | null = null;

    const loadAndCacheBanner = async () => {
      // 1. Coba ambil dari IndexedDB (sangat tahan hard-refresh dan 100% offline)
      const cachedBlob = await getCachedBannerBlob();
      if (cachedBlob && active) {
        createdUrl = URL.createObjectURL(cachedBlob);
        setSrc(createdUrl);
        setIsReady(true);
        return;
      }

      // 2. Coba ambil dari CacheStorage API
      if ('caches' in window) {
        try {
          const cache = await caches.open('banner-images-cache');
          let cachedResponse = await cache.match(LOCAL_URL);
          if (!cachedResponse) {
            cachedResponse = await cache.match(REMOTE_URL);
          }
          if (cachedResponse) {
            const blob = await cachedResponse.blob();
            if (active) {
              createdUrl = URL.createObjectURL(blob);
              setSrc(createdUrl);
              setIsReady(true);
              // Simpan juga ke IndexedDB untuk render super cepat berikutnya
              saveBannerBlob(blob);
              return;
            }
          }
        } catch {
          // Lanjutkan ke fetch jika error
        }
      }

      // 3. Jika belum ada di cache, unduh dari file lokal atau remote, lalu simpan ke offline cache
      try {
        let res: Response;
        try {
          res = await fetch(LOCAL_URL);
          if (!res.ok) throw new Error('Local banner fetch failed');
        } catch {
          res = await fetch(REMOTE_URL);
        }

        if (res.ok) {
          await saveToCacheStorage(LOCAL_URL, res);
          const blob = await res.blob();
          if (active) {
            await saveBannerBlob(blob);
            createdUrl = URL.createObjectURL(blob);
            setSrc(createdUrl);
            setIsReady(true);
          }
        }
      } catch (err) {
        console.warn('Gagal memuat banner untuk offline cache:', err);
        if (active) {
          // Tetap gunakan LOCAL_URL atau REMOTE_URL sebagai fallback
          setSrc(LOCAL_URL);
          setIsReady(true);
        }
      }
    };

    loadAndCacheBanner();

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, []);

  return (
    <img
      src={src}
      alt="Banner MGMP IPA Bengkalis"
      className="w-full h-auto block object-cover max-h-48 mx-auto"
      loading="eager"
      decoding="sync"
      onError={(e) => {
        // Fallback jika salah satu path gagal
        const target = e.currentTarget;
        if (target.src !== REMOTE_URL && !target.src.startsWith('blob:')) {
          target.src = REMOTE_URL;
        }
      }}
      style={{
        opacity: isReady ? 1 : 0.95,
        transition: 'opacity 0.2s ease-in-out',
      }}
    />
  );
};
