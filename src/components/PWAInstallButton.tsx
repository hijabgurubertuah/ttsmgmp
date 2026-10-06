import React, { useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="flex items-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:bg-teal-800 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white shadow-xs transition cursor-pointer whitespace-nowrap shrink-0"
        title="Pasang Aplikasi TTS ke Layar Utama"
      >
        <Download className="w-3.5 h-3.5" />
        <span>INSTAL</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-teal-600/30 bg-teal-50 dark:bg-neutral-800 px-2.5 py-1.5 text-xs font-bold text-teal-800 dark:text-teal-200 hover:bg-teal-100 transition cursor-pointer whitespace-nowrap shrink-0"
          title="Petunjuk Pasang di iPhone/iPad"
        >
          <PlusSquare className="w-3.5 h-3.5 text-teal-600" />
          <span>INSTAL</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Pasang di iPhone / iPad
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="text-xs text-neutral-700 dark:text-neutral-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li className="flex items-center gap-1.5">
                  <span>Ketuk ikon</span>
                  <Share className="w-4 h-4 text-blue-500 inline shrink-0" />
                  <strong>Bagikan (Share)</strong> di Safari.
                </li>
                <li>
                  Gulir ke bawah lalu pilih <strong>Tambahkan ke Layar Utama</strong> (Add to Home Screen).
                </li>
                <li>
                  Ketuk <strong>Tambah</strong> di pojok kanan atas.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full mt-2 rounded-xl bg-teal-600 hover:bg-teal-700 py-2 text-xs font-bold text-white transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
