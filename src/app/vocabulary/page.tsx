'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, User, Trophy, Timer, FileQuestion, GraduationCap, Layers, Brain, Flame, Search, ClipboardCheck, AlertOctagon as AlertOctagonIcon, Sparkles, Bookmark, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// --- Icons & Logo ---
const RaiqaLabsLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3Z" stroke="white" strokeWidth="1.5" />
    <path d="M7.5 16.5L16.5 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.25 3.5V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.25 17.5V20.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20.5 12.25H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.5 12.25H3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// --- Color Themes Map ---
const COLOR_THEMES: { [key: string]: { border: string, hoverBorder: string, text: string, iconStyle: string, glow: string, gradientFrom: string, iconBg: string, iconBorder: string } } = {
  cyan: { border: 'border-cyan-400', hoverBorder: 'hover:border-cyan-300', text: 'text-cyan-400', iconStyle: 'text-cyan-400 group-hover:text-cyan-300 bg-cyan-500/10 group-hover:bg-cyan-500/20', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]', gradientFrom: 'from-cyan-500/5', iconBg: 'bg-cyan-500/10', iconBorder: 'border-cyan-500/10' },
  teal: { border: 'border-teal-400', hoverBorder: 'hover:border-teal-300', text: 'text-teal-400', iconStyle: 'text-teal-400 group-hover:text-teal-300 bg-teal-500/10 group-hover:bg-teal-500/20', glow: 'shadow-[0_0_20px_rgba(45,212,191,0.3)]', gradientFrom: 'from-teal-500/5', iconBg: 'bg-teal-500/10', iconBorder: 'border-teal-500/10' },
  purple: { border: 'border-purple-400', hoverBorder: 'hover:border-purple-300', text: 'text-purple-400', iconStyle: 'text-purple-400 group-hover:text-purple-300 bg-purple-500/10 group-hover:bg-purple-500/20', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]', gradientFrom: 'from-purple-500/5', iconBg: 'bg-purple-500/10', iconBorder: 'border-purple-500/10' },
  violet: { border: 'border-violet-400', hoverBorder: 'hover:border-violet-300', text: 'text-violet-400', iconStyle: 'text-violet-400 group-hover:text-violet-300 bg-violet-500/10 group-hover:bg-violet-500/20', glow: 'shadow-[0_0_20px_rgba(167,139,250,0.3)]', gradientFrom: 'from-violet-500/5', iconBg: 'bg-violet-500/10', iconBorder: 'border-violet-500/10' },
  fuchsia: { border: 'border-fuchsia-400', hoverBorder: 'hover:border-fuchsia-300', text: 'text-fuchsia-400', iconStyle: 'text-fuchsia-400 group-hover:text-fuchsia-300 bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20', glow: 'shadow-[0_0_20px_rgba(232,121,249,0.3)]', gradientFrom: 'from-fuchsia-500/5', iconBg: 'bg-fuchsia-500/10', iconBorder: 'border-fuchsia-500/10' },
  pink: { border: 'border-pink-400', hoverBorder: 'hover:border-pink-300', text: 'text-pink-400', iconStyle: 'text-pink-400 group-hover:text-pink-300 bg-pink-500/10 group-hover:bg-pink-500/20', glow: 'shadow-[0_0_20px_rgba(244,114,182,0.3)]', gradientFrom: 'from-pink-500/5', iconBg: 'bg-pink-500/10', iconBorder: 'border-pink-500/10' },
  emerald: { border: 'border-emerald-400', hoverBorder: 'hover:border-emerald-300', text: 'text-emerald-400', iconStyle: 'text-emerald-400 group-hover:text-emerald-300 bg-emerald-500/10 group-hover:bg-emerald-500/20', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]', gradientFrom: 'from-emerald-500/5', iconBg: 'bg-emerald-500/10', iconBorder: 'border-emerald-500/10' },
  lime: { border: 'border-lime-400', hoverBorder: 'hover:border-lime-300', text: 'text-lime-400', iconStyle: 'text-lime-400 group-hover:text-lime-300 bg-lime-500/10 group-hover:bg-lime-500/20', glow: 'shadow-[0_0_20px_rgba(163,230,53,0.3)]', gradientFrom: 'from-lime-500/5', iconBg: 'bg-lime-500/10', iconBorder: 'border-lime-500/10' },
  blue: { border: 'border-blue-400', hoverBorder: 'hover:border-blue-300', text: 'text-blue-400', iconStyle: 'text-blue-400 group-hover:text-blue-300 bg-blue-500/10 group-hover:bg-blue-500/20', glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]', gradientFrom: 'from-blue-500/5', iconBg: 'bg-blue-500/10', iconBorder: 'border-blue-500/10' },
  indigo: { border: 'border-indigo-400', hoverBorder: 'hover:border-indigo-300', text: 'text-indigo-400', iconStyle: 'text-indigo-400 group-hover:text-indigo-300 bg-indigo-500/10 group-hover:bg-indigo-500/20', glow: 'shadow-[0_0_20px_rgba(129,140,248,0.3)]', gradientFrom: 'from-indigo-500/5', iconBg: 'bg-indigo-500/10', iconBorder: 'border-indigo-500/10' },
};

