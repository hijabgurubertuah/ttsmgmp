import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'desktop' | 'mobile-floating' | 'all';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'all' }) => {
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

  const renderDesktopButton = () => (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:bg-teal-800 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition cursor-pointer whitespace-nowrap shrink-0"
      title="Instal Aplikasi TTS ke Layar Utama"
    >
      <Download className="w-3.5 h-3.5 shrink-0" />
      <span>INSTAL</span>
    </button>
  );

  const renderMobileFloatingButton = () => (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-3.5 py-2.5 shadow-lg shadow-teal-950/25 text-xs font-bold transition-all duration-200 cursor-pointer border border-white/20"
      title="Instal Aplikasi ke Layar Utama"
    >
      <Download className="w-4 h-4 shrink-0" />
      <span>Instal</span>
    </button>
  );

  return (
    <>
      {variant === 'desktop' && renderDesktopButton()}
      {variant === 'mobile-floating' && renderMobileFloatingButton()}
      {variant === 'all' && (
        <>
          <div className="hidden sm:inline-flex">{renderDesktopButton()}</div>
          <div className="sm:hidden">{renderMobileFloatingButton()}</div>
        </>
      )}

      {/* Popup Minimalis saat belum diinstal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl border border-slate-100 text-center space-y-3">
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <Download className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">Instal Aplikasi</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {isIOS ? (
                  <>
                    Ketuk menu <span className="font-semibold text-slate-700">Bagikan</span> di Safari, lalu pilih <span className="font-semibold text-slate-700">Tambahkan ke Layar Utama</span>.
                  </>
                ) : (
                  <>
                    Ketuk menu titik tiga (<span className="font-bold text-slate-700">⋮</span>) di browser, lalu pilih <span className="font-semibold text-slate-700">Instal Aplikasi</span> atau <span className="font-semibold text-slate-700">Tambahkan ke Layar Utama</span>.
                  </>
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full mt-1 py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
};
