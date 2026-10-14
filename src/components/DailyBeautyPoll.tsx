import React, { useState, useEffect } from 'react';
import { Vote, Sparkles, CheckCircle2, TrendingUp, Flame, ChevronRight, RefreshCw } from 'lucide-react';

interface PollOption {
  id: string;
  label: string;
  emoji: string;
  initialVotes: number;
  color: string;
  gradient: string;
}

interface BeautyPoll {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  allieOpinion: string;
  options: [PollOption, PollOption];
}

const POLL_DILEMMAS: BeautyPoll[] = [
  {
    id: 'poll-lips',
    title: 'Glossy Lips vs. Matte Lips',
    category: 'The Great Lip Debate 💋',
    subtitle: 'Are we doing juicy glass-shine or velvet defined 90s pout today?',
    allieOpinion: '“Glossy lips 1000%! As long as it doesn’t glue your hair to your face in the wind, gloss is always superior.” — Allie 💄',
    options: [
      {
        id: 'glossy',
        label: 'Juicy Glass Gloss',
        emoji: '💋',
        initialVotes: 842,
        color: '#FF2A85',
        gradient: 'from-[#FF2A85] to-[#FF69B4]',
      },
      {
        id: 'matte',
        label: 'Velvet 90s Matte',
        emoji: '💄',
        initialVotes: 318,
        color: '#A855F7',
        gradient: 'from-[#9333EA] to-[#C084FC]',
      },
    ],
  },
  {
    id: 'poll-blush',
    title: 'Dewy Cream Blush vs. Powder Blush',
    category: 'Cheek Chemistry 🍓',
    subtitle: 'Sun-kissed melted strawberry tint or classic airbrushed powder flush?',
    allieOpinion: '“Cream blush melted into the skin with warm fingers looks 10x more realistic under natural sunlight.” — Allie 🍓',
    options: [
      {
        id: 'cream',
        label: 'Dewy Strawberry Cream',
        emoji: '🍓',
        initialVotes: 915,
        color: '#FF2A85',
        gradient: 'from-[#FF2A85] to-[#FB7185]',
      },
      {
        id: 'powder',
        label: 'Soft Velvet Powder',
        emoji: '🍑',
        initialVotes: 412,
        color: '#F59E0B',
        gradient: 'from-[#F59E0B] to-[#FBBF24]',
      },
    ],
  },
  {
    id: 'poll-eyes',
    title: 'Frosted Y2K Shimmer vs. Clean Girl Minimal',
    category: 'Eye Energy 🦋',
    subtitle: 'Icy baby blue & periwinkle lids or just curled lashes with clear gel?',
    allieOpinion: '“Life is too short to only wear brown mascara. Bring back frosted blue shimmer on Friday nights!” — Allie ✨',
    options: [
      {
        id: 'frosted',
        label: 'Frosted Y2K Blue Shimmer',
        emoji: '🦋',
        initialVotes: 730,
        color: '#0EA5E9',
        gradient: 'from-[#0284C7] to-[#38BDF8]',
      },
      {
        id: 'clean',
        label: 'Clean Girl Naked Lids',
        emoji: '☕',
        initialVotes: 512,
        color: '#84CC16',
        gradient: 'from-[#65A30D] to-[#A3E635]',
      },
    ],
  },
  {
    id: 'poll-lashes',
    title: 'Tubing Mascara vs. False Lash Strips',
    category: 'Lash Wars 👁️',
    subtitle: 'Triple-pump curler with tubing coat or full dramatic glued lash band?',
    allieOpinion: '“Lash glue is my nemesis. Tubing mascara washes off in warm water without taking half your lashes with it!” — Allie 🎀',
    options: [
      {
        id: 'tubing',
        label: 'Tubing Mascara (No Clumps)',
        emoji: '✨',
        initialVotes: 1045,
        color: '#FF2A85',
        gradient: 'from-[#FF2A85] to-[#E11D48]',
      },
      {
        id: 'falsies',
        label: 'Drama Strip Falsies',
        emoji: '👁️',
        initialVotes: 260,
        color: '#6366F1',
        gradient: 'from-[#4F46E5] to-[#818CF8]',
      },
    ],
  },
];

