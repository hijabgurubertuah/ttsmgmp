import React from 'react';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { PWAInstallButton } from './components/PWAInstallButton';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d9488] text-slate-900 font-sans antialiased">
      {/* Header Bersih & Minimalis */}
      <header className="print:hidden bg-white/95 backdrop-blur-sm border-b border-teal-700/20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/pwa-192x192.png"
              alt="Logo TTS Maker"
              className="w-10 h-10 rounded-xl object-cover shadow-2xs border border-teal-600/20 shrink-0"
            />
            <div>
              <h1 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
                BUAT TTS SEMUA MATA PELAJARAN
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 italic leading-tight mt-0.5">
                KARYA MGMP IPA KECAMATAN BENGKALIS RIAU
              </p>
            </div>
          </div>

          {/* Tombol Install PWA */}
          <div className="flex items-center gap-2">
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
