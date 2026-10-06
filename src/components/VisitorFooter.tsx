import React from 'react';
import { Users, UserCheck, Radio, Globe } from 'lucide-react';
import { useVisitorStats } from '../hooks/useVisitorStats';

export const VisitorFooter: React.FC = () => {
  const { totalVisitors, todayVisitors, onlineCount, isLoading } = useVisitorStats();

  const handleFooterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://www.gubersmart.my.id', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="print:hidden w-full max-w-[794px] mx-auto mt-4 mb-6">
      <div
        onClick={handleFooterClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleFooterClick(e as unknown as React.MouseEvent);
          }
        }}
        title="Buka www.gubersmart.my.id di tab baru"
        className="w-full py-2.5 px-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-teal-800/15 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer active:scale-[0.99] flex items-center justify-between text-neutral-800 dark:text-neutral-200"
      >
        {/* Single row of icons and numbers only */}
        <div className="flex items-center justify-center gap-5 sm:gap-8 mx-auto text-xs sm:text-sm font-bold">
          {/* Total Visitors: Icon + Number */}
          <div className="flex items-center gap-1.5" title="Total Pengunjung">
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="font-mono">
              {isLoading ? '...' : totalVisitors.toLocaleString('id-ID')}
            </span>
          </div>

          <span className="text-neutral-300 dark:text-neutral-700">|</span>

          {/* Today Visitors: Icon + Number */}
          <div className="flex items-center gap-1.5" title="Pengunjung Hari Ini">
            <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="font-mono">
              {isLoading ? '...' : todayVisitors.toLocaleString('id-ID')}
            </span>
          </div>

          <span className="text-neutral-300 dark:text-neutral-700">|</span>

          {/* Online Count: Icon + Number */}
          <div className="flex items-center gap-1.5" title="Sedang Online">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <Radio className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              {isLoading ? '...' : onlineCount.toLocaleString('id-ID')}
            </span>
          </div>

          <span className="text-neutral-300 dark:text-neutral-700">|</span>

          {/* Website Link Icon */}
          <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:underline">
            <Globe className="w-4 h-4 shrink-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};