export const DailyBeautyPoll: React.FC = () => {
  const [activePollIndex, setActivePollIndex] = useState<number>(0);
  const currentPoll = POLL_DILEMMAS[activePollIndex];

  // User votes stored by poll id
  const [userVotes, setUserVotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('allies_beauty_poll_votes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Dynamic vote counts stored in state
  const [voteTally, setVoteTally] = useState<Record<string, Record<string, number>>>(() => {
    const initial: Record<string, Record<string, number>> = {};
    POLL_DILEMMAS.forEach((poll) => {
      initial[poll.id] = {
        [poll.options[0].id]: poll.options[0].initialVotes,
        [poll.options[1].id]: poll.options[1].initialVotes,
      };
    });
    return initial;
  });

  const [justVoted, setJustVoted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('allies_beauty_poll_votes', JSON.stringify(userVotes));
    } catch {
      // ignore
    }
  }, [userVotes]);

  const userChoice = userVotes[currentPoll.id];
  const votesA = voteTally[currentPoll.id]?.[currentPoll.options[0].id] ?? currentPoll.options[0].initialVotes;
  const votesB = voteTally[currentPoll.id]?.[currentPoll.options[1].id] ?? currentPoll.options[1].initialVotes;
  const totalVotes = votesA + votesB;
  const percentA = totalVotes > 0 ? Math.round((votesA / totalVotes) * 100) : 50;
  const percentB = 100 - percentA;

  const handleVote = (optionId: string) => {
    const previousChoice = userVotes[currentPoll.id];
    if (previousChoice === optionId) return; // already voted this option

    setVoteTally((prev) => {
      const currentPollTally = { ...(prev[currentPoll.id] || {}) };
      if (previousChoice) {
        currentPollTally[previousChoice] = Math.max(0, (currentPollTally[previousChoice] || 1) - 1);
      }
      currentPollTally[optionId] = (currentPollTally[optionId] || 0) + 1;
      return {
        ...prev,
        [currentPoll.id]: currentPollTally,
      };
    });

    setUserVotes((prev) => ({
      ...prev,
      [currentPoll.id]: optionId,
    }));

    setJustVoted(true);
    setTimeout(() => setJustVoted(false), 2000);
  };

  return (
    <section className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-3xl border-3 border-[#FF2A85] p-6 sm:p-8 shadow-sticker relative overflow-hidden">
        
        {/* Cute decorative corner stickers */}
        <div className="absolute -top-3 -right-3 text-3xl select-none rotate-12 pointer-events-none">
          💅
        </div>
        <div className="absolute -bottom-3 -left-3 text-3xl select-none -rotate-12 pointer-events-none">
          ✨
        </div>

        {/* Header Badge & Dilemma Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-pink-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border border-yellow-400">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-current animate-bounce" />
              <span>TODAY’S BEAUTY DILEMMA</span>
            </div>
            <h2 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493] flex items-center gap-2">
              <span>{currentPoll.title}</span>
              <Vote className="w-6 h-6 text-[#A855F7]" />
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-body">
              {currentPoll.subtitle}
            </p>
          </div>

          {/* Dilemma Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {POLL_DILEMMAS.map((poll, idx) => {
              const isSelected = activePollIndex === idx;
              const hasVoted = Boolean(userVotes[poll.id]);
              return (
                <button
                  key={poll.id}
                  onClick={() => setActivePollIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#FF2A85] text-white shadow-sticker-sm scale-103'
                      : 'bg-pink-50 text-pink-800 hover:bg-pink-100 border border-pink-200'
                  }`}
                >
                  <span>{poll.title.split(' vs.')[0]}</span>
                  {hasVoted && <span className="text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Voting Options */}
        <div className="py-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentPoll.options.map((opt, idx) => {
              const isSelected = userChoice === opt.id;
              const percent = idx === 0 ? percentA : percentB;
              const count = idx === 0 ? votesA : votesB;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleVote(opt.id)}
                  className={`group relative p-5 rounded-2xl border-3 text-left transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'border-[#FF2A85] bg-pink-50/60 shadow-sticker scale-[1.02]'
                      : 'border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50/30'
                  }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-[#FF2A85] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Your Pick!</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 bg-white rounded-2xl border-2 border-pink-200 shadow-sticker-sm group-hover:scale-110 transition-transform">
                      {opt.emoji}
                    </span>
                    <div>
                      <h3 className="font-bubbly text-lg font-bold text-[#2D1226] group-hover:text-[#FF2A85] transition-colors">
                        {opt.label}
                      </h3>
                      <span className="text-xs font-bold text-stone-500 font-body">
                        {userChoice ? `${percent}% of votes` : 'Click to vote! ✨'}
                      </span>
                    </div>
                  </div>

                  {/* Simple Horizontal Bar Chart Fill for this option */}
                  <div className="mt-4 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold font-body mb-1">
                      <span className="text-stone-600">{count.toLocaleString()} votes</span>
                      <span className="text-[#FF2A85] font-black text-sm">{percent}%</span>
                    </div>

                    <div className="w-full h-3.5 bg-pink-100 rounded-full overflow-hidden border border-pink-300 relative">
                      <div
                        className={`h-full bg-gradient-to-r ${opt.gradient} transition-all duration-700 ease-out`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Vote confirmation feedback */}
          {justVoted && (
            <div className="text-center animate-bounce">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border border-yellow-400 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-current" />
                <span>Vote recorded! You’re part of the {totalVotes.toLocaleString()} beauty besties! 💕</span>
              </span>
            </div>
          )}

          {/* Comparative Bar Chart Visualization */}
          <div className="bg-[#FFF0F5] border-2 border-pink-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#FF2A85]" />
                <span className="uppercase tracking-wider">Live Dilemma Breakdown</span>
              </div>
              <span className="text-stone-500 font-normal">
                {totalVotes.toLocaleString()} total votes cast
              </span>
            </div>

            {/* Split Dual-Bar */}
            <div className="h-6 w-full rounded-full overflow-hidden flex border-2 border-pink-300 shadow-inner">
              <div
                className="bg-gradient-to-r from-[#FF2A85] to-[#FF69B4] flex items-center justify-start px-3 text-white text-[11px] font-black transition-all duration-700 overflow-hidden whitespace-nowrap"
                style={{ width: `${percentA}%` }}
                title={`${currentPoll.options[0].label}: ${percentA}%`}
              >
                {percentA > 15 ? `${percentA}% ${currentPoll.options[0].emoji}` : `${percentA}%`}
              </div>
              <div
                className="bg-gradient-to-r from-[#A855F7] to-[#C084FC] flex items-center justify-end px-3 text-white text-[11px] font-black transition-all duration-700 overflow-hidden whitespace-nowrap"
                style={{ width: `${percentB}%` }}
                title={`${currentPoll.options[1].label}: ${percentB}%`}
              >
                {percentB > 15 ? `${currentPoll.options[1].emoji} ${percentB}%` : `${percentB}%`}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-stone-500">
              <span className="flex items-center gap-1 text-[#FF2A85]">
                ● {currentPoll.options[0].label} ({votesA.toLocaleString()})
              </span>
              <span className="flex items-center gap-1 text-[#A855F7]">
                ● {currentPoll.options[1].label} ({votesB.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Allie's Verdict Quote Box */}
          <div className="bg-[#FEF08A]/40 border-2 border-yellow-300 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl p-1 bg-white rounded-xl border border-yellow-300 shadow-xs shrink-0">
              💄
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#854D0E] bg-yellow-200 px-2 py-0.5 rounded-full inline-block">
                Allie’s Hot Take
              </span>
              <p className="text-xs sm:text-sm text-stone-800 font-body italic">
                {currentPoll.allieOpinion}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
