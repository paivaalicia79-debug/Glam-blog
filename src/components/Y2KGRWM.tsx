import React, { useState } from 'react';
import { GRWM_STEPS } from '../data/blogData';
import { Sparkles, Check, Clock, RotateCcw } from 'lucide-react';

export const Y2KGRWM: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const resetRoutine = () => {
    setCompletedSteps([]);
  };

  const progressPercent = Math.round((completedSteps.length / GRWM_STEPS.length) * 100);

  return (
    <section className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Card */}
      <div className="bg-white rounded-3xl border-3 border-[#FF2A85] p-6 sm:p-8 shadow-sticker text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAE6FD] text-[#0369A1] font-bubbly text-xs font-bold border-2 border-sky-400">
          <span>✨ GET READY WITH ME</span>
        </div>

        <h2 className="font-bubbly text-3xl sm:text-4xl font-bold text-[#FF1493]">
          My Everyday 12-Minute GRWM Routine 🎀
        </h2>

        <p className="text-sm sm:text-base text-stone-600 font-body max-w-lg mx-auto">
          Grab your iced matcha, put on your Spotify playlist, and follow along step-by-step! Check off each step as you do it on your vanity mirror.
        </p>

        {/* Progress Bar & Reset */}
        <div className="pt-2 max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-between text-xs font-bold font-body">
            <span className="text-[#FF1493]">
              {completedSteps.length} of {GRWM_STEPS.length} Steps Done ({progressPercent}%)
            </span>
            {completedSteps.length > 0 && (
              <button
                onClick={resetRoutine}
                className="text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="h-3 bg-pink-100 rounded-full overflow-hidden border border-pink-300">
            <div
              className="h-full bg-gradient-to-r from-[#FF2A85] to-[#A855F7] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {progressPercent === 100 && (
            <div className="p-3 bg-[#FEF08A] rounded-2xl border-2 border-yellow-400 font-bubbly text-sm font-bold text-[#854D0E] animate-bounce">
              🎉 YOU ARE OFFICIALLY GLAM AND GORGEOUS! HAVE THE BEST DAY BESTIE! 💖✨
            </div>
          )}
        </div>
      </div>

      {/* Step by Step List */}
      <div className="space-y-4">
        {GRWM_STEPS.map((step) => {
          const isDone = completedSteps.includes(step.stepNumber);

          return (
            <div
              key={step.stepNumber}
              onClick={() => toggleStep(step.stepNumber)}
              className={`rounded-3xl border-3 transition-all p-5 sm:p-6 cursor-pointer ${
                isDone
                  ? 'bg-pink-50/70 border-pink-300 opacity-80'
                  : 'bg-white border-[#FF2A85] shadow-sticker hover:translate-x-1'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                
                <div className="flex items-start gap-3.5">
                  {/* Step Number Circle */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bubbly text-lg font-bold shrink-0 transition-colors ${
                    isDone ? 'bg-emerald-500 text-white' : 'bg-[#FF2A85] text-white shadow-sticker-sm'
                  }`}>
                    {isDone ? <Check className="w-5 h-5" /> : step.stepNumber}
                  </div>

                  {/* Title & Timing */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`font-bubbly text-lg sm:text-xl font-bold ${isDone ? 'line-through text-stone-500' : 'text-[#2D1226]'}`}>
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-bold bg-[#FEF08A] text-[#854D0E] px-2 py-0.5 rounded-full border border-yellow-300">
                        {step.time}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#FF1493] font-body mt-0.5">
                      Product: {step.product}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 font-body leading-relaxed mt-2">
                      {step.instructions}
                    </p>

                    {/* Allie's Comment */}
                    <div className="mt-3 bg-[#FFF0F5] border border-pink-200 rounded-2xl p-2.5 text-xs text-[#854D0E] font-body flex items-center gap-1.5">
                      <span className="text-sm">💬</span>
                      <span><strong>Allie’s note:</strong> {step.allieComment}</span>
                    </div>
                  </div>
                </div>

                {/* Checkbox circle */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-2 ${
                  isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-pink-300 bg-white'
                }`}>
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
