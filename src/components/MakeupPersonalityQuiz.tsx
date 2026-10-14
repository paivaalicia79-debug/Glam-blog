import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight, RotateCcw, Share2, Check, Star, BookOpen, Crown } from 'lucide-react';
import { BlogArticle } from '../types/blog';
import { triggerY2KConfetti } from './Y2KConfettiBurst';

interface QuizOption {
  text: string;
  emoji: string;
  styleKey: 'glitter' | 'glow' | 'gloss' | 'vintage';
}

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

interface StyleResult {
  key: string;
  title: string;
  subtitle: string;
  emoji: string;
  badge: string;
  badgeBg: string;
  description: string;
  mustHaves: string[];
  articleId: string;
  articleTitle: string;
  colorScheme: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your morning beauty vibe before leaving the house?",
    subtitle: "Be honest bestie, what's actually happening in front of your mirror?",
    options: [
      {
        text: "12 lip oils rolling in my tote bag, I need blinding glass-shine!",
        emoji: "💋",
        styleKey: "gloss",
      },
      {
        text: "Two quick dots of cream blush across my nose and skin tint in 3 minutes flat.",
        emoji: "🍓",
        styleKey: "glow",
      },
      {
        text: "Icy blue shimmer, face gems, and winged liner even for 8:00 AM class!",
        emoji: "🦋",
        styleKey: "glitter",
      },
      {
        text: "90s warm brown lip contour, satin skin, and fluffy tubing lashes.",
        emoji: "☕",
        styleKey: "vintage",
      },
    ],
  },
  {
    id: 2,
    question: "Pick your holy-grail desert island beauty item:",
    subtitle: "You can only save ONE item from your vanity table!",
    options: [
      {
        text: "Non-sticky strawberry scented lip oil with a giant plush wand.",
        emoji: "💄",
        styleKey: "gloss",
      },
      {
        text: "Bouncy water-gel cream blush stick that melts with finger heat.",
        emoji: "☀️",
        styleKey: "glow",
      },
      {
        text: "Blinding chrome duo-eyeshadow and peel-and-stick star face gems.",
        emoji: "✨",
        styleKey: "glitter",
      },
      {
        text: "Creamy warm cinnamon lip pencil and a triple-pump lash curler.",
        emoji: "🎀",
        styleKey: "vintage",
      },
    ],
  },
  {
    id: 3,
    question: "Your dream Friday night hangout looks like:",
    subtitle: "What is the perfect weekend aesthetic for you?",
    options: [
      {
        text: "Boba tea run with the girlies, taking flash camera mirror selfies.",
        emoji: "🧋",
        styleKey: "gloss",
      },
      {
        text: "Golden hour sunset walk, iced matcha, and cozy dewy skincare routine.",
        emoji: "🌸",
        styleKey: "glow",
      },
      {
        text: "Concert, dance floor strobe lights, and singing at the top of our lungs.",
        emoji: "🎶",
        styleKey: "glitter",
      },
      {
        text: "Thrifting vintage baby tees, record store digging, and cute indie cafe.",
        emoji: "📼",
        styleKey: "vintage",
      },
    ],
  },
  {
    id: 4,
    question: "Someone compliments your makeup! What did they notice?",
    subtitle: "The comment that makes you immediately smile all day:",
    options: [
      {
        text: "“Your lips look like literal glass! Where is that gloss from?!”",
        emoji: "💖",
        styleKey: "gloss",
      },
      {
        text: "“Your skin is so glowy and healthy, did you just vacation in Italy?”",
        emoji: "🍩",
        styleKey: "glow",
      },
      {
        text: "“OMG your eyes are literally sparkling from across the whole room!”",
        emoji: "⭐",
        styleKey: "glitter",
      },
      {
        text: "“You have that effortless 90s supermodel chic aesthetic down to a science.”",
        emoji: "👑",
        styleKey: "vintage",
      },
    ],
  },
  {
    id: 5,
    question: "Your ultimate personal beauty philosophy:",
    subtitle: "Words you live by when doing your makeup:",
    options: [
      {
        text: "“Never settle for a sticky lip formula; hydration is pure self-care.”",
        emoji: "💋",
        styleKey: "gloss",
      },
      {
        text: "“Less heavy powder, more water! Glazed donut skin forever.”",
        emoji: "🍓",
        styleKey: "glow",
      },
      {
        text: "“Life is way too short to only wear neutral brown shades.”",
        emoji: "🦋",
        styleKey: "glitter",
      },
      {
        text: "“A sculpted brown lip and fluffy lashes will NEVER go out of style.”",
        emoji: "🤎",
        styleKey: "vintage",
      },
    ],
  },
];

