import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Heart, Flame, Award, ShieldCheck, Check, 
  RotateCcw, Sliders, Droplet, Sun, Clock, User, Edit3, 
  ToggleLeft, ToggleRight, Sparkle
} from 'lucide-react';
import { UserProfileData, SkinType } from '../types/skinPrep';
import { DEFAULT_USER_PROFILE } from '../data/skinPrepData';
import { GlowUpSkinPrepTimer } from './GlowUpSkinPrepTimer';
import { triggerY2KConfetti } from './Y2KConfettiBurst';

interface Y2KUserProfileProps {
  onOpenArticleByTopic?: (topic: string) => void;
  onSelectTab?: (tab: string) => void;
  isFloatingTimer: boolean;
  onToggleFloatingTimer: () => void;
}

const AVATAR_OPTIONS = ['💖', '🍓', '🦋', '🎀', '💅', '🧸', '💄', '🧁', '⭐', '🌸'];

const SKIN_TYPES: { type: SkinType; label: string; desc: string }[] = [
  { 
    type: 'Dewy/Normal', 
    label: 'Dewy / Normal 🍓', 
    desc: 'Balanced barrier, needs lightweight hydration & SPF shield' 
  },
  { 
    type: 'Combination', 
    label: 'Combo Glow 🎀', 
    desc: 'Oily T-zone + dry cheeks, loves gel-creams & balancing toners' 
  },
  { 
    type: 'Rosy/Sensitive', 
    label: 'Rosy / Sensitive 🌸', 
    desc: 'Prone to flushing, loves cica, centella & cooling ice rollers' 
  },
  { 
    type: 'Glass/Oily', 
    label: 'Glass / Oily 💧', 
    desc: 'Natural glow queen, thrives with niacinamide & invisible matte SPF' 
  },
  { 
    type: 'Dry/Glazed', 
    label: 'Glazed / Dry 🍩', 
    desc: 'Loves milky essences, squalane oil drops & rich ceramide balms' 
  },
];

const GLOW_GOALS = [
  'Smooth poreless base for makeup',
  'Juicy glazed donut glow',
  'Calm redness & acne-safe barrier',
  '10-Minute quick morning speedrun',
  'Dewy glass skin that lasts all day',
];

