import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Flame, Heart, 
  Sparkles, Star, Plus, Check, Trash2, X, Edit3, Award, Trophy, Smile
} from 'lucide-react';
import { BeautyDayLog, BeautyLogsMap, LookPreset, RoutineType } from '../types/calendar';
import { triggerY2KConfetti } from './Y2KConfettiBurst';

export const LOOK_PRESETS: LookPreset[] = [
  {
    id: 'strawberry-dewy',
    name: 'Strawberry Dewy Girl',
    emoji: '🍓',
    type: 'both',
    vibe: 'Sun-kissed nose bridge & berry gloss',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  {
    id: 'cyber-glam',
    name: 'Cyber Pop Starlight Glam',
    emoji: '🦋',
    type: 'makeup',
    vibe: 'Frosted periwinkle & silver tear ducts',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  {
    id: '90s-brown-lip',
    name: '90s Frosted Brown Lip',
    emoji: '🎀',
    type: 'makeup',
    vibe: 'Defined chocolate liner & milky pink gloss',
    badgeColor: 'bg-pink-100 text-[#FF2A85] border-pink-300',
  },
  {
    id: 'glazed-donut-skin',
    name: 'Glazed Donut Hydration',
    emoji: '🍩',
    type: 'skincare',
    vibe: 'Milky oat drench & squalane slugging',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'pink-glitter-party',
    name: 'Pink Glitter Starlight Babe',
    emoji: '💖',
    type: 'makeup',
    vibe: 'Hot pink glitter wings & strobe beam',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
  },
  {
    id: 'speedrun-10min',
    name: '10-Min Fast Morning Speedrun',
    emoji: '⏰',
    type: 'both',
    vibe: 'Tinted SPF, multi-stick & tubing mascara',
    badgeColor: 'bg-yellow-100 text-[#854D0E] border-yellow-300',
  },
  {
    id: 'cold-spoon-barrier',
    name: 'Freezer Spoon & Barrier Reset',
    emoji: '🧊',
    type: 'skincare',
    vibe: 'Depuffing spoons, green tea & ceramides',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
  },
  {
    id: 'clean-girl-lip-oil',
    name: 'Clean Girl Glass Lip Oil',
    emoji: '💋',
    type: 'both',
    vibe: 'Brushed soap brows, tint & sheer glaze',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
];

const INITIAL_DEMO_LOGS: BeautyLogsMap = {
  '2026-10-04': {
    date: '2026-10-04',
    routineType: 'both',
    lookName: 'Strawberry Dewy Girl',
    emoji: '🍓',
    rating: 5,
    notes: 'Used Dewy Cheek Jelly in Wild Strawberry + GlowDrop oil! Cutest cheeks ever.',
    loggedAt: '2026-10-04T14:30:00Z',
  },
  '2026-10-05': {
    date: '2026-10-05',
    routineType: 'makeup',
    lookName: '90s Frosted Brown Lip',
    emoji: '🎀',
    rating: 5,
    notes: 'Cinnamon Toast brown liner + baby pink gloss center. Total supermodel energy!',
    loggedAt: '2026-10-05T16:00:00Z',
  },
  '2026-10-06': {
    date: '2026-10-06',
    routineType: 'skincare',
    lookName: 'Glazed Donut Hydration',
    emoji: '🍩',
    rating: 5,
    notes: 'Milky oat toner drench + squalane drops. Skin feels like velvet cushions!',
    loggedAt: '2026-10-06T18:20:00Z',
  },
};

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface BeautyCalendarProps {
  onSelectTab?: (tab: string) => void;
}

export const BeautyCalendar: React.FC<BeautyCalendarProps> = () => {
  // Current date
  const today = useMemo(() => new Date(2026, 9, 6), []); // Oct 6, 2026 local time reference
  const todayDateKey = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  // Calendar View month/year state
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonth, setViewMonth] = useState<number>(9); // 0-indexed: 9 = October

  // Beauty Logs in localStorage
  const [logs, setLogs] = useState<BeautyLogsMap>(() => {
    try {
      const saved = localStorage.getItem('allies_beauty_calendar_logs');
      if (saved) return JSON.parse(saved);
      return INITIAL_DEMO_LOGS;
    } catch {
      return INITIAL_DEMO_LOGS;
    }
  });

  // Active modal date for logging / editing
  const [modalDate, setModalDate] = useState<string | null>(null);

  // Modal form states
  const [selectedPresetId, setSelectedPresetId] = useState<string>('strawberry-dewy');
  const [customLookName, setCustomLookName] = useState<string>('');
  const [selectedType, setSelectedType] = useState<RoutineType>('both');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('🍓');
  const [rating, setRating] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('allies_beauty_calendar_logs', JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  // Consistency Streak Calculation
  const streakStats = useMemo(() => {
    let currentStreak = 0;
    const sortedDateKeys = Object.keys(logs).sort().reverse();
    
    // Check backwards from today
    const checkDate = new Date(today);
    const formatDate = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const todayKey = formatDate(checkDate);
    const hasToday = Boolean(logs[todayKey]);

    // If today is logged, start counting from today.
    // If not, check yesterday: if yesterday is logged, streak is still active!
    if (!hasToday) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const k = formatDate(checkDate);
      if (logs[k]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Longest streak calculation
    let maxStreak = 0;
    let tempStreak = 0;
    let prevTimestamp: number | null = null;
    const allKeysSorted = Object.keys(logs).sort();

    for (const key of allKeysSorted) {
      const currentTimestamp = new Date(key).getTime();
      if (prevTimestamp === null) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((currentTimestamp - prevTimestamp) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      }
      prevTimestamp = currentTimestamp;
      if (tempStreak > maxStreak) {
        maxStreak = tempStreak;
      }
    }

    const totalLogsCount = Object.keys(logs).length;
    
    // Count for currently viewed month
    const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    const monthLogsCount = Object.keys(logs).filter((k) => k.startsWith(monthPrefix)).length;

    return {
      currentStreak,
      maxStreak: Math.max(maxStreak, currentStreak),
      totalLogsCount,
      monthLogsCount,
      hasLoggedToday: hasToday,
    };
  }, [logs, today, viewYear, viewMonth]);

  // Calendar Grid Days
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
    
    // Previous month filler days
    const prevMonthDaysCount = new Date(viewYear, viewMonth, 0).getDate();
    const prevFillers = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      prevFillers.push({
        dayNumber: prevMonthDaysCount - i,
        isCurrentMonth: false,
        dateKey: `${viewMonth === 0 ? viewYear - 1 : viewYear}-${String(viewMonth === 0 ? 12 : viewMonth).padStart(2, '0')}-${String(prevMonthDaysCount - i).padStart(2, '0')}`,
      });
    }

    // Current month days
    const currentDays = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      currentDays.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateKey,
        isToday: dateKey === todayDateKey,
        log: logs[dateKey],
      });
    }

    // Next month fillers to complete 35 or 42 grid cells
    const totalSlots = Math.ceil((prevFillers.length + currentDays.length) / 7) * 7;
    const nextFillers = [];
    const needed = totalSlots - (prevFillers.length + currentDays.length);
    for (let i = 1; i <= needed; i++) {
      nextFillers.push({
        dayNumber: i,
        isCurrentMonth: false,
        dateKey: `${viewMonth === 11 ? viewYear + 1 : viewYear}-${String(viewMonth === 11 ? 1 : viewMonth + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      });
    }

    return [...prevFillers, ...currentDays, ...nextFillers];
  }, [viewYear, viewMonth, logs, todayDateKey]);

  // Open modal for a date
  const handleOpenDayModal = (dateKey: string) => {
    setModalDate(dateKey);
    const existing = logs[dateKey];
    if (existing) {
      const matchPreset = LOOK_PRESETS.find((p) => p.name === existing.lookName);
      if (matchPreset) {
        setSelectedPresetId(matchPreset.id);
        setCustomLookName('');
      } else {
        setSelectedPresetId('custom');
        setCustomLookName(existing.lookName);
      }
      setSelectedType(existing.routineType);
      setSelectedEmoji(existing.emoji);
      setRating(existing.rating || 5);
      setNotes(existing.notes || '');
    } else {
      setSelectedPresetId('strawberry-dewy');
      setCustomLookName('');
      setSelectedType('both');
      setSelectedEmoji('🍓');
      setRating(5);
      setNotes('');
    }
  };

  // Preset Selection Click
  const handleSelectPreset = (preset: LookPreset) => {
    setSelectedPresetId(preset.id);
    setSelectedEmoji(preset.emoji);
    setSelectedType(preset.type);
    setCustomLookName('');
  };

  // Save entry handler
  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalDate) return;

    let lookTitle = '';
    if (selectedPresetId === 'custom') {
      lookTitle = customLookName.trim() || 'Custom Beauty Routine';
    } else {
      const found = LOOK_PRESETS.find((p) => p.id === selectedPresetId);
      lookTitle = found ? found.name : 'Beauty Routine';
    }

    const newLog: BeautyDayLog = {
      date: modalDate,
      routineType: selectedType,
      lookName: lookTitle,
      emoji: selectedEmoji || '💖',
      rating,
      notes: notes.trim(),
      loggedAt: new Date().toISOString(),
    };

    setLogs((prev) => ({
      ...prev,
      [modalDate]: newLog,
    }));

    triggerY2KConfetti({ count: 60, mode: 'quiz' });
    setModalDate(null);
  };

  // Delete log handler
  const handleDeleteLog = () => {
    if (!modalDate) return;
    setLogs((prev) => {
      const updated = { ...prev };
      delete updated[modalDate];
      return updated;
    });
    setModalDate(null);
  };

  // Month navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    setViewYear(2026);
    setViewMonth(9); // October
  };

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-6 sm:py-8 space-y-6">
      
      {/* Top Banner / Calendar Title */}
      <div className="bg-white rounded-3xl border-3 border-[#FF2A85] p-6 sm:p-8 shadow-sticker flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Background Sparkle Doodles */}
        <div className="absolute top-2 right-4 text-3xl select-none rotate-12 opacity-80 pointer-events-none">
          🗓️
        </div>
        <div className="absolute -bottom-2 -left-2 text-3xl select-none -rotate-12 opacity-50 pointer-events-none">
          ✨
        </div>

        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border-2 border-yellow-400 shadow-sticker-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-current" />
            <span>DAILY VANITY PLANNER & GLOW TRACKER</span>
          </div>

          <h1 className="font-bubbly text-3xl sm:text-4xl font-bold text-[#FF1493] tracking-tight">
            Allie’s Beauty Calendar 🗓️✨
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 font-body max-w-xl">
            Tap any day on the monthly grid to log your makeup look or skincare ritual. Persist your daily logs and watch your Consistency Streak catch fire!
          </p>
        </div>

        {/* Consistency Streak Showcase Cards */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          
          {/* Current Streak Card */}
          <div className="bg-gradient-to-br from-[#FFF0F5] to-[#FFE4EE] border-3 border-[#FF2A85] rounded-3xl p-4 sm:p-5 shadow-sticker-sm text-center min-w-[140px] sm:min-w-[160px] relative overflow-hidden group hover:scale-103 transition-transform">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-wider text-[#FF1493] uppercase font-bubbly">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
              <span>GLAM STREAK</span>
            </div>

            <div className="mt-1 font-bubbly text-3xl sm:text-4xl font-bold text-[#E0176F] flex items-center justify-center gap-1">
              <span>{streakStats.currentStreak}</span>
              <span className="text-xl">🔥</span>
            </div>

            <span className="text-[11px] font-bold text-stone-600 font-body block mt-0.5">
              {streakStats.currentStreak === 1 ? '1 Day in a row' : `${streakStats.currentStreak} Days in a row!`}
            </span>

            {streakStats.currentStreak >= 3 && (
              <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider text-[#6B21A8] bg-[#E9D5FF] px-2 py-0.5 rounded-full border border-purple-300">
                {streakStats.currentStreak >= 7 ? '👑 Vanity Queen' : '🍰 Glow Baby'}
              </span>
            )}
          </div>

          {/* Monthly Total Logs Card */}
          <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF08A]/50 border-3 border-yellow-400 rounded-3xl p-4 sm:p-5 shadow-sticker-sm text-center min-w-[140px] sm:min-w-[160px] hover:scale-103 transition-transform">
            <div className="flex items-center justify-center gap-1 text-xs font-black tracking-wider text-[#854D0E] uppercase font-bubbly">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>THIS MONTH</span>
            </div>

            <div className="mt-1 font-bubbly text-3xl sm:text-4xl font-bold text-[#854D0E] flex items-center justify-center gap-1">
              <span>{streakStats.monthLogsCount}</span>
              <span className="text-xl">✨</span>
            </div>

            <span className="text-[11px] font-bold text-stone-600 font-body block mt-0.5">
              Routines Logged
            </span>

            <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider text-[#15803D] bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
              {streakStats.totalLogsCount} All-Time
            </span>
          </div>

        </div>

      </div>

      {/* Calendar Navigation & Month Selector Bar */}
      <div className="bg-white rounded-2xl border-2 border-pink-300 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-[#FF2A85] border border-pink-200 transition-colors cursor-pointer hover:scale-105"
            title="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h2 className="font-bubbly text-xl sm:text-2xl font-bold text-[#2D1226] tracking-tight flex items-center gap-2">
            <span>{MONTH_NAMES[viewMonth]} {viewYear}</span>
            <span className="text-lg">🎀</span>
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-[#FF2A85] border border-pink-200 transition-colors cursor-pointer hover:scale-105"
            title="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleJumpToToday}
            className="px-3.5 py-1.5 rounded-full bg-[#FFF0F5] hover:bg-pink-100 text-[#FF1493] font-bubbly font-bold text-xs border border-pink-300 shadow-xs transition-transform hover:scale-103 cursor-pointer"
          >
            Jump to Today 💖
          </button>

          <button
            onClick={() => handleOpenDayModal(todayDateKey)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly font-bold text-xs shadow-sticker-sm transition-transform hover:scale-104 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Today's Look ✨</span>
          </button>
        </div>
      </div>

      {/* Monthly Grid Container */}
      <div className="bg-white rounded-3xl border-3 border-[#FF2A85] p-3 sm:p-6 shadow-sticker overflow-hidden">
        
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d}
              className="text-center font-bubbly font-bold text-xs sm:text-sm text-[#FF1493] py-1.5 uppercase tracking-wider bg-pink-50/70 rounded-xl"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid Cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
          {calendarDays.map((cell, idx) => {
            const hasLog = Boolean(cell.log);

            return (
              <div
                key={`${cell.dateKey}-${idx}`}
                onClick={() => handleOpenDayModal(cell.dateKey)}
                className={`min-h-[78px] sm:min-h-[110px] md:min-h-[125px] rounded-2xl p-1.5 sm:p-2.5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative select-none ${
                  !cell.isCurrentMonth
                    ? 'bg-stone-50/60 border-stone-200 text-stone-400 opacity-60'
                    : cell.isToday
                    ? 'bg-gradient-to-b from-[#FFF0F5] to-white border-4 border-[#FF2A85] shadow-sticker-sm ring-2 ring-yellow-300'
                    : hasLog
                    ? 'bg-pink-50/70 border-pink-300 hover:border-[#FF2A85] hover:shadow-sticker-sm hover:translate-y-[-2px]'
                    : 'bg-white border-pink-100 hover:border-pink-300 hover:bg-[#FFF5F8] hover:translate-y-[-1px]'
                }`}
              >
                {/* Cell Header: Day Number & Today indicator */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bubbly text-xs sm:text-sm font-bold ${
                      cell.isToday
                        ? 'bg-[#FF2A85] text-white px-2 py-0.2 rounded-full shadow-xs'
                        : hasLog
                        ? 'text-[#2D1226]'
                        : 'text-stone-600'
                    }`}
                  >
                    {cell.dayNumber}
                  </span>

                  {cell.isToday && (
                    <span className="hidden sm:inline-block text-[9px] font-black uppercase text-[#854D0E] bg-[#FEF08A] px-1.5 py-0.2 rounded-full border border-yellow-300 shadow-xs">
                      Today
                    </span>
                  )}
                </div>

                {/* Cell Content: Log Preview */}
                {hasLog && cell.log ? (
                  <div className="my-auto space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xl sm:text-2xl drop-shadow-xs group-hover:scale-115 transition-transform inline-block">
                        {cell.log.emoji}
                      </span>
                      <div className="min-w-0 flex-1 hidden md:block">
                        <span className="font-bubbly text-[11px] font-bold text-[#2D1226] block truncate leading-tight group-hover:text-[#FF1493]">
                          {cell.log.lookName}
                        </span>
                        <div className="flex items-center gap-0.5 text-[9px] text-[#FF2A85] font-black">
                          {'★'.repeat(cell.log.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Routine tag pill for mobile / compact */}
                    <div className="block md:hidden truncate">
                      <span className="text-[9px] font-bubbly font-bold text-[#FF1493] truncate block">
                        {cell.log.lookName}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Empty Day Hover Prompt */
                  <div className="my-auto opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-pink-400">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF2A85]" />
                    <span className="text-[10px] font-bubbly font-bold text-[#FF2A85] hidden sm:inline">
                      + Log
                    </span>
                  </div>
                )}

                {/* Cell Footer tag */}
                {hasLog && cell.log && (
                  <div className="text-[9px] font-bold uppercase tracking-wider text-stone-500 font-body flex items-center justify-between">
                    <span className="hidden sm:inline">
                      {cell.log.routineType === 'both' ? '✨ Glam & Glow' : cell.log.routineType === 'makeup' ? '💄 Makeup' : '🧴 Skincare'}
                    </span>
                    <span className="text-[10px] text-pink-400 ml-auto group-hover:text-[#FF2A85]">
                      <Edit3 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Log Beauty Routine Interactive Modal */}
      {modalDate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setModalDate(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white border-4 border-[#FF2A85] shadow-[8px_8px_0px_#FF2A85] rounded-3xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setModalDate(null)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 bg-pink-100 hover:bg-pink-200 rounded-full border border-pink-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 text-center sm:text-left pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border border-yellow-400">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>LOG BEAUTY ROUTINE • {modalDate}</span>
              </div>
              <h3 className="font-bubbly text-2xl font-bold text-[#FF1493]">
                {logs[modalDate] ? 'Edit Your Glam Log 🎀' : 'What Was Your Vibe Today? 💄'}
              </h3>
              <p className="text-xs text-stone-600 font-body">
                Keep your consistency streak alive by recording what you wore or prepped!
              </p>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-4">
              
              {/* Routine Category Type Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bubbly font-bold text-stone-700 block">
                  1. What Did You Focus On Today?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'makeup', label: 'Makeup Look 💄' },
                    { id: 'skincare', label: 'Skincare Prep 🧴' },
                    { id: 'both', label: 'Both! Glam & Glow ✨' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id as RoutineType)}
                      className={`p-2.5 rounded-2xl border-2 text-xs font-bubbly font-bold transition-all cursor-pointer text-center ${
                        selectedType === t.id
                          ? 'bg-[#FF2A85] text-white border-white shadow-sticker-sm scale-102'
                          : 'bg-pink-50 text-stone-700 border-pink-200 hover:bg-pink-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Preset Routine Looks */}
              <div className="space-y-1.5">
                <label className="text-xs font-bubbly font-bold text-stone-700 block">
                  2. Choose a Routine or Preset:
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                  {LOOK_PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-2.5 rounded-2xl border-2 text-left flex items-start gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF0F5] border-[#FF2A85] shadow-xs scale-102 ring-2 ring-pink-300'
                            : 'bg-white border-pink-200 hover:bg-pink-50'
                        }`}
                      >
                        <span className="text-2xl shrink-0">{preset.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <span className="font-bubbly text-xs font-bold text-[#2D1226] block truncate">
                            {preset.name}
                          </span>
                          <span className="text-[10px] text-stone-500 font-body block truncate">
                            {preset.vibe}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom look option */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPresetId('custom');
                      setSelectedEmoji('✨');
                    }}
                    className={`w-full p-2 rounded-xl border-2 text-xs font-bubbly font-bold transition-all cursor-pointer text-center ${
                      selectedPresetId === 'custom'
                        ? 'bg-[#FFF0F5] border-[#FF2A85] text-[#FF1493]'
                        : 'bg-white text-stone-600 border-dashed border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    + Or Type a Custom Look / Routine Title
                  </button>

                  {selectedPresetId === 'custom' && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={selectedEmoji}
                        onChange={(e) => setSelectedEmoji(e.target.value)}
                        placeholder="Emoji"
                        className="w-16 px-2 py-2 text-center text-lg bg-pink-50 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-[#FF2A85]"
                        maxLength={2}
                      />
                      <input
                        type="text"
                        value={customLookName}
                        onChange={(e) => setCustomLookName(e.target.value)}
                        placeholder="e.g. Bronze Goddess Glow, No-Makeup Makeup..."
                        className="flex-1 px-3 py-2 text-xs font-body bg-pink-50 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-[#FF2A85]"
                        required={selectedPresetId === 'custom'}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Vibe / Satisfaction Heart Rating */}
              <div className="space-y-1.5">
                <label className="text-xs font-bubbly font-bold text-stone-700 block">
                  3. How Happy Were You With Today's Look?
                </label>
                <div className="flex items-center gap-2 bg-[#FFF0F5] p-2.5 rounded-2xl border border-pink-200 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      title={`${star} out of 5 Hearts`}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-[#FF2A85] fill-[#FF2A85]'
                            : 'text-stone-300 fill-stone-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bubbly text-xs font-bold text-[#FF1493]">
                    {rating === 5 ? 'Holy Grail 10/10 ✨' : rating >= 4 ? 'Super Cute 💕' : 'Nice Everyday Vibe 🌸'}
                  </span>
                </div>
              </div>

              {/* Quick Vanity Diary Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bubbly font-bold text-stone-700 block">
                  4. Vanity Notes & Products Used (Optional):
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Paired GlowDrop berry lip oil with brown liner, danced all day and zero hair stickiness!"
                  rows={2}
                  className="w-full text-xs font-body p-3 bg-pink-50/60 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-[#FF2A85] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                {logs[modalDate] ? (
                  <button
                    type="button"
                    onClick={handleDeleteLog}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-300 font-bubbly text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Log</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalDate(null)}
                    className="px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bubbly text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly text-xs font-bold shadow-sticker-sm hover:scale-104 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save to Calendar 💖</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};
