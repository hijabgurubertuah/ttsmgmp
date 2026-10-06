import React from 'react';
import { Users, UserCheck } from 'lucide-react';
import { useVisitorStats } from '../hooks/useVisitorStats';

export const VisitorFooter: React.FC = () => {
  const { totalVisitors, todayVisitors, onlineCount, isLoading } = useVisitorStats();

  const handleFooterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newTab = window.open('https://www.gubersmart.my.id', '_blank');
    if (newTab) {
      try {
        newTab.blur();
      } catch {
        // Browser security restriction
      }
    }
    window.focus();
  };

  return (
    <footer className="print:hidden w-full max-w-[794px] mx-auto mt-12 sm:mt-16 mb-3">
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
        className="w-full py-2 px-4 transition cursor-pointer hover:opacity-90 active:scale-[0.99] flex items-center justify-center text-white"
      >
        {/* Single row of icons and numbers only without white card */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-white drop-shadow-2xs">
          {/* Total Visitors */}
          <div className="flex items-center gap-1.5" title="Total Pengunjung">
            <Users className="w-4 h-4 text-teal-100 shrink-0" />
            <span className="font-mono">
              {isLoading ? '...' : totalVisitors.toLocaleString('id-ID')}
            </span>
          </div>

          <span className="text-teal-200/50 font-normal">|</span>

          {/* Today Visitors */}
          <div className="flex items-center gap-1.5" title="Pengunjung Hari Ini">
            <UserCheck className="w-4 h-4 text-teal-100 shrink-0" />
            <span className="font-mono">
              {isLoading ? '...' : todayVisitors.toLocaleString('id-ID')}
            </span>
          </div>

          <span className="text-teal-200/50 font-normal">|</span>

          {/* Online Count with Blinking Green Dot */}
          <div className="flex items-center gap-1.5" title="Sedang Online">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="font-mono text-emerald-200">
              {isLoading ? '...' : onlineCount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