export const Y2KUserProfile: React.FC<Y2KUserProfileProps> = ({
  onOpenArticleByTopic,
  onSelectTab,
  isFloatingTimer,
  onToggleFloatingTimer,
}) => {
  // Load saved profile data from localStorage
  const [profile, setProfile] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem('allies_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(profile.displayName);
  const [editHandle, setEditHandle] = useState<string>(profile.handle);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('allies_user_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Toggle the Glow-Up Timer component ON or OFF on the profile
  const handleToggleTimer = () => {
    const newState = !profile.enableGlowUpTimer;
    setProfile((prev) => ({
      ...prev,
      enableGlowUpTimer: newState,
    }));
    triggerY2KConfetti({ count: 35, mode: 'bookmarks' });
  };

  // Called when user completes the 10-minute prep routine
  const handleSessionComplete = () => {
    const today = new Date().toISOString().slice(0, 10);
    setProfile((prev) => {
      const isNewDay = prev.lastCompletedDate !== today;
      const newStreak = isNewDay ? prev.streakDays + 1 : prev.streakDays;
      return {
        ...prev,
        totalPrepSessionsCompleted: prev.totalPrepSessionsCompleted + 1,
        streakDays: newStreak,
        lastCompletedDate: today,
      };
    });
  };

  const handleSaveInfo = () => {
    setProfile((prev) => ({
      ...prev,
      displayName: editName.trim() || 'Glow Bestie',
      handle: editHandle.trim().startsWith('@') ? editHandle.trim() : `@${editHandle.trim() || 'glambestie'}`,
    }));
    setIsEditingInfo(false);
    triggerY2KConfetti({ count: 40, mode: 'quiz' });
  };

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Profile Header & Badge Card */}
      <div className="bg-white rounded-3xl border-3 border-[#FF2A85] p-6 sm:p-8 shadow-sticker relative overflow-hidden">
        
        {/* Y2K Header Banner Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-pink-100 pb-6">
          <div className="flex items-center gap-4">
            {/* Avatar Emoji */}
            <div className="relative group">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#FF2A85] to-[#A855F7] p-1 shadow-sticker-sm">
                <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center text-3xl sm:text-4xl select-none">
                  {profile.avatarEmoji}
                </div>
              </div>
            </div>

            {/* Name, Handle & Bio */}
            <div>
              {isEditingInfo ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-1 text-sm font-bubbly font-bold border-2 border-pink-300 rounded-xl focus:outline-none focus:border-[#FF2A85]"
                      placeholder="Your Vanity Name"
                      maxLength={24}
                    />
                    <input
                      type="text"
                      value={editHandle}
                      onChange={(e) => setEditHandle(e.target.value)}
                      className="px-3 py-1 text-xs font-mono border-2 border-pink-200 rounded-xl focus:outline-none focus:border-[#FF2A85]"
                      placeholder="@handle"
                      maxLength={20}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveInfo}
                      className="px-3 py-1 bg-[#FF2A85] text-white text-xs font-bubbly font-bold rounded-lg shadow-xs cursor-pointer"
                    >
                      Save Info
                    </button>
                    <button
                      onClick={() => setIsEditingInfo(false)}
                      className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493]">
                      {profile.displayName}
                    </h1>
                    <button
                      onClick={() => setIsEditingInfo(true)}
                      className="text-stone-400 hover:text-[#FF2A85] p-1 cursor-pointer"
                      title="Edit vanity profile name"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-stone-500 font-body">
                    <span className="font-mono font-bold text-[#A855F7]">{profile.handle}</span>
                    <span>·</span>
                    <span className="bg-pink-100 text-[#FF2A85] font-bubbly font-bold px-2 py-0.5 rounded-full border border-pink-200">
                      {profile.skinType}
                    </span>
                    <span>·</span>
                    <span>Goal: {profile.glowGoal}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Streak KPI Counter */}
          <div className="flex items-center gap-3 bg-[#FFF0F5] border-2 border-pink-200 rounded-2xl p-3 sm:p-4 self-start sm:self-center">
            <div className="w-10 h-10 rounded-xl bg-[#FEF08A] text-[#854D0E] border border-yellow-300 flex items-center justify-center font-bold text-xl shadow-xs">
              🔥
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-body">
                Skin Prep Streak
              </div>
              <div className="font-bubbly text-xl font-bold text-[#FF1493] tabular-nums">
                {profile.streakDays} Days Strong!
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Picker Row */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-500 font-body mr-1">Vanity Icon:</span>
          {AVATAR_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setProfile((prev) => ({ ...prev, avatarEmoji: emoji }));
                triggerY2KConfetti({ count: 20, mode: 'bookmarks' });
              }}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-all cursor-pointer ${
                profile.avatarEmoji === emoji
                  ? 'bg-pink-100 border-2 border-[#FF2A85] scale-110 shadow-xs'
                  : 'bg-white hover:bg-pink-50 border border-pink-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Skin Type & Glow Goal Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-pink-100 mt-4">
          
          {/* Skin Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 font-body flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-[#FF2A85]" />
              <span>Skin Type & Barrier Profile:</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SKIN_TYPES.map((st) => (
                <button
                  key={st.type}
                  onClick={() => setProfile((prev) => ({ ...prev, skinType: st.type }))}
                  className={`px-3 py-1 rounded-full text-xs font-bubbly font-bold transition-all cursor-pointer ${
                    profile.skinType === st.type
                      ? 'bg-[#FF2A85] text-white shadow-sticker-sm scale-102'
                      : 'bg-stone-50 text-stone-700 hover:bg-pink-50 border border-pink-200'
                  }`}
                  title={st.desc}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Glow Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 font-body flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-yellow-500" />
              <span>Skincare Prep Goal:</span>
            </label>
            <select
              value={profile.glowGoal}
              onChange={(e) => setProfile((prev) => ({ ...prev, glowGoal: e.target.value }))}
              className="w-full px-3 py-2 text-xs font-body font-medium bg-[#FFF0F5] border-2 border-pink-200 rounded-xl focus:outline-none focus:border-[#FF2A85] text-stone-800"
            >
              {GLOW_GOALS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dedicated Glow-Up Timer Toggle Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50/60 to-purple-50/50 border-2 border-pink-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#FF2A85] flex items-center justify-center text-xl shrink-0 shadow-xs">
              ⏰
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bubbly text-base sm:text-lg font-bold text-[#FF1493]">
                  'Glow-Up' 10-Minute Skin Prep Timer
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  profile.enableGlowUpTimer
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-stone-200 text-stone-600 border-stone-300'
                }`}>
                  {profile.enableGlowUpTimer ? 'ACTIVE ON PROFILE' : 'OFF'}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-body max-w-lg mt-0.5">
                Tracks a 10-minute guided 5-step routine (cloud cleanse, milky essence & ice roll, hyaluronic drench, ceramide glaze, and SPF 50 shield) to keep your makeup base flawless.
              </p>
            </div>
          </div>

          {/* Interactive Switch Button */}
          <button
            onClick={handleToggleTimer}
            className={`px-4 py-2.5 rounded-full font-bubbly font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-sticker-sm shrink-0 ${
              profile.enableGlowUpTimer
                ? 'bg-[#FF2A85] hover:bg-[#E0176F] text-white'
                : 'bg-white hover:bg-pink-100 text-[#FF2A85] border-2 border-pink-300'
            }`}
          >
            {profile.enableGlowUpTimer ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Timer Enabled</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Turn On Timer ✨</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* RENDER THE GLOW-UP TIMER COMPONENT ON PROFILE WHEN TOGGLED ON */}
      {profile.enableGlowUpTimer ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧖‍♀️</span>
              <h2 className="font-bubbly text-xl font-bold text-[#FF1493]">
                Your Active Glow-Up Countdown Vanity
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-body">
              Completed: {profile.totalPrepSessionsCompleted} sessions
            </span>
          </div>

          {/* The full 10-minute timer component */}
          <GlowUpSkinPrepTimer
            onSessionComplete={handleSessionComplete}
            isFloating={isFloatingTimer}
            onToggleFloating={onToggleFloatingTimer}
            onOpenArticleByTopic={onOpenArticleByTopic}
          />
        </section>
      ) : (
        /* Disabled Preview Callout */
        <div className="bg-white rounded-3xl border-2 border-dashed border-pink-300 p-8 text-center space-y-3">
          <div className="text-4xl">⏱️ 🧖‍♀️</div>
          <h3 className="font-bubbly text-xl font-bold text-stone-700">
            The Glow-Up Countdown Timer is currently toggled OFF
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 font-body max-w-md mx-auto">
            Toggle it back on anytime above to track your 10-minute skin prep countdown with guided steps, de-puff alerts, and consistency streak points!
          </p>
          <button
            onClick={handleToggleTimer}
            className="px-5 py-2.5 rounded-full bg-[#FF2A85] text-white font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-105 transition-all cursor-pointer"
          >
            Toggle ON Glow-Up Timer 💖
          </button>
        </div>
      )}

      {/* Skincare Consistency & Vanity Badges */}
      <section className="bg-white rounded-3xl border-3 border-pink-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-pink-100 pb-3">
          <Award className="w-5 h-5 text-[#FF2A85]" />
          <h3 className="font-bubbly text-lg sm:text-xl font-bold text-[#FF1493]">
            Vanity Prep Badges & Consistency Milestones 🏆
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-2xl border border-pink-200 text-center space-y-1.5">
            <div className="text-3xl">⏰</div>
            <div className="font-bubbly text-xs font-bold text-[#2D1226]">10-Min Prepper</div>
            <div className="text-[10px] text-stone-500 font-body">Completed 1st routine</div>
            <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              {profile.totalPrepSessionsCompleted >= 1 ? 'UNLOCKED ✨' : 'LOCKED'}
            </span>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-2xl border border-yellow-200 text-center space-y-1.5">
            <div className="text-3xl">🔥</div>
            <div className="font-bubbly text-xs font-bold text-[#854D0E]">Consistency Queen</div>
            <div className="text-[10px] text-stone-500 font-body">3+ day prep streak</div>
            <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              {profile.streakDays >= 3 ? 'UNLOCKED ✨' : 'LOCKED'}
            </span>
          </div>

          <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-2xl border border-sky-200 text-center space-y-1.5">
            <div className="text-3xl">🧊</div>
            <div className="font-bubbly text-xs font-bold text-[#0369A1]">De-Puff Master</div>
            <div className="text-[10px] text-stone-500 font-body">Ice roller & milky essence</div>
            <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              UNLOCKED ✨
            </span>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-2xl border border-purple-200 text-center space-y-1.5">
            <div className="text-3xl">🍓</div>
            <div className="font-bubbly text-xs font-bold text-[#6B21A8]">Glazed Donut Queen</div>
            <div className="text-[10px] text-stone-500 font-body">Ceramide barrier seal</div>
            <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              UNLOCKED ✨
            </span>
          </div>

        </div>

        {onSelectTab && (
          <div className="pt-2 text-center">
            <button
              onClick={() => onSelectTab('calendar')}
              className="inline-flex items-center gap-1.5 text-xs font-bubbly font-bold text-[#FF2A85] hover:text-[#2D1226] transition-colors cursor-pointer"
            >
              <span>View Full Beauty Calendar & Daily Logs</span>
              <span>→</span>
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
