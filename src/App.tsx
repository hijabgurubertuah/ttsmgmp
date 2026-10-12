import React from 'react';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { CachedBanner } from './components/CachedBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d9488] text-slate-900 font-sans antialiased">
      {/* Banner Cover - Hanya muncul di HP (Mobile), tidak ada cover di tampilan desktop */}
      <div className="sm:hidden print:hidden w-full bg-slate-900 shadow-sm border-b border-teal-800/30">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <CachedBanner />
        </div>
      </div>

      {/* Header Bersih & Minimalis - Hanya di Desktop (di HP dihapus/disembunyikan) */}
      <header className="hidden sm:block print:hidden bg-white/95 backdrop-blur-sm border-b border-teal-700/20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src="/pwa-192x192.png"
              alt="Logo TTS Maker"
              className="w-10 h-10 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-sm md:text-base lg:text-lg text-slate-900 leading-tight whitespace-nowrap">
                BUAT TTS SEMUA MATA PELAJARAN
              </h1>
              <p className="text-xs text-slate-500 italic leading-tight mt-0.5 whitespace-nowrap">
                KARYA MGMP IPA KECAMATAN BENGKALIS RIAU
              </p>
            </div>
          </div>

          {/* Tombol Install PWA untuk Desktop */}
          <div className="flex items-center shrink-0">
            <PWAInstallButton variant="desktop" />
          </div>
        </div>
      </header>

      {/* Tombol Install Melayang untuk Tampilan HP (Mobile) */}
      <div className="sm:hidden print:hidden">
        <PWAInstallButton variant="mobile-floating" />
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 print:p-0 print:m-0 print:max-w-none">
        <WorksheetGenerator />
      </main>
    </div>
  );
}
