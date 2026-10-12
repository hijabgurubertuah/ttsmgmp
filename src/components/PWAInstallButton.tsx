import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'desktop' | 'mobile-floating' | 'all';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'all' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);

  // Jika aplikasi sudah di-instal, hilangkan tombol dan komponen
  if (isInstalled) {
    return null;
  }

  const handleOpenModal = () => {
    setShowModal(true);
    setShowIOSTip(false);
  };

  const handleConfirmInstall = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setShowModal(false);
      }
    } else if (isIOS) {
      // Pada perangkat iOS (Safari), tunjukkan langkah cepat
      setShowIOSTip(true);
    } else {
      // Browser umum di mana beforeinstallprompt mungkin belum tertrigger atau tidak didukung
      // Berikan instruksi langsung
      setShowIOSTip(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowIOSTip(false);
  };

  const renderDesktopButton = () => (
    <button
      type="button"
      onClick={handleOpenModal}
      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:bg-teal-800 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition cursor-pointer whitespace-nowrap shrink-0"
      title="Instal Aplikasi TTS"
    >
      <Download className="w-3.5 h-3.5 shrink-0" />
      <span>INSTAL</span>
    </button>
  );

  const renderMobileFloatingButton = () => (
    <button
      type="button"
      onClick={handleOpenModal}
      className="fixed bottom-6 right-5 z-40 flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-3 shadow-xl shadow-emerald-950/30 text-sm font-extrabold tracking-wide transition-all duration-200 cursor-pointer border-2 border-white/40 ring-4 ring-emerald-500/20"
      title="Instal Aplikasi TTS untuk Akses Cepat"
    >
      <Download className="w-4 h-4 stroke-[2.5] shrink-0 animate-bounce" />
      <span>INSTAL</span>
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

      {/* Popup Konfirmasi Instal Minimalis */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 text-center space-y-6">
            
            {/* Teks Minimalis Sesuai Permintaan Pengguna */}
            <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-snug px-1">
              Instal Aplikasi TTS untuk Akses Cepat ?
            </h2>

            {/* Petunjuk khusus jika browser membutuhkan manual Add to Home Screen (misal di Safari iOS atau browser tanpa direct prompt) */}
            {showIOSTip && (
              <div className="bg-amber-50 text-amber-900 border border-amber-200 rounded-xl p-3 text-xs leading-relaxed text-left">
                {isIOS ? (
                  <span>
                    Ketuk menu <strong>Bagikan (Share)</strong> di browser Safari, lalu pilih <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong>.
                  </span>
                ) : (
                  <span>
                    Ketuk menu titik tiga (<strong>⋮</strong>) di browser Anda, lalu pilih <strong>Instal Aplikasi</strong> atau <strong>Tambahkan ke Layar Utama</strong>.
                  </span>
                )}
              </div>
            )}

            {/* Tombol Besar INSTAL dan BATAL Berwarna Menarik */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleConfirmInstall}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 active:scale-98 text-white font-black text-sm tracking-wider uppercase shadow-lg shadow-teal-500/25 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>INSTAL</span>
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 active:scale-98 text-white font-black text-sm tracking-wider uppercase shadow-lg shadow-rose-500/20 transition cursor-pointer"
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