// --- Component: Hero Card ---
const HeroCard = ({
  title, icon: Icon, themeColor, align = 'left', href, description, delay = 0
}: {
  title: string, icon: any, themeColor: string, align?: 'left' | 'right', href: string, description?: string, delay?: number
}) => {
  const themes: { [key: string]: { border: string, shadow: string, text: string, bg: string, accent: string, shine: string } } = {
    cyan: { border: "border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:border-cyan-300", shadow: "group-hover:shadow-[0_4px_30px_-5px_rgba(34,211,238,0.4)]", text: "text-cyan-400", bg: "from-cyan-950/30", accent: "bg-cyan-400", shine: "bg-cyan-400/20" },
    purple: { border: "border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:border-purple-300", shadow: "group-hover:shadow-[0_4px_30px_-5px_rgba(168,85,247,0.4)]", text: "text-purple-400", bg: "from-purple-950/30", accent: "bg-purple-400", shine: "bg-purple-400/20" },
    green: { border: "border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:border-emerald-300", shadow: "group-hover:shadow-[0_4px_30px_-5px_rgba(16,185,129,0.4)]", text: "text-emerald-400", bg: "from-emerald-950/30", accent: "bg-emerald-400", shine: "bg-emerald-400/20" },
    pink: { border: "border-pink-400/80 shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:border-pink-300", shadow: "group-hover:shadow-[0_4px_30px_-5px_rgba(236,72,153,0.4)]", text: "text-pink-400", bg: "from-pink-950/30", accent: "bg-pink-400", shine: "bg-pink-400/20" },
  };

  const theme = themes[themeColor];

  return (
    <Link href={href}>
      <div
        className={`group relative w-[340px] bg-[#0A0F1C]/80 backdrop-blur-xl border-2 ${theme.border} transition-all duration-500 rounded-[24px] z-20 shadow-xl overflow-hidden hover:-translate-y-1`}
        style={{ animation: `fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}ms`, opacity: 0 }}
      >
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} via-transparent to-transparent opacity-100 transition-opacity duration-700`} />

        {/* Hover Highlight Line */}
        <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className={`relative z-10 p-7 flex flex-col gap-4 ${align === 'right' ? 'items-end text-right' : 'items-start'}`}>
          {/* Header */}
          <div className={`flex items-center gap-4 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className={`relative p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
              <div className={`absolute inset-0 ${theme.shine} opacity-100 transition-opacity duration-300`} />
              <Icon className={`relative w-6 h-6 ${theme.text} transition-colors duration-300`} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold tracking-tight ${theme.text} transition-colors duration-300`}>{title}</h3>
            </div>
          </div>

          {/* Divider */}
          <div className={`h-px w-full bg-gradient-to-r ${align === 'right' ? 'from-transparent via-white/10 to-transparent' : 'from-white/10 via-white/5 to-transparent'} my-1`} />

          {/* Description */}
          {description && (
            <p className={`text-[14px] font-medium leading-relaxed tracking-wide ${theme.text} opacity-80 transition-colors`}>
              {description}
            </p>
          )}

          {/* Action Hint */}
          <div className={`mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${theme.text} opacity-100 transform translate-y-0 transition-all duration-300`}>
            <span>{align === 'right' ? 'Explore Content' : 'Start Learning'}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${theme.accent}`} />
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- Component: Sub Card ---
const SubCard = ({
  title, subtitle, icon: Icon, color, href, delay = 0, align = 'left'
}: {
  title: string, subtitle?: string, icon: any, color: string, href: string, align?: 'left' | 'right', delay?: number
}) => {
  const theme = COLOR_THEMES[color] || COLOR_THEMES['cyan'];

  return (
    <Link href={href}>
      <div
        className={`group relative w-[240px] min-h-[70px] bg-[#0F1422]/70 backdrop-blur-md border ${theme.border} ${theme.glow} ${theme.hoverBorder} flex items-center p-3 gap-4 rounded-xl hover:bg-[#1A2030] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] z-30 cursor-pointer ${align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}
        style={{ animation: `fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}ms`, opacity: 0 }}
      >
        <div className={`p-2.5 rounded-lg border border-white/5 transition-colors shrink-0 ${theme.iconStyle}`}>
          <Icon className={`w-4 h-4`} />
        </div>
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <span className={`text-[13px] font-bold ${theme.text} transition-colors truncate tracking-wide`}>{title}</span>
          {subtitle && <span className={`text-[11px] ${theme.text} opacity-70 transition-colors truncate font-medium`}>{subtitle}</span>}
        </div>
      </div>
    </Link>
  );
};

