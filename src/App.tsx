import React from 'react';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { PWAInstallButton } from './components/PWAInstallButton';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d9488] text-slate-900 font-sans antialiased">
      {/* Header Bersih & Minimalis */}
      <header className="print:hidden bg-white/95 backdrop-blur-sm border-b border-teal-700/20 shadow-xs">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <img
              src="/pwa-192x192.png"
              alt="Logo TTS Maker"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-2xs border border-teal-600/20 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-xs sm:text-base md:text-lg text-slate-900 leading-tight whitespace-nowrap truncate">
                BUAT TTS SEMUA MATA PELAJARAN
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 italic leading-tight mt-0.5 whitespace-nowrap truncate">
                KARYA MGMP IPA KECAMATAN BENGKALIS RIAU
              </p>
            </div>
          </div>

          {/* Tombol Install PWA */}
          <div className="flex items-center shrink-0">
            <PWAInstallButton />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 print:p-0 print:m-0 print:max-w-none">
        <WorksheetGenerator />
      </main>
    </div>
  );
}
