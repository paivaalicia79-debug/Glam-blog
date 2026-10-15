import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, RotateCcw, SkipForward, SkipBack, Sparkles, 
  Volume2, VolumeX, CheckCircle2, Heart, Clock, Award, 
  ExternalLink, Maximize2, Minimize2, Droplet, Sun, ShieldCheck
} from 'lucide-react';
import { SKIN_PREP_STEPS, TOTAL_SKIN_PREP_SECONDS } from '../data/skinPrepData';
import { SkinPrepStep } from '../types/skinPrep';
import { triggerY2KConfetti } from './Y2KConfettiBurst';

interface GlowUpSkinPrepTimerProps {
  onSessionComplete?: () => void;
  isFloating?: boolean;
  onToggleFloating?: () => void;
  onOpenArticleByTopic?: (topic: string) => void;
}

export const GlowUpSkinPrepTimer: React.FC<GlowUpSkinPrepTimerProps> = ({
  onSessionComplete,
  isFloating = false,
  onToggleFloating,
  onOpenArticleByTopic,
}) => {
  // Timer state (seconds remaining in the whole 10-minute routine, starting at 600s)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_SKIN_PREP_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Play a soft, pleasant Y2K harmonic chime via Web Audio API
  const playChime = (type: 'step' | 'complete') => {
    if (isSoundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const notes = type === 'complete' 
        ? [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 (major victory arpeggio)
        : [587.33, 880.00]; // D5, A5 (gentle bell)

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.5);
      });
    } catch {
      // AudioContext policy or unsupported, silent fallback
    }
  };

  // Determine which step is currently active based on elapsed seconds
  const elapsedSeconds = TOTAL_SKIN_PREP_SECONDS - secondsRemaining;

  const { currentStepIndex, stepElapsedSeconds, stepSecondsRemaining } = useMemo(() => {
    let accumulated = 0;
    for (let i = 0; i < SKIN_PREP_STEPS.length; i++) {
      const stepDuration = SKIN_PREP_STEPS[i].durationSeconds;
      if (elapsedSeconds < accumulated + stepDuration || i === SKIN_PREP_STEPS.length - 1) {
        const inStepElapsed = Math.max(0, elapsedSeconds - accumulated);
        const inStepRemaining = Math.max(0, stepDuration - inStepElapsed);
        return {
          currentStepIndex: i,
          stepElapsedSeconds: inStepElapsed,
          stepSecondsRemaining: inStepRemaining,
        };
      }
      accumulated += stepDuration;
    }
    return {
      currentStepIndex: SKIN_PREP_STEPS.length - 1,
      stepElapsedSeconds: SKIN_PREP_STEPS[SKIN_PREP_STEPS.length - 1].durationSeconds,
      stepSecondsRemaining: 0,
    };
  }, [elapsedSeconds]);

  const currentStep = SKIN_PREP_STEPS[currentStepIndex];

  // Detect step transitions to play gentle reminder chime
  const prevStepRef = useRef<number>(currentStepIndex);
  useEffect(() => {
    if (isRunning && prevStepRef.current !== currentStepIndex) {
      playChime('step');
    }
    prevStepRef.current = currentStepIndex;
  }, [currentStepIndex, isRunning]);

  // High-accuracy interval countdown using delta timestamp
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsComplete(true);
          playChime('complete');
          triggerY2KConfetti({ count: 90, mode: 'quiz' });
          if (onSessionComplete) {
            onSessionComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onSessionComplete]);

  // Controls
  const togglePlayPause = () => {
    if (isComplete) {
      resetTimer();
      setIsRunning(true);
      return;
    }
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(TOTAL_SKIN_PREP_SECONDS);
    setIsComplete(false);
  };

  const jumpToStep = (index: number) => {
    let accumulatedBefore = 0;
    for (let i = 0; i < index; i++) {
      accumulatedBefore += SKIN_PREP_STEPS[i].durationSeconds;
    }
    const newRemaining = TOTAL_SKIN_PREP_SECONDS - accumulatedBefore;
    setSecondsRemaining(newRemaining);
    setIsComplete(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < SKIN_PREP_STEPS.length - 1) {
      jumpToStep(currentStepIndex + 1);
    } else {
      // Complete
      setSecondsRemaining(0);
      setIsRunning(false);
      setIsComplete(true);
      playChime('complete');
      triggerY2KConfetti({ count: 90, mode: 'quiz' });
      if (onSessionComplete) onSessionComplete();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      jumpToStep(currentStepIndex - 1);
    } else {
      resetTimer();
    }
  };

  // Time formatters
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress metrics
  const totalPercent = Math.round((elapsedSeconds / TOTAL_SKIN_PREP_SECONDS) * 100);
  const stepPercent = Math.min(
    100,
    Math.round((stepElapsedSeconds / currentStep.durationSeconds) * 100)
  );

  // SVG Circular ring calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalPercent / 100) * circumference;

  // Mini Floating View Widget (when user is scrolling the diary while prepping skin)
  if (isFloating) {
    return (
      <div className="fixed bottom-6 left-6 z-50 bg-white/95 backdrop-blur-md rounded-2xl border-3 border-[#FF2A85] p-3 shadow-sticker animate-in fade-in slide-in-from-bottom-4 flex items-center gap-3.5 max-w-sm">
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg className="w-12 h-12 -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#FCE7F3"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#FF1493"
              strokeWidth="4"
              fill="none"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={2 * Math.PI * 20 - (totalPercent / 100) * (2 * Math.PI * 20)}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <span className="absolute font-mono text-[11px] font-bold text-[#FF1493] tabular-nums">
            {formatTime(secondsRemaining)}
          </span>
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            <span>Step {currentStep.stepNumber}/5</span>
            <span>·</span>
            <span className="truncate">{currentStep.emoji} {currentStep.category}</span>
          </div>
          <div className="font-bubbly text-xs font-bold text-[#2D1226] truncate">
            {currentStep.title}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={togglePlayPause}
            className="w-8 h-8 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white flex items-center justify-center shadow-xs cursor-pointer"
            title={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          {onToggleFloating && (
            <button
              onClick={onToggleFloating}
              className="w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 text-[#FF2A85] flex items-center justify-center cursor-pointer"
              title="Expand to Full Vanity"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Full Expanded Vanity Glow-Up Routine Component
  return (
    <div className="w-full bg-white rounded-3xl border-3 border-[#FF2A85] p-5 sm:p-8 shadow-sticker relative overflow-hidden transition-all">
      
      {/* Background Decorative Sparkles */}
      <div className="absolute top-2 right-4 text-pink-200 text-3xl select-none pointer-events-none opacity-60">
        ✨
      </div>
      <div className="absolute bottom-3 left-4 text-pink-200 text-3xl select-none pointer-events-none opacity-60">
        🌸
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-pink-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE4EE] text-[#FF2A85] font-bubbly text-xs font-bold border border-pink-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLOW-UP SKIN PREP COUNTDOWN</span>
          </div>
          <h2 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493] mt-1">
            10-Minute Skin Prep Routine 🧖‍♀️✨
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-body">
            Prep like a pro: hydrate, de-puff, and seal skin barrier so your foundation never separates or cakes!
          </p>
        </div>

        {/* Audio Mute & Widget Minimize Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setIsSoundMuted(!isSoundMuted)}
            className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              isSoundMuted
                ? 'bg-stone-100 text-stone-500 border-stone-200'
                : 'bg-pink-50 text-[#FF2A85] border-pink-200 hover:bg-pink-100'
            }`}
            title={isSoundMuted ? 'Unmute Step Bell' : 'Mute Step Bell'}
            aria-label="Toggle chime sound"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline text-[11px] font-bubbly">
              {isSoundMuted ? 'Muted' : 'Chime On'}
            </span>
          </button>

          {onToggleFloating && (
            <button
              onClick={onToggleFloating}
              className="p-2 rounded-xl text-xs font-bold bg-pink-50 hover:bg-pink-100 text-[#FF2A85] border border-pink-200 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Minimize to Floating Vanity Dock"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden md:inline text-[11px] font-bubbly">Dock</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Timer Display & Interactive Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
        
        {/* Left Column: Big Circular Countdown Display */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50/70 to-rose-50/30 rounded-3xl border-2 border-pink-200">
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
            {/* SVG Circular Ring */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#FCE7F3"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="url(#timerPinkGradient)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="timerPinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF1493" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Digits and Labels */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500 font-body">
                {isComplete ? 'COMPLETED! 🎉' : isRunning ? 'COUNTING DOWN' : 'READY TO GLOW'}
              </span>
              <div className="font-mono text-4xl sm:text-5xl font-black text-[#FF1493] tabular-nums tracking-tight my-0.5">
                {formatTime(secondsRemaining)}
              </div>
              <span className="text-xs font-bold text-stone-600 font-bubbly">
                {totalPercent}% OF 10 MINS
              </span>
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0 && secondsRemaining === TOTAL_SKIN_PREP_SECONDS}
              className="w-10 h-10 rounded-full bg-white hover:bg-pink-100 disabled:opacity-40 text-stone-700 border-2 border-pink-200 flex items-center justify-center cursor-pointer transition-all shadow-xs"
              title="Previous Step"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlayPause}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FF1493] hover:from-[#E0176F] hover:to-[#D01077] text-white font-bubbly font-bold text-sm shadow-sticker hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Timer</span>
                </>
              ) : isComplete ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Start Fresh 10m</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>{secondsRemaining < TOTAL_SKIN_PREP_SECONDS ? 'Resume Prep' : 'Start 10-Min Prep ✨'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextStep}
              className="w-10 h-10 rounded-full bg-white hover:bg-pink-100 text-stone-700 border-2 border-pink-200 flex items-center justify-center cursor-pointer transition-all shadow-xs"
              title="Next Step"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={resetTimer}
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-stone-500 border-2 border-stone-200 flex items-center justify-center cursor-pointer transition-all shadow-xs"
              title="Reset to 10:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Active Step Details & Skincare Guidance */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Step Highlight Card */}
          <div className="bg-[#FFF8FA] rounded-2xl border-2 border-pink-300 p-4 sm:p-5 shadow-xs relative">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#FF2A85] text-white flex items-center justify-center font-bubbly text-xs font-bold">
                  {currentStep.stepNumber}
                </span>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider font-body">
                  Step {currentStep.stepNumber} of 5 · {Math.round(currentStep.durationSeconds / 60 * 10) / 10} Mins
                </span>
              </div>

              <div className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-white text-[#FF1493] px-2.5 py-1 rounded-full border border-pink-200 tabular-nums">
                <Clock className="w-3 h-3" />
                <span>{formatTime(stepSecondsRemaining)} left</span>
              </div>
            </div>

            <h3 className="font-bubbly text-lg sm:text-xl font-bold text-[#2D1226] flex items-center gap-2">
              <span className="text-2xl">{currentStep.emoji}</span>
              <span>{currentStep.title}</span>
            </h3>

            {/* Step Progress Bar */}
            <div className="w-full bg-pink-100 h-2 rounded-full mt-2.5 overflow-hidden border border-pink-200">
              <div
                className="bg-gradient-to-r from-[#FF2A85] to-[#A855F7] h-full transition-all duration-300"
                style={{ width: `${stepPercent}%` }}
              />
            </div>

            {/* Purpose & Instructions */}
            <div className="mt-3.5 space-y-2 text-xs sm:text-sm text-stone-700 font-body leading-relaxed">
              <p>
                <strong>Why this step:</strong> {currentStep.purpose}
              </p>
              <p className="bg-white p-3 rounded-xl border border-pink-100 text-stone-800">
                <strong>How to do it:</strong> {currentStep.instructions}
              </p>
            </div>

            {/* Allie's Pro Tip */}
            <div className="mt-3 bg-[#FEF08A] rounded-xl border border-yellow-300 p-2.5 text-xs text-[#854D0E] font-body flex items-start gap-2">
              <span className="text-base leading-none">💡</span>
              <div>
                <strong>Allie’s Skin Prep Secret:</strong> {currentStep.proTip}
              </div>
            </div>

            {/* Key ingredient & product recommendation */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-600 font-body">
              <span className="bg-white px-2.5 py-1 rounded-full border border-pink-200">
                🧴 Ideal: <strong>{currentStep.recommendedProductType}</strong>
              </span>
              <span className="bg-white px-2.5 py-1 rounded-full border border-pink-200">
                ✨ Key: <strong>{currentStep.keyIngredient}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Timeline Selector (Clickable to jump between steps) */}
      <div className="mt-2 pt-4 border-t-2 border-pink-100">
        <div className="text-xs font-bold text-stone-500 font-body mb-2.5 flex items-center justify-between">
          <span>10-Minute Skincare Steps Timeline (Click to jump):</span>
          <span>{currentStepIndex + 1} / {SKIN_PREP_STEPS.length} Steps</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SKIN_PREP_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPast = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => jumpToStep(idx)}
                className={`p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-pink-100/80 border-[#FF2A85] shadow-sticker-sm scale-102'
                    : isPast
                    ? 'bg-emerald-50/60 border-emerald-300 text-stone-600'
                    : 'bg-white border-pink-200 hover:border-pink-300 opacity-90'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{step.emoji}</span>
                  <span className="text-[10px] font-mono font-bold text-stone-500">
                    {step.durationSeconds / 60}m
                  </span>
                </div>
                <div className="text-xs font-bubbly font-bold text-[#2D1226] truncate">
                  {step.stepNumber}. {step.category.toUpperCase()}
                </div>
                <div className="text-[10px] font-body text-stone-500 truncate mt-0.5">
                  {step.title}
                </div>
                {isPast && (
                  <div className="absolute top-1.5 right-1.5 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Banner */}
      {isComplete && (
        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-[#FEF08A] to-pink-100 rounded-2xl border-2 border-yellow-400 text-center space-y-2 animate-in fade-in zoom-in-95">
          <div className="text-3xl">💖 🧖‍♀️ 🍓</div>
          <h4 className="font-bubbly text-xl font-bold text-[#854D0E]">
            Yay Bestie! You Finished Your 10-Minute Skin Prep!
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 font-body max-w-md mx-auto">
            Your skin barrier is hydrated, de-puffed, and protected with SPF. Your makeup base will now blend like butter with zero cakeyness!
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                triggerY2KConfetti({ count: 80, mode: 'quiz' });
                if (onSessionComplete) onSessionComplete();
              }}
              className="px-5 py-2 rounded-full bg-[#FF2A85] text-white font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-105 transition-transform cursor-pointer"
            >
              +1 Log To Vanity Consistency Streak! 🔥
            </button>
            <button
              onClick={resetTimer}
              className="px-4 py-2 rounded-full bg-white text-stone-700 font-bubbly font-bold text-xs border border-pink-300 hover:bg-pink-50 cursor-pointer"
            >
              Reset Timer
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