const STYLE_RESULTS: Record<string, StyleResult> = {
  glitter: {
    key: 'glitter',
    title: 'Glitter Pop Princess 🦋✨',
    subtitle: 'Concert Ready, Sparkly & Fearlessly Fun',
    emoji: '🦋',
    badge: 'ALLIE’S PARTY TWIN 💖',
    badgeBg: 'bg-[#BAE6FD] text-[#0369A1] border-sky-400',
    description:
      'You believe makeup should be an electric dopamine hit! While everyone else is wearing boring neutrals, you’re rocking periwinkle chrome lids, holographic face gems, and high-beam highlighters that catch flash photography from 50 feet away.',
    mustHaves: [
      'Cyber Ice Chrome Duo Eyeshadow',
      'Silver Star Face Gems Pack',
      'High-Beam Starlight Highlighter',
    ],
    articleId: 'frosted-blue-eyeshadow-comeback',
    articleTitle: 'Frosted Baby Blue Eyeshadow is Officially Back (And Actually Chic!) 🦋',
    colorScheme: 'from-sky-50 via-pink-50 to-purple-50 border-[#0EA5E9]',
  },
  glow: {
    key: 'glow',
    title: 'Natural Strawberry Glow Girl 🍓☀️',
    subtitle: 'Sun-Kissed, Glazed & Effortlessly Radiant',
    emoji: '🍓',
    badge: 'GLAZED DONUT QUEEN 🍩',
    badgeBg: 'bg-[#FEF08A] text-[#854D0E] border-yellow-400',
    description:
      'Your makeup goal is looking like you drink 3 gallons of water daily and just sprinted through a strawberry field. You melt bouncy water-gel blushes across your nose bridge, tap dewy serums onto cheekbones, and embrace your natural skin texture.',
    mustHaves: [
      'Dewy Cheek Jelly in Wild Strawberry',
      'Glaze Drops Serum Illuminator',
      'Tinted Squalane Peptide Lip Balm',
    ],
    articleId: 'viral-strawberry-girl-blush',
    articleTitle: 'How I Do The Viral Strawberry Girl Blush Without Looking Sunburned 🍓',
    colorScheme: 'from-pink-50 via-amber-50 to-rose-50 border-[#FF2A85]',
  },
  gloss: {
    key: 'gloss',
    title: 'Juicy Lip Gossip Royalty 💋👑',
    subtitle: 'Hydrated, Glass-Shine & Zero Sticky Drama',
    emoji: '💋',
    badge: 'HOLY GRAIL COLLECTOR 💄',
    badgeBg: 'bg-[#FCE7F3] text-[#BE185D] border-pink-400',
    description:
      'Your tote bag has its own zip code for lip products! You know the difference between a sticky wind-trap gloss and a cushiony peptide oil. Your lips are always hydrated, mirrored, and smelling like strawberry candy.',
    mustHaves: [
      'Berry Glaze Nourishing Lip Oil',
      'Hydra-Bounce Peptide Cushion Oil',
      'Plush Cloud Doe-Foot Wand',
    ],
    articleId: 'top-5-glossy-lip-oils',
    articleTitle: 'My Top 5 Glossy Lip Oils That Actually Aren’t Sticky (Under $15!) 💋',
    colorScheme: 'from-pink-50 via-rose-50 to-purple-50 border-[#FF1493]',
  },
  vintage: {
    key: 'vintage',
    title: '90s Velvet Chic Muse 🤎☕',
    subtitle: 'Supermodel Defined, Timeless & Iconic',
    emoji: '🤎',
    badge: 'EFFORTLESS COOL GIRL 🪞',
    badgeBg: 'bg-[#FED7AA] text-[#9A3412] border-amber-400',
    description:
      'You have that timeless cool-girl aesthetic that never looks try-hard. Warm cinnamon-nude lip liner with a frosted center, sculpted fluffy brows, and smudge-free tubing mascara are your signature routine.',
    mustHaves: [
      'Velvet Glide Lip Pencil in Cinnamon Toast',
      'Doll Lash Polymer Tubing Mascara',
      'Satin Cashmere Face Palette',
    ],
    articleId: 'inside-my-everyday-makeup-bag',
    articleTitle: 'Everything Inside My Everyday Makeup Bag (A Messy Confession) 👛',
    colorScheme: 'from-amber-50 via-orange-50 to-pink-50 border-[#A855F7]',
  },
};

