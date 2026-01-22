'use client';

import AiChip from '@/components/ai-chip';
import WavyLinesVisualization from '@/components/pyramid-visualization';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Expand, Search } from 'lucide-react';

const RaiqaLabsLogo = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3Z" stroke="white" strokeWidth="1.5"/>
        <path d="M7.5 16.5L16.5 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12.25 3.5V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12.25 17.5V20.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20.5 12.25H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6.5 12.25H3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);


export default function VocabularyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      <WavyLinesVisualization />
      
      <div className="absolute inset-0 z-10 mx-auto min-h-screen flex flex-col max-w-7xl p-6 md:p-8">
        
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <RaiqaLabsLogo />
            <span className="font-semibold text-xl tracking-wide">Raiqa Labs</span>
          </div>
          <div className="text-right hidden md:block">
            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
              Learn more
            </a>
            <p className="text-white/60 text-sm">www.raiqalabs.com</p>
          </div>
        </header>

        <div className="flex-1 w-full flex items-center justify-center relative">
          
          <div className="absolute top-1/4 left-0 md:left-8 text-2xl md:text-3xl font-medium leading-relaxed">
            <p>Step 1: Ask better questions</p>
            <p>Step 2: Let AI listen</p>
          </div>

          <div className="absolute" style={{top: '52%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
             <AiChip />
          </div>

          <div className="absolute bottom-1/4 right-0 md:right-8 text-right text-lg md:text-xl">
            <p className="text-white/80 leading-relaxed">
              Before every launch,
              <br />
              our systems read patterns
              <br />
              and our team reads people.
            </p>
          </div>
        </div>

        <footer className="flex items-center justify-between w-full">
          <Button variant="secondary" className="bg-white/90 text-black hover:bg-white rounded-lg px-4 py-2">
            사이트 방문
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="bg-white/10 text-white/80 hover:bg-white/20 rounded-lg">
              <Expand className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/10 text-white/80 hover:bg-white/20 rounded-lg">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </footer>

      </div>
    </main>
  );
}
