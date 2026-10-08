import React, { useState } from 'react';
import { Download, Share, X, Monitor, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:bg-teal-800 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white shadow-xs transition cursor-pointer whitespace-nowrap shrink-0"
        title="Instal Aplikasi TTS ke Layar Utama"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>INSTAL</span>
      </button>

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-600" />
                <span>Instal Aplikasi TTS</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Petunjuk Pasang di iPhone / iPad:
                </p>
                <ol className="text-xs text-neutral-600 dark:text-neutral-300 space-y-2 list-decimal list-inside leading-relaxed">
                  <li className="flex items-center gap-1.5">
                    <span>Ketuk tombol</span>
                    <Share className="w-4 h-4 text-blue-500 inline shrink-0" />
                    <strong>Bagikan (Share)</strong> di Safari.
                  </li>
                  <li>
                    Gulir lalu pilih <strong>Tambahkan ke Layar Utama</strong> (Add to Home Screen).
                  </li>
                  <li>
                    Ketuk <strong>Tambah</strong> di pojok kanan atas.
                  </li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <Smartphone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">Di Smartphone Android:</p>
                    <p className="leading-relaxed mt-0.5">
                      Ketuk menu titik tiga (<strong>⋮</strong>) di Chrome, lalu pilih <strong>Tambahkan ke Layar Utama</strong> atau <strong>Instal Aplikasi</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Monitor className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">Di Komputer / Laptop:</p>
                    <p className="leading-relaxed mt-0.5">
                      Klik ikon instal di bilah alamat browser, atau klik menu titik tiga (<strong>⋮</strong>) &gt; <strong>Instal Aplikasi</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full mt-2 rounded-xl bg-teal-600 hover:bg-teal-700 py-2 text-xs font-bold text-white transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
