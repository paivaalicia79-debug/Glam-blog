import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Dices, Heart, Copy, Check, Calendar, ArrowRight, Lightbulb, Share2 } from 'lucide-react';
import { triggerY2KConfetti } from './Y2KConfettiBurst';

export interface Y2KDailyTip {
  id: string;
  category: 'Skincare' | 'Lips' | 'Cheeks' | 'Eyes' | 'Glow Prep';
  emoji: string;
  title: string;
  vibe: string;
  tipText: string;
  allieNote: string;
  proHack: string;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
    badgeBg: string;
  };
}

export const Y2K_DAILY_TIPS: Y2KDailyTip[] = [
  {
    id: 'tip-donut-skin',
    category: 'Skincare',
    emoji: '🍩',
    title: 'Glazed Donut Slugging with Rosehip & Squalane',
    vibe: 'Bedroom Pop Glow ✨',
    tipText: 'Right after your night moisturizer, press two drops of pure squalane or lightweight rosehip seed oil over your cheekbones and forehead. Sleep on a silk pillowcase to wake up with blinding, plump hydration without clogged pores!',
    allieNote: 'Heavy petroleum slugging can cause milia for teens, but squalane mimics your skin natural oils 100%!',
    proHack: 'Avoid heavy petroleum around your eyes—stick to lightweight botanical squalane.',
    colorScheme: {
      bg: 'from-amber-50 to-pink-50',
      border: 'border-amber-300',
      accent: 'text-amber-800',
      badgeBg: 'bg-[#FEF08A] text-[#854D0E] border-yellow-400',
    },
  },
  {
    id: 'tip-frozen-spoon',
    category: 'Skincare',
    emoji: '🥄',
    title: 'The 2000s Freezer Spoon Depuffing Ritual',
    vibe: 'Post-Late-Night Secret 🧊',
    tipText: 'Keep two clean metal teaspoons in your freezer overnight. In the morning, wrap them in a damp tissue and gently roll the curved back under your eyes outward toward your temples for 60 seconds.',
    allieNote: 'This constricts tired capillaries instantly and saves you from looking like you pulled an all-nighter for finals!',
    proHack: 'Never put dry freezing metal directly onto bare eyelids—always use a damp cloth or eye cream buffer!',
    colorScheme: {
      bg: 'from-sky-50 to-indigo-50',
      border: 'border-sky-300',
      accent: 'text-sky-800',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    },
  },
  {
    id: 'tip-butterfly-lips',
    category: 'Lips',
    emoji: '🦋',
    title: 'The 90s Brown Liner + Milky Gloss Contrast',
    vibe: 'Supermodel Nostalgia 💋',
    tipText: 'Trace only the peak of your cupid’s bow and center bottom rim with a warm chocolate brown pencil. Smudge softly inward using your pinky, then drown the center in milky baby pink or iridescent shimmer gloss.',
    allieNote: 'This creates an optical illusion of depth that makes lips look 2x plumper without stinging lip plumpers!',
    proHack: 'Never outline the whole mouth with dark pencil like a cartoon; keep corners hugging your natural lip line.',
    colorScheme: {
      bg: 'from-pink-50 to-rose-50',
      border: 'border-pink-300',
      accent: 'text-[#FF1493]',
      badgeBg: 'bg-pink-100 text-[#FF2A85] border-pink-300',
    },
  },
  {
    id: 'tip-strawberry-cheeks',
    category: 'Cheeks',
    emoji: '🍓',
    title: 'The "W" Nose Bridge Cream Blush Hack',
    vibe: 'Sun-Kissed Tuscan Cutie ☀️',
    tipText: 'Instead of two static pink circles on your cheeks, tap a dewy cream berry stick across cheekbones and bridge of your nose in a continuous soft "W" pattern using your warm fingertips.',
    allieNote: 'The bridge connection tricks the eye into thinking you spent the afternoon in sunshine instead of 3rd period chemistry!',
    proHack: 'Warm fingers melt cream pigments 10x better than makeup sponges.',
    colorScheme: {
      bg: 'from-rose-50 to-pink-50',
      border: 'border-rose-300',
      accent: 'text-rose-800',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    },
  },
  {
    id: 'tip-icy-shimmer',
    category: 'Eyes',
    emoji: '❄️',
    title: 'Frosted Tear-Duct Champagne Pop',
    vibe: 'Flash Photo Hack ✨',
    tipText: 'Dab a damp flat synthetic brush into an icy periwinkle or champagne chrome shadow and press it strictly onto your inner tear ducts. Keep the crease completely naked and fresh!',
    allieNote: 'Catches party strobe lights like crazy and looks blindingly gorgeous in 2000s digicam flash photos.',
    proHack: 'Spritz your brush with setting mist first for zero glitter fallout onto cheeks.',
    colorScheme: {
      bg: 'from-purple-50 to-indigo-50',
      border: 'border-purple-300',
      accent: 'text-purple-800',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    },
  },
  {
    id: 'tip-damp-skin-tint',
    category: 'Glow Prep',
    emoji: '💧',
    title: 'The Damp Face Skin Drench Rule',
    vibe: 'Glazed Skin Routine 🍩',
    tipText: 'Never slap tinted moisturizer on dry skin! Mist your face with a milky oat toner and smooth your skin tint on while skin is still slightly damp so pigments glide without clinging to dry nose patches.',
    allieNote: 'Your tint locks onto the water cushion and stays dewy until 5:00 PM without flaking.',
    proHack: 'Mix one tiny drop of liquid face oil directly into your skin tint on the back of your hand.',
    colorScheme: {
      bg: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-300',
      accent: 'text-emerald-800',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
  },
  {
    id: 'tip-wind-test-gloss',
    category: 'Lips',
    emoji: '🌬️',
    title: 'The Hair-In-Gloss Wind Resistance Test',
    vibe: 'Vanity Bag Wisdom 💄',
    tipText: 'When testing a new lip gloss in the store, swipe a drop on the back of your hand and tap a loose hair strand against it. If the hair sticks and doesn’t release with a gentle blow, it has too much heavy mineral resin!',
    allieNote: 'Modern 2026 formulas use jojoba and squalane water-gel matrices so your hair never gets glued to your mouth!',
    proHack: 'Look for "peptide lip oil" or "gel glaze" instead of heavy lacquer.',
    colorScheme: {
      bg: 'from-fuchsia-50 to-pink-50',
      border: 'border-fuchsia-300',
      accent: 'text-fuchsia-800',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
    },
  },
  {
    id: 'tip-green-tea-cubes',
    category: 'Skincare',
    emoji: '🍵',
    title: 'Iced Green Tea Anti-Inflammatory Cubes',
    vibe: 'Kitchen Vanity DIY 🌿',
    tipText: 'Brew strong antioxidant green tea, pour into clean mini silicone ice trays, and freeze. When an angry breakout or puffy cheek pops up, wrap a tea cube in a soft paper towel and glide over the area for 30 seconds.',
    allieNote: 'The EGCG polyphenols and caffeine calm redness faster than any $30 luxury acne serum!',
    proHack: 'Always wrap the ice cube so you do not cause cold shock to sensitive skin capillaries.',
    colorScheme: {
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-300',
      accent: 'text-green-800',
      badgeBg: 'bg-green-100 text-green-800 border-green-300',
    },
  },
];

export const DailyBeautyTip: React.FC = () => {
  // Compute deterministic index based on today's calendar date
  const todayDateStr = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  const defaultDailyIndex = useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return Math.abs(dayOfYear) % Y2K_DAILY_TIPS.length;
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(defaultDailyIndex);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const currentTip = Y2K_DAILY_TIPS[currentIndex];

  // Check if current tip is liked in localStorage
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem('allies_liked_daily_tips');
      if (savedLikes) {
        const parsed = JSON.parse(savedLikes);
        setIsLiked(Boolean(parsed[currentTip.id]));
      } else {
        setIsLiked(false);
      }
    } catch {
      setIsLiked(false);
    }
  }, [currentTip.id]);

  const handleShuffle = () => {
    setIsShuffling(true);
    let count = 0;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Y2K_DAILY_TIPS.length);
      count++;
      if (count > 5) {
        clearInterval(interval);
        setIsShuffling(false);
        triggerY2KConfetti({ count: 35, mode: 'quiz' });
      }
    }, 90);
  };

  const handleCopy = () => {
    const text = `💖 ALLIE'S DAILY Y2K BEAUTY TIP (${todayDateStr}):\n"${currentTip.title}"\n👉 ${currentTip.tipText}\n✨ Big Sis Tip: ${currentTip.allieNote}\n(From Allie's Glam Diary 💋)`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    const willLike = !isLiked;
    setIsLiked(willLike);
    try {
      const savedLikes = localStorage.getItem('allies_liked_daily_tips') || '{}';
      const parsed = JSON.parse(savedLikes);
      parsed[currentTip.id] = willLike;
      localStorage.setItem('allies_liked_daily_tips', JSON.stringify(parsed));
    } catch {
      // ignore
    }

    if (willLike) {
      triggerY2KConfetti({
        originX: e.clientX,
        originY: e.clientY,
        count: 45,
        mode: 'bookmarks',
      });
    }
  };

  return (
    <section className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="relative bg-white rounded-3xl border-3 border-[#FF2A85] p-5 sm:p-7 shadow-sticker overflow-hidden group">
        
        {/* Playful Stickers in Corners */}
        <div className="absolute top-2 right-3 text-2xl select-none rotate-12 pointer-events-none opacity-85">
          💖
        </div>
        <div className="absolute -bottom-2 -left-2 text-3xl select-none -rotate-12 pointer-events-none opacity-40">
          ✨
        </div>

        {/* Top Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-pink-100 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border-2 border-yellow-400 shadow-sticker-sm">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>DAILY BEAUTY TIP • {todayDateStr.toUpperCase()}</span>
            </div>

            <span className="text-[11px] font-bold text-stone-500 font-body hidden sm:inline">
              ✨ Fresh vanity wisdom every 24 hours
            </span>
          </div>

          {/* Action Buttons: Shuffle & Copy */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] hover:bg-pink-100 text-[#FF1493] border-2 border-pink-300 font-bubbly text-xs font-bold shadow-xs hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
              title="Shuffle another Y2K beauty tip!"
            >
              <Dices className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>{isShuffling ? 'Shuffling...' : 'Shuffle Tip 🎲'}</span>
            </button>

            <button
              onClick={handleToggleLike}
              className={`p-2 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${
                isLiked
                  ? 'bg-[#FF2A85] text-white border-white shadow-sticker-sm'
                  : 'bg-white text-stone-600 border-pink-200 hover:text-[#FF1493]'
              }`}
              title={isLiked ? 'Tip saved in your vanity heart list' : 'Heart this beauty tip!'}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white text-white' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-full bg-white hover:bg-pink-50 text-stone-600 hover:text-[#FF1493] border-2 border-pink-200 transition-transform hover:scale-110 cursor-pointer"
              title="Copy tip to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Tip Body Container with Dynamic Theme Gradient */}
        <div
          className={`mt-4 p-5 sm:p-6 rounded-2xl border-2 bg-gradient-to-br ${currentTip.colorScheme.bg} ${currentTip.colorScheme.border} transition-all duration-300 space-y-3.5`}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Big Emoji Icon Box */}
            <div className="text-3xl sm:text-4xl p-3 bg-white rounded-2xl border-2 border-pink-200 shadow-sticker-sm shrink-0 flex items-center justify-center">
              {currentTip.emoji}
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentTip.colorScheme.badgeBg}`}>
                  {currentTip.category}
                </span>
                <span className="text-[11px] font-bubbly font-bold text-stone-500">
                  {currentTip.vibe}
                </span>
              </div>

              <h3 className="font-bubbly text-lg sm:text-xl font-bold text-[#2D1226] leading-snug">
                {currentTip.title}
              </h3>
            </div>
          </div>

          {/* Detailed Tip Instruction */}
          <p className="text-xs sm:text-sm text-stone-800 font-body leading-relaxed bg-white/90 p-4 rounded-xl border border-pink-200/80 shadow-xs">
            {currentTip.tipText}
          </p>

          {/* Allie's Big Sis Advice Callout */}
          <div className="flex items-start gap-2 text-xs font-body text-[#854D0E] bg-[#FEF08A]/70 p-3 rounded-xl border border-yellow-300">
            <span className="text-base select-none shrink-0">💌</span>
            <div className="leading-relaxed">
              <strong className="font-bubbly text-[#FF1493] block">Allie’s Honest Advice:</strong>
              <span>"{currentTip.allieNote}"</span>
            </div>
          </div>
        </div>

        {/* Bottom Tip Footer Indicator */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-body text-stone-500 px-1">
          <span className="flex items-center gap-1 font-bold text-[#FF1493]">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
            <span>Pro Hack: {currentTip.proHack}</span>
          </span>

          <span className="font-mono text-[10px] text-stone-400 hidden sm:inline">
            Tip {currentIndex + 1} of {Y2K_DAILY_TIPS.length}
          </span>
        </div>

      </div>
    </section>
  );
};