export default function VocabularyPage() {
  const [mounted, setMounted] = useState(false);
  const [lines, setLines] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const updateLines = () => {
      const w = window.innerWidth;
      const h = window.innerHeight; // Hero Section is 100vh, so SVG matches window height

      // --- Layout Constants ---
      const MAIN_W = 340;
      const SUB_W = 240;
      const MAIN_H = 180;
      const SUB_H = 72;
      const SUB_GAP = 16;
      const MARGIN = 60;
      const GAP = 80;

      const TL_MAIN_X = MARGIN;
      const BL_MAIN_X = MARGIN;
      const TR_MAIN_X = w - MARGIN - MAIN_W;
      const BR_MAIN_X = w - MARGIN - MAIN_W;
      const TL_SUB_X = MARGIN + MAIN_W + GAP;
      const BL_SUB_X = MARGIN + MAIN_W + GAP;
      const TR_SUB_X = w - (MARGIN + MAIN_W + GAP + SUB_W);
      const BR_SUB_X = w - (MARGIN + MAIN_W + GAP + SUB_W);
      const Y_TOP = h * 0.15;
      const Y_BOT = h * 0.58;
      const Y_BOT_MAIN_OFFSET = -80;

      const newLines: any[] = [];

      const createPath = (x1: number, y1: number, x2: number, y2: number, color: string, key: string) => {
        const midX = (x1 + x2) / 2;
        const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
        return (
          <g key={key}>
            <path d={d} fill="none" stroke={color} strokeWidth="5" opacity="0.2" filter="blur(5px)" />
            <path d={d} fill="none" stroke={color} strokeWidth="2" strokeDasharray="5 5" className="animate-dash" />
          </g>
        );
      };

      // 1. TL
      const tlMainY = Y_TOP + MAIN_H / 2;
      const tlMainEdgeX = TL_MAIN_X + MAIN_W;
      [0, 1].forEach((_, i) => newLines.push(createPath(tlMainEdgeX, tlMainY, TL_SUB_X, Y_TOP + i * (SUB_H + SUB_GAP) + SUB_H / 2, '#22d3ee', `tl-${i}`)));

      // 2. BL
      const blMainY = Y_BOT + Y_BOT_MAIN_OFFSET + MAIN_H / 2;
      const blMainEdgeX = BL_MAIN_X + MAIN_W;
      const blSubStartY = Y_BOT + Y_BOT_MAIN_OFFSET;
      [0, 1, 2, 3].forEach((_, i) => newLines.push(createPath(blMainEdgeX, blMainY, BL_SUB_X, blSubStartY + i * (SUB_H + SUB_GAP) + SUB_H / 2, '#d8b4fe', `bl-${i}`)));

      // 3. TR
      const trMainY = Y_TOP + MAIN_H / 2;
      const trMainEdgeX = TR_MAIN_X;
      const trSubEdgeX = TR_SUB_X + SUB_W;
      [0, 1].forEach((_, i) => newLines.push(createPath(trMainEdgeX, trMainY, trSubEdgeX, Y_TOP + i * (SUB_H + SUB_GAP) + SUB_H / 2, '#4ade80', `tr-${i}`)));

      // 4. BR
      const brMainY = Y_BOT + Y_BOT_MAIN_OFFSET + MAIN_H / 2;
      const brMainEdgeX = BR_MAIN_X;
      const brSubEdgeX = BR_SUB_X + SUB_W;
      const brSubStartY = Y_BOT + Y_BOT_MAIN_OFFSET;
      [0, 1, 2].forEach((_, i) => newLines.push(createPath(brMainEdgeX, brMainY, brSubEdgeX, brSubStartY + i * (SUB_H + SUB_GAP) + SUB_H / 2, '#f472b6', `br-${i}`)));

      // 5. Center Hub
      const cx = w / 2;
      const cy = h * 0.42;
      newLines.push(createPath(cx, cy, TL_MAIN_X + MAIN_W, tlMainY, '#22d3ee', 'c-tl'));
      newLines.push(createPath(cx, cy, BL_MAIN_X + MAIN_W, blMainY, '#d8b4fe', 'c-bl'));
      newLines.push(createPath(cx, cy, TR_MAIN_X, trMainY, '#4ade80', 'c-tr'));
      newLines.push(createPath(cx, cy, BR_MAIN_X, brMainY, '#f472b6', 'c-br'));

      setLines(newLines);
    }

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  const coreSubCards = [
    { title: 'Core Vocabulary', subtitle: '필수 TOEIC 어휘', icon: BookOpen, color: 'cyan', href: '/core-learning' },
    { title: 'Confusable Words', subtitle: '헷갈리는 단어', icon: Brain, color: 'teal', href: '/confusable-words' }
  ];
  const testingSubCards = [
    { title: 'Speed Quiz', subtitle: '제한 시간 내 빠르게 정답 맞추기', icon: Timer, color: 'purple', href: '/speed-quiz' },
    { title: 'Sentence Completion', subtitle: '문맥을 파악해 빈칸 완성하기', icon: FileQuestion, color: 'violet', href: '/sentence-completion' },
    { title: 'Error Analysis', subtitle: '오답 집중 공략 및 약점 보완', icon: AlertOctagonIcon, color: 'fuchsia', href: '/error-note' },
    { title: 'Flashcards', subtitle: '반복 학습으로 장기 기억 완성', icon: Layers, color: 'pink', href: '/flashcards' }
  ];
  const motivationSubCards = [
    { title: 'Daily Word', subtitle: '매일 새로운 단어', icon: BookOpen, color: 'emerald', href: '/daily-word' },
    { title: 'Attendance', subtitle: '연속 출석 기록', icon: Flame, color: 'lime', href: '/attendance' }
  ];
  const personalizationSubCards = [
    { title: 'Bookmark Mgmt', subtitle: '중요 단어 북마크', icon: Bookmark, color: 'blue', href: '/bookmarks' },
    { title: 'Dashboard', subtitle: '학습 통계', icon: GraduationCap, color: 'indigo', href: '/dashboard' },
    { title: 'Smart Search', subtitle: '빠른 단어 검색', icon: Search, color: 'violet', href: '/smart-search' }
  ];

  if (!mounted) return <div className="min-h-screen bg-[#050a15]" />;

  return (
    <main className="min-h-screen bg-[#050a15] text-white overflow-x-hidden selection:bg-cyan-500/30">
      {/* === HERO SECTION (Network Map) === */}
      <section className="relative h-screen w-full overflow-hidden z-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050a15]/40 to-[#050a15] pointer-events-none z-0" />

        {/* SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          {lines}
        </svg>

        {/* Ambient Background Glow */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
        </div>

        {/* Center Hub */}
        <div className="absolute inset-x-0 top-[45vh] flex flex-col items-center justify-center pointer-events-none z-50 -translate-y-1/2">
          {/* Main Title Container */}
          <div className="relative group">
            <div className="absolute -inset-20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h1 className="relative text-[90px] md:text-[130px] font-black tracking-tighter vocabulary-gradient-text drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] select-none z-10 motion-safe:animate-float">
              Vocabulary
            </h1>
          </div>

          {/* New Subtitle & Description */}
          <div className="-mt-6 flex flex-col items-center gap-5 z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards" style={{ animationDelay: '0.2s' }}>
            <p className="text-2xl md:text-3xl text-cyan-200/80 font-light tracking-[0.4em] uppercase text-center drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              Language Mastery System
            </p>

            <div className="h-px w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent my-2" />

            <p className="text-base md:text-lg text-slate-300/80 font-medium tracking-wide max-w-2xl text-center leading-relaxed opacity-0 animate-in fade-in duration-1000 fill-mode-forwards" style={{ animationDelay: '0.6s' }}>
              체계적인 학습과 반복을 통해<br />
              당신의 영어 잠재력을 깨우세요
            </p>
          </div>
        </div>

        {/* Top Right Navigation Bar */}
        <nav className="absolute top-0 right-0 p-10 z-50 flex items-center gap-6 flex-row-reverse">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <RaiqaLabsLogo />
          </Link>

          <div className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full px-3 shadow-2xl">
            {[
              { label: 'MAIN', href: '/' },
              { label: 'Core Learning', href: '#core-learning' },
              { label: 'Testing & Review', href: '#testing-review' },
              { label: 'Motivation', href: '#motivation' },
              { label: 'Personalization', href: '#personalization' }
            ].map((item, idx) => (
              <Link key={idx} href={item.href}>
                <span className="px-4 py-2 text-xs font-black tracking-[0.1em] text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Exit Button (Bottom Left) */}
        <div className="absolute bottom-8 left-8 z-50">
          <Link href="/">
            <div className="group flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 rounded-[20px] hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-2xl animate-fade-up">
              <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors border border-white/5">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div className="flex flex-col pr-4 leading-tight">
                <span className="text-[13px] font-bold text-slate-200 group-hover:text-white transition-colors">메인으로 돌아가기</span>
                <span className="text-[10px] text-slate-500 mt-0.5">홈페이지로 이동하여 다른 콘텐츠 탐색</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid Groups */}
        {/* Grid Groups */}
        <div className="absolute" style={{ top: '15vh', left: '60px' }}><HeroCard title="Core Learning" icon={BookOpen} themeColor="cyan" href="#core-learning" description="각 Phase를 완료하고 완벽한 Core로 등극해보세요." /></div>
        <div className="absolute flex flex-col gap-4" style={{ top: '15vh', left: '480px' }}>{coreSubCards.map((c, i) => <SubCard key={i} {...c} delay={i * 100} align="left" />)}</div>

        <div className="absolute" style={{ top: '58vh', marginTop: '-80px', left: '60px' }}><HeroCard title="Testing & Review" icon={ClipboardCheck} themeColor="purple" href="#testing-review" description="실전 감각을 키우는 체계적인 복습 시스템" /></div>
        <div className="absolute flex flex-col gap-4" style={{ top: '58vh', marginTop: '-80px', left: '480px' }}>{testingSubCards.map((c, i) => <SubCard key={i} {...c} delay={i * 100} align="left" />)}</div>

        <div className="absolute" style={{ top: '15vh', right: '60px' }}><HeroCard title="Motivation" icon={Trophy} themeColor="green" align="right" href="#motivation" description="성취감과 동기부여를 높이는 보상 시스템" /></div>
        <div className="absolute flex flex-col gap-4 items-end" style={{ top: '15vh', right: '480px' }}>{motivationSubCards.map((c, i) => <SubCard key={i} align="right" {...c} delay={i * 100} />)}</div>

        <div className="absolute" style={{ top: '58vh', marginTop: '-80px', right: '60px' }}><HeroCard title="Personalization" icon={User} themeColor="pink" align="right" href="#personalization" description="맞춤형 학습 경로와 개인별 진도 관리" /></div>
        <div className="absolute flex flex-col gap-4 items-end" style={{ top: '58vh', marginTop: '-80px', right: '480px' }}>{personalizationSubCards.map((c, i) => <SubCard key={i} align="right" {...c} delay={i * 100} />)}</div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center z-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* === CONTENT SECTIONS (Restored) === */}

      {/* 1. Core Learning */}
      <section id="core-learning" className="relative py-32 z-10 px-6 max-w-7xl mx-auto border-t border-white/5 bg-[#050a15] overflow-hidden">
        {/* Dynamic Section Background */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

        <div className="mb-20 relative z-10">
          <p className="text-blue-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 opacity-80">Phase 01</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">CORE LEARNING</span>
          </h2>
          <p className="text-blue-300 font-bold text-lg tracking-wide max-w-xl leading-relaxed drop-shadow-[0_0_10px_rgba(147,197,253,0.5)]">
            각 Phase를 완료하고 완벽한 Core로 등극해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 px-4 md:px-0">
          {/* Card 1: Core Vocabulary */}
          <Link href="/core-learning" className="group relative min-h-[400px] rounded-[40px] transition-all duration-500 hover:-translate-y-2">
            {/* Outer Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[42px] blur opacity-30 group-hover:opacity-100 transition duration-500" />

            {/* Card Content */}
            <div className="relative h-full bg-[#0A0F1C] rounded-[40px] overflow-hidden p-8 md:p-12 flex flex-col justify-between border border-white/5">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

              {/* Floating Background Icon */}
              <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12">
                <BookOpen className="w-80 h-80 text-blue-500" />
              </div>

              {/* Header Badge */}
              <div className="flex justify-between items-start z-10 mb-20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
                  <BookOpen className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
                <div className="px-5 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:bg-blue-400/20 transition-all">
                  Essential
                </div>
              </div>

              {/* Text Content */}
              <div className="z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  Core Vocabulary
                </h3>
                <p className="text-blue-200/60 font-medium text-lg leading-relaxed max-w-sm group-hover:text-blue-200 transition-colors">
                  TOEIC 빈출 어휘 1,350개를<br />완벽하게 마스터하세요.
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {['#Business', '#Economy', '#Daily', '#Travel'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300/70 text-[10px] font-bold tracking-wider uppercase group-hover:bg-blue-500/20 group-hover:text-blue-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-900/30 border border-blue-500/30 group-hover:bg-blue-600/20 group-hover:border-blue-400/50 transition-all duration-300">
                    <span className="text-sm font-bold text-blue-300 tracking-widest uppercase">Start Learning</span>
                    <ArrowLeft className="w-4 h-4 text-blue-300 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Confusable Words */}
          <Link href="/confusable-words" className="group relative min-h-[400px] rounded-[40px] transition-all duration-500 hover:-translate-y-2">
            {/* Outer Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-[42px] blur opacity-30 group-hover:opacity-100 transition duration-500" />

            {/* Card Content */}
            <div className="relative h-full bg-[#0A0F1C] rounded-[40px] overflow-hidden p-8 md:p-12 flex flex-col justify-between border border-white/5">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

              {/* Floating Background Icon */}
              <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12">
                <Brain className="w-80 h-80 text-cyan-500" />
              </div>

              {/* Header Badge */}
              <div className="flex justify-between items-start z-10 mb-20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]">
                  <Brain className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>
                <div className="px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md text-cyan-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover:bg-cyan-400/20 transition-all">
                  Advanced
                </div>
              </div>

              {/* Text Content */}
              <div className="z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  Confusable Words
                </h3>
                <p className="text-cyan-200/60 font-medium text-lg leading-relaxed max-w-sm group-hover:text-cyan-200 transition-colors">
                  의미가 비슷해 헷갈리는 단어들을<br />명확히 구분하세요.
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {['#Nuance', '#Context', '#Similar', '#Usage'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/70 text-[10px] font-bold tracking-wider uppercase group-hover:bg-cyan-500/20 group-hover:text-cyan-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-cyan-900/30 border border-cyan-500/30 group-hover:bg-cyan-600/20 group-hover:border-cyan-400/50 transition-all duration-300">
                    <span className="text-sm font-bold text-cyan-300 tracking-widest uppercase">Master Now</span>
                    <ArrowLeft className="w-4 h-4 text-cyan-300 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. Testing & Review */}
      <section id="testing-review" className="relative py-32 z-10 px-6 max-w-7xl mx-auto border-t border-white/5 bg-[#050a15] overflow-hidden">
        {/* Dynamic Section Background */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '11s' }} />

        <div className="mb-20 relative z-10">
          <p className="text-purple-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 opacity-80">Phase 02</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">TESTING & REVIEW</span>
          </h2>
          <p className="text-purple-300 font-bold text-lg tracking-wide max-w-xl leading-relaxed drop-shadow-[0_0_10px_rgba(216,180,254,0.5)]">
            실전 감각을 키우는 체계적인 복습 시스템을 경험하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {testingSubCards.map((card, idx) => {
            // Explicit Color Conversions to match Core Learning solid style
            const styles: { [key: string]: any } = {
              purple: {
                border: 'from-purple-500 to-indigo-500',
                iconText: 'text-purple-400',
                iconBg: 'bg-purple-500/10 border-purple-500/20',
                desc: 'text-purple-200/60 group-hover:text-purple-200',
                tag: 'bg-purple-500/10 border-purple-500/20 text-purple-300/70 group-hover:bg-purple-500/20 group-hover:text-purple-200',
                btn: 'px-4 py-1.5 rounded-xl bg-purple-900/10 border border-purple-500/30 group-hover:bg-purple-600/20 group-hover:border-purple-400/50 text-purple-300 group-hover:text-purple-200'
              },
              violet: {
                border: 'from-violet-500 to-purple-500',
                iconText: 'text-violet-400',
                iconBg: 'bg-violet-500/10 border-violet-500/20',
                desc: 'text-violet-200/60 group-hover:text-violet-200',
                tag: 'bg-violet-500/10 border-violet-500/20 text-violet-300/70 group-hover:bg-violet-500/20 group-hover:text-violet-200',
                btn: 'px-4 py-1.5 rounded-xl bg-violet-900/10 border border-violet-500/30 group-hover:bg-violet-600/20 group-hover:border-violet-400/50 text-violet-300 group-hover:text-violet-200'
              },
              fuchsia: {
                border: 'from-fuchsia-500 to-pink-500',
                iconText: 'text-fuchsia-400',
                iconBg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
                desc: 'text-fuchsia-200/60 group-hover:text-fuchsia-200',
                tag: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-300/70 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-200',
                btn: 'px-4 py-1.5 rounded-xl bg-fuchsia-900/10 border border-fuchsia-500/30 group-hover:bg-fuchsia-600/20 group-hover:border-fuchsia-400/50 text-fuchsia-300 group-hover:text-fuchsia-200'
              },
              pink: {
                border: 'from-pink-500 to-rose-500',
                iconText: 'text-pink-400',
                iconBg: 'bg-pink-500/10 border-pink-500/20',
                desc: 'text-pink-200/60 group-hover:text-pink-200',
                tag: 'bg-pink-500/10 border-pink-500/20 text-pink-300/70 group-hover:bg-pink-500/20 group-hover:text-pink-200',
                btn: 'px-4 py-1.5 rounded-xl bg-pink-900/10 border border-pink-500/30 group-hover:bg-pink-600/20 group-hover:border-pink-400/50 text-pink-300 group-hover:text-pink-200'
              }
            };

            const s = styles[card.color] || styles['purple'];

            const tagsMap: { [key: string]: string[] } = {
              purple: ['#Speed', '#Reflex', '#Score'],
              violet: ['#Logic', '#Context', '#Genius'],
              fuchsia: ['#Review', '#Check', '#Analysis'],
              pink: ['#Memory', '#Repeat', '#Daily'],
            };
            const tags = tagsMap[card.color] || ['#Study', '#Test', '#Review'];

            return (
              <Link key={idx} href={card.href} className="group relative min-h-[380px] rounded-[32px] transition-all duration-500 hover:-translate-y-2">
                {/* Glow Border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${s.border} rounded-[34px] blur opacity-30 group-hover:opacity-100 transition duration-500`} />

                <div className="relative h-full bg-[#0A0F1C] rounded-[32px] overflow-hidden p-8 flex flex-col justify-between border border-white/5">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  {/* Floating Icon */}
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12">
                    <card.icon className={`w-40 h-40 ${s.iconText} opacity-30`} />
                  </div>

                  {/* Header */}
                  <div className="z-10 mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-6 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]`}>
                      <card.icon className={`w-7 h-7 ${s.iconText} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      {card.title}
                    </h3>
                    <p className={`font-medium text-sm leading-relaxed transition-colors ${s.desc}`}>
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Tags & Button Container */}
                  <div className="z-10 mt-auto space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, i) => (
                        <span key={i} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors border ${s.tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${s.btn}`}>
                      <span>Start Test</span>
                      <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Motivation */}
      <section id="motivation" className="relative py-32 z-10 px-6 max-w-7xl mx-auto border-t border-white/5 bg-[#050a15] overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

        <div className="mb-20 relative z-10">
          <p className="text-emerald-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 opacity-80">Phase 03</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]">MOTIVATION</span>
          </h2>
          <p className="text-emerald-300 font-bold text-lg tracking-wide max-w-xl leading-relaxed drop-shadow-[0_0_10px_rgba(110,231,183,0.5)]">
            매일의 작은 성취가 모여 놀라운 결과를 만들어냅니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 px-4 md:px-0">
          {/* Card 1: Daily Word */}
          <Link href="/daily-word" className="group relative min-h-[400px] rounded-[40px] transition-all duration-500 hover:-translate-y-2">
            {/* Outer Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-[42px] blur opacity-30 group-hover:opacity-100 transition duration-500" />

            {/* Card Content */}
            <div className="relative h-full bg-[#0A0F1C] rounded-[40px] overflow-hidden p-8 md:p-12 flex flex-col justify-between border border-white/5">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

              {/* Floating Background Icon */}
              <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12">
                <BookOpen className="w-80 h-80 text-emerald-500" />
              </div>

              {/* Header Badge */}
              <div className="flex justify-between items-start z-10 mb-20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
                  <BookOpen className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="px-5 py-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-md text-emerald-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:bg-emerald-400/20 transition-all">
                  Daily
                </div>
              </div>

              {/* Text Content */}
              <div className="z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  Daily Word
                </h3>
                <p className="text-emerald-200/60 font-medium text-lg leading-relaxed max-w-sm group-hover:text-emerald-200 transition-colors">
                  매일 새로운 단어와 함께<br />영어 루틴을 만드세요.
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {['#Habit', '#Growth', '#Today', '#Fresh'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300/70 text-[10px] font-bold tracking-wider uppercase group-hover:bg-emerald-500/20 group-hover:text-emerald-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 group-hover:bg-emerald-600/20 group-hover:border-emerald-400/50 transition-all duration-300">
                    <span className="text-sm font-bold text-emerald-300 tracking-widest uppercase">Check Today</span>
                    <ArrowLeft className="w-4 h-4 text-emerald-300 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Attendance */}
          <Link href="/attendance" className="group relative min-h-[400px] rounded-[40px] transition-all duration-500 hover:-translate-y-2">
            {/* Outer Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500 to-green-500 rounded-[42px] blur opacity-30 group-hover:opacity-100 transition duration-500" />

            {/* Card Content */}
            <div className="relative h-full bg-[#0A0F1C] rounded-[40px] overflow-hidden p-8 md:p-12 flex flex-col justify-between border border-white/5">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

              {/* Floating Background Icon */}
              <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12">
                <Flame className="w-80 h-80 text-lime-500" />
              </div>

              {/* Header Badge */}
              <div className="flex justify-between items-start z-10 mb-20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500/20 to-lime-600/5 border border-lime-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_-5px_rgba(132,204,22,0.3)]">
                  <Flame className="w-8 h-8 text-lime-400 drop-shadow-[0_0_10px_rgba(132,204,22,0.5)]" />
                </div>
                <div className="px-5 py-2 rounded-full border border-lime-400/30 bg-lime-500/10 backdrop-blur-md text-lime-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(132,204,22,0.2)] group-hover:bg-lime-400/20 transition-all">
                  Streak
                </div>
              </div>

              {/* Text Content */}
              <div className="z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">
                  Attendance
                </h3>
                <p className="text-lime-200/60 font-medium text-lg leading-relaxed max-w-sm group-hover:text-lime-200 transition-colors">
                  연속 출석 기록으로<br />끈기와 열정을 증명하세요.
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {['#Streak', '#Fire', '#Steady', '#Goal'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-lime-500/10 border border-lime-500/20 text-lime-300/70 text-[10px] font-bold tracking-wider uppercase group-hover:bg-lime-500/20 group-hover:text-lime-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-lime-900/30 border border-lime-500/30 group-hover:bg-lime-600/20 group-hover:border-lime-400/50 transition-all duration-300">
                    <span className="text-sm font-bold text-lime-300 tracking-widest uppercase">Keep Going</span>
                    <ArrowLeft className="w-4 h-4 text-lime-300 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Personalization */}
      <section id="personalization" className="relative py-32 z-10 px-6 max-w-7xl mx-auto border-t border-white/5 bg-[#050a15] overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-1/2 right-1/3 w-[900px] h-[900px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '14s' }} />

        <div className="mb-20 relative z-10 text-center md:text-left">
          <p className="text-blue-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 opacity-80">Phase 04</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]">PERSONALIZATION</span>
          </h2>
          <p className="text-indigo-300 font-bold text-lg tracking-wide max-w-xl leading-relaxed drop-shadow-[0_0_10px_rgba(165,180,252,0.5)] md:mx-0 mx-auto">
            오직 당신만을 위한 맞춤형 학습 데이터를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 px-4 md:px-0">
          {/* Card 1: Bookmark Mgmt */}
          <Link href="/bookmarks" className="group relative min-h-[380px] rounded-[40px] transition-all duration-500 hover:-translate-y-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[42px] blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative h-full bg-[#0A0F1C] rounded-[40px] overflow-hidden p-8 flex flex-col justify-between border border-white/5">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12">
                <Bookmark className="w-60 h-60 text-blue-500" />
              </div>

              <div className="flex justify-between items-start z-10 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                  <Bookmark className="w-7 h-7 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                </div>
                <div className="px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:bg-blue-400/20 transition-all">
                  Save
                </div>
              </div>

              <div className="z-10">
                <h3 className="text-3xl font-black mb-3 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  Bookmark<br />Mgmt
                </h3>
                <p className="text-blue-200/60 font-medium text-sm leading-relaxed mb-6">
                  중요 단어 북마크
                </p>
                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['#Save', '#Review', '#Keep'].map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300/70 text-[10px] font-bold uppercase tracking-wider group-hover:bg-blue-500/20 group-hover:text-blue-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-300 uppercase tracking-widest group-hover:text-blue-200 transition-colors">
                  <span>Manage</span>
                  <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Dashboard */}
          <Link href="/dashboard" className="group relative min-h-[380px] rounded-[40px] transition-all duration-500 hover:-translate-y-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[42px] blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative h-full bg-[#0A0F1C] rounded-[40px] overflow-hidden p-8 flex flex-col justify-between border border-white/5">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12">
                <GraduationCap className="w-60 h-60 text-indigo-500" />
              </div>

              <div className="flex justify-between items-start z-10 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]">
                  <GraduationCap className="w-7 h-7 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                </div>
                <div className="px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md text-indigo-300 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:bg-indigo-400/20 transition-all">
                  Stats
                </div>
              </div>

              <div className="z-10">
                <h3 className="text-3xl font-black mb-3 text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  Dashboard
                </h3>
                <p className="text-indigo-200/60 font-medium text-sm leading-relaxed mb-6">
                  학습 통계
                </p>
                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['#Data', '#Graph', '#Trend'].map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300/70 text-[10px] font-bold uppercase tracking-wider group-hover:bg-indigo-500/20 group-hover:text-indigo-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold text-indigo-300 uppercase tracking-widest group-hover:text-indigo-200 transition-colors">
                  <span>View Data</span>
                  <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Smart Search */}
          <Link href="/smart-search" className="group relative min-h-[380px] rounded-[40px] transition-all duration-500 hover:-translate-y-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-[42px] blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative h-full bg-[#0A0F1C] rounded-[40px] overflow-hidden p-8 flex flex-col justify-between border border-white/5">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12">
                <Search className="w-60 h-60 text-violet-500" />
              </div>

              <div className="flex justify-between items-start z-10 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(167,139,250,0.3)]">
                  <Search className="w-7 h-7 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                </div>
                <div className="px-3 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-md text-violet-300 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(167,139,250,0.2)] group-hover:bg-violet-400/20 transition-all">
                  Finder
                </div>
              </div>

              <div className="z-10">
                <h3 className="text-3xl font-black mb-3 text-white drop-shadow-[0_0_15px_rgba(167,139,250,0.3)]">
                  Smart<br />Search
                </h3>
                <p className="text-violet-200/60 font-medium text-sm leading-relaxed mb-6">
                  빠른 단어 검색
                </p>
                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['#Find', '#Fast', '#Easy'].map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300/70 text-[10px] font-bold uppercase tracking-wider group-hover:bg-violet-500/20 group-hover:text-violet-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold text-violet-300 uppercase tracking-widest group-hover:text-violet-200 transition-colors">
                  <span>Search Now</span>
                  <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5 relative z-10 bg-[#050a15]">
        <p className="text-xs font-mono text-slate-500 tracking-[0.5em] uppercase">Raiqa Labs Vocabulary System v2.0</p>
      </footer>

      <style jsx>{`
                @keyframes fadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes dash { to { stroke-dashoffset: -20; } }
                .animate-dash { animation: dash 1s linear infinite; }
                .bg-radial-gradient { background: radial-gradient(circle, var(--tw-gradient-stops)); }
                @keyframes shine {
                  0% { background-position: 150% 150%; }
                  100% { background-position: -50% -50%; }
                }
                .animate-shine { animation: shine 3s linear infinite; }
             `}</style>
    </main>
  )
}

function AlertOctagon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
  )
}
