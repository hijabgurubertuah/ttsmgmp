import React from 'react';
import { Grid3X3 } from 'lucide-react';
import { WorksheetGenerator } from './components/WorksheetGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d9488] text-slate-900 font-sans antialiased">
      {/* Header Bersih & Minimalis */}
      <header className="print:hidden bg-white/95 backdrop-blur-sm border-b border-teal-700/20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0d9488] text-white flex items-center justify-center font-bold shadow-2xs">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
                TTS MAKER By MGMP IPA Kec. Bengkalis
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Bisa untuk semua Mata Pelajaran
              </p>
            </div>
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