interface MakeupPersonalityQuizProps {
  onOpenArticle?: (articleId: string) => void;
}

export const MakeupPersonalityQuiz: React.FC<MakeupPersonalityQuizProps> = ({
  onOpenArticle,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleSelectOption = (styleKey: string) => {
    const updated = [...answers, styleKey];
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed all questions! Trigger visual Y2K confetti celebration effect
      setCurrentStep(QUIZ_QUESTIONS.length);
      triggerY2KConfetti({
        mode: 'quiz',
        count: 110,
      });
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
  };

  // Calculate winner style
  const calculateResult = (): StyleResult => {
    const counts: Record<string, number> = {
      glitter: 0,
      glow: 0,
      gloss: 0,
      vintage: 0,
    };
    answers.forEach((ans) => {
      counts[ans] = (counts[ans] || 0) + 1;
    });

    let topKey = 'glow';
    let maxVotes = -1;
    Object.entries(counts).forEach(([k, v]) => {
      if (v > maxVotes) {
        maxVotes = v;
        topKey = k;
      }
    });

    return STYLE_RESULTS[topKey] || STYLE_RESULTS.glow;
  };

  const isCompleted = currentStep >= QUIZ_QUESTIONS.length;
  const currentQ = QUIZ_QUESTIONS[currentStep];
  const result = isCompleted ? calculateResult() : null;

  const handleShare = () => {
    if (!result) return;
    const textToCopy = `I took Allie's Glam Diary Quiz and got "${result.title}"! 💄✨ Discover your makeup style here!`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-3xl border-3 border-[#FF2A85] p-6 sm:p-8 shadow-sticker relative overflow-hidden">
        
        {/* Playful Stickers in Corner */}
        <div className="absolute -top-3 -right-3 text-3xl select-none rotate-12 pointer-events-none">
          🔮
        </div>
        <div className="absolute -bottom-3 -right-3 text-3xl select-none -rotate-6 pointer-events-none">
          ✨
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            {/* Header with Progress Bar */}
            <div className="space-y-3 border-b-2 border-pink-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9D5FF] text-[#6B21A8] font-bubbly text-xs font-bold border border-purple-400">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-current" />
                  <span>BEAUTY PERSONALITY QUIZ</span>
                </div>
                <span className="text-xs font-bold text-stone-500 font-body">
                  Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <h2 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493]">
                  What Is Your True Makeup Aesthetic? 🎀
                </h2>
              </div>

              {/* Progress bar */}
              <div className="h-2.5 w-full bg-pink-100 rounded-full overflow-hidden border border-pink-200">
                <div
                  className="h-full bg-gradient-to-r from-[#FF2A85] via-[#A855F7] to-[#38BDF8] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bubbly text-xl sm:text-2xl font-bold text-[#2D1226]">
                  {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 font-body mt-0.5">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.styleKey)}
                    className="group p-4 rounded-2xl border-2 border-pink-200 hover:border-[#FF2A85] bg-[#FFF0F5]/40 hover:bg-[#FFE4EE] text-left transition-all hover:scale-[1.02] shadow-xs hover:shadow-sticker-sm cursor-pointer flex items-start gap-3"
                  >
                    <span className="text-2xl p-2 bg-white rounded-xl border border-pink-200 shadow-xs shrink-0 group-hover:scale-110 transition-transform">
                      {opt.emoji}
                    </span>
                    <span className="text-xs sm:text-sm font-body font-bold text-stone-800 group-hover:text-[#FF1493] leading-relaxed pt-1">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Back / Navigation Helper */}
            {currentStep > 0 && (
              <div className="pt-2 text-right">
                <button
                  onClick={() => {
                    setCurrentStep((prev) => prev - 1);
                    setAnswers((prev) => prev.slice(0, -1));
                  }}
                  className="text-xs font-bold text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  ← Back to previous question
                </button>
              </div>
            )}
          </div>
        ) : (
          /* RESULT VIEW */
          result && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Header Ribbon */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border-2 border-yellow-400 shadow-sm animate-bounce">
                  <Crown className="w-4 h-4 text-amber-600 fill-current" />
                  <span>QUIZ RESULT • YOUR SIGNATURE AESTHETIC</span>
                </div>
                <h2 className="font-bubbly text-3xl sm:text-4xl font-bold text-[#FF1493] flex items-center justify-center gap-2">
                  <span>{result.title}</span>
                </h2>
                <p className="text-sm font-bold text-[#A855F7]">
                  {result.subtitle}
                </p>
              </div>

              {/* Main Result Card */}
              <div className={`p-6 rounded-3xl border-3 bg-gradient-to-br ${result.colorScheme} shadow-sticker space-y-4`}>
                <div className="flex items-start gap-4">
                  <span className="text-5xl p-3 bg-white rounded-2xl border-2 border-pink-300 shadow-sticker-sm shrink-0">
                    {result.emoji}
                  </span>
                  <div className="space-y-1">
                    <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${result.badgeBg}`}>
                      {result.badge}
                    </span>
                    <p className="text-sm sm:text-base text-stone-800 font-body leading-relaxed">
                      {result.description}
                    </p>
                  </div>
                </div>

                {/* Must-Haves Checklist */}
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border-2 border-pink-200 space-y-2">
                  <h4 className="font-bubbly text-xs font-bold text-[#FF1493] uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Your Holy-Grail Makeup Staples:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {result.mustHaves.map((item, i) => (
                      <div
                        key={i}
                        className="bg-pink-50 border border-pink-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-700 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-[#FF2A85] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Reading Link */}
                <div className="bg-white rounded-2xl p-4 border-2 border-[#FF2A85] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sticker-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-[#FFF0F5] rounded-xl border border-pink-200">
                      📖
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#FF1493]">
                        Recommended Diary Post For You:
                      </span>
                      <h4 className="font-bubbly text-sm font-bold text-stone-800">
                        {result.articleTitle}
                      </h4>
                    </div>
                  </div>

                  {onOpenArticle && (
                    <button
                      onClick={() => onOpenArticle(result.articleId)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-104 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Guide 💖</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-stone-700 border-2 border-pink-300 font-bubbly font-bold text-xs shadow-xs hover:scale-103 transition-transform cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz 🔄</span>
                  </button>

                  <button
                    onClick={() => triggerY2KConfetti({ mode: 'quiz', count: 90 })}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FEF08A] hover:bg-yellow-200 text-[#854D0E] border-2 border-yellow-400 font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-104 transition-transform cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Celebrate Match! 💖⭐</span>
                  </button>
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-103 transition-transform cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Result! 💕</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Your Result ✨</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )
        )}

      </div>
    </section>
  );
};
