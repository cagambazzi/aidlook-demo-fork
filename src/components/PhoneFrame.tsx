import React, { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-[#111111] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-[100dvh] sm:h-[844px] sm:w-[390px] bg-background sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col mx-auto shrink-0 border-0 sm:border-8 border-[#1a1a1a]">
        
        {/* Notch - hidden on mobile, visible on desktop phone frame */}
        <div className="absolute top-0 inset-x-0 h-[30px] hidden sm:flex justify-center z-50 pointer-events-none">
          <div className="w-[150px] h-full bg-[#1a1a1a] rounded-b-[20px]"></div>
        </div>
        
        {/* Status Bar spacing for mobile/frame realism */}
        <div className="h-12 w-full shrink-0 z-40 bg-transparent hidden sm:block"></div>

        {/* Content area */}
        <div className="flex-1 w-full relative overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Home Indicator - visible on desktop frame */}
        <div className="absolute bottom-2 inset-x-0 h-1.5 hidden sm:flex justify-center z-50 pointer-events-none">
          <div className="w-1/3 h-full bg-black/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
