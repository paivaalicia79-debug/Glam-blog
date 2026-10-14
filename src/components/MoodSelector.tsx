import React from 'react';
import { Sparkles, Smile, Cloud, Zap, Coffee, RotateCcw } from 'lucide-react';
import { ArticleMood } from '../types/blog';

interface MoodSelectorProps {
  selectedMood: ArticleMood | 'All';
  onSelectMood: (mood: ArticleMood | 'All') => void;
  moodCounts: Record<ArticleMood | 'All', number>;
}

interface MoodConfig {
  mood: ArticleMood | 'All';
  label: string;
  emoji: string;
  tagline: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  badgeBg: string;
}

const MOODS: MoodConfig[] = [
  {
    mood: 'All',
    label: 'All Vibes',
    emoji: '✨',
    tagline: 'All beauty reads',
    activeBg: 'bg-gradient-to-r from-[#FF2A85] to-[#9333EA]',
    activeBorder: 'border-[#FF2A85]',
    activeText: 'text-white',
    badgeBg: 'bg-white/30 text-white',
  },
  {
    mood: 'Happy',
    label: 'Happy',
    emoji: '💖',
    tagline: 'Juicy, fun & budget wins',
    activeBg: 'bg-[#FF69B4]',
    activeBorder: 'border-[#FF1493]',
    activeText: 'text-white',
    badgeBg: 'bg-white/30 text-white',
  },
  {
    mood: 'Dreamy',
    label: 'Dreamy',
    emoji: '☁️',
    tagline: 'Pastels & sunset glow',
    activeBg: 'bg-[#C084FC]',
    activeBorder: 'border-[#9333EA]',
    activeText: 'text-white',
    badgeBg: 'bg-white/30 text-white',
  },
  {
    mood: 'Bold',
    label: 'Bold',
    emoji: '⚡',
    tagline: '90s lip & party drama',
    activeBg: 'bg-[#F59E0B]',
    activeBorder: 'border-[#D97706]',
    activeText: 'text-white',
    badgeBg: 'bg-white/30 text-white',
  },
  {
    mood: 'Chill',
    label: 'Chill',
    emoji: '🍵',
    tagline: 'Messy bags & fast routines',
    activeBg: 'bg-[#10B981]',
    activeBorder: 'border-[#059669]',
    activeText: 'text-white',
    badgeBg: 'bg-white/30 text-white',
  },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelectMood,
  moodCounts,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-xs rounded-3xl border-3 border-[#FF2A85] p-4 sm:p-5 shadow-sticker space-y-3">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b-2 border-pink-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xl">🪞</span>
          <div>
            <h3 className="font-bubbly text-sm sm:text-base font-bold text-[#FF1493] flex items-center gap-1.5">
              <span>HOW ARE YOU FEELING TODAY?</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current animate-spin" />
            </h3>
            <p className="text-[11px] font-body text-stone-500">
              Filter Allie's diary entries by your current aesthetic mood
            </p>
          </div>
        </div>

        {selectedMood !== 'All' && (
          <button
            onClick={() => onSelectMood('All')}
            className="inline-flex items-center gap-1 text-[11px] font-bubbly font-bold text-stone-500 hover:text-[#FF1493] bg-pink-50 hover:bg-pink-100 px-3 py-1 rounded-full border border-pink-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Mood Filter</span>
          </button>
        )}
      </div>

      {/* Mood Selector Emoji Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {MOODS.map((item) => {
          const isSelected = selectedMood === item.mood;
          const count = moodCounts[item.mood] || 0;

          return (
            <button
              key={item.mood}
              onClick={() => onSelectMood(item.mood)}
              className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                isSelected
                  ? `${item.activeBg} ${item.activeBorder} ${item.activeText} shadow-sticker-sm scale-103 font-bold`
                  : 'bg-[#FFF0F5] hover:bg-pink-100 border-pink-200 text-stone-700 hover:scale-102'
              }`}
            >
              {/* Emoji Icon */}
              <span className={`text-2xl mb-1 ${isSelected ? 'animate-bounce' : ''}`}>
                {item.emoji}
              </span>

              {/* Mood Name */}
              <span className="font-bubbly text-xs tracking-tight">
                {item.label}
              </span>

              {/* Count Badge */}
              <span
                className={`mt-1 text-[10px] font-mono px-2 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? item.badgeBg
                    : 'bg-white/80 text-stone-600 border border-pink-200'
                }`}
              >
                {count} {count === 1 ? 'post' : 'posts'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
