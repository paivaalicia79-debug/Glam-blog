import React, { useState } from 'react';
import { Heart, Sparkles, Send, Check, Radio } from 'lucide-react';

interface Y2KFooterProps {
  onSelectTab: (tab: string) => void;
  onOpenLipSpinner: () => void;
  onOpenAudioPlayer: () => void;
}

export const Y2KFooter: React.FC<Y2KFooterProps> = ({ onSelectTab, onOpenLipSpinner, onOpenAudioPlayer }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t-3 border-[#FF2A85] bg-gradient-to-b from-[#FFF0F5] to-[#FFE4EE] pt-10 sm:pt-14 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-10 xl:px-16">
      <div className="w-full max-w-[1720px] mx-auto space-y-10 sm:space-y-12">
        
        {/* Newsletter Box ("Join the Glam Club 💌") */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border-3 border-[#FF2A85] p-6 sm:p-8 shadow-sticker text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border border-yellow-400">
            <span>💌 VANITY LOVE LETTERS</span>
          </div>

          <h3 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493]">
            Join the Glam Club Bestie! 🎀
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 font-body">
            Get pinged whenever I post a new drugstore dupe breakdown, viral blush review, or cute makeup trend test. No spam, just pure beauty gossip! 💕
          </p>

          {subscribed ? (
            <div className="p-3 bg-emerald-100 border-2 border-emerald-400 text-emerald-800 rounded-2xl text-xs font-bold font-bubbly flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>YAY! You’re on the list!! Welcome to the club 💖✨</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email bestie..."
                className="flex-1 text-xs font-body px-4 py-3 bg-[#FFF0F5] border-2 border-pink-300 rounded-full focus:outline-none focus:border-[#FF2A85]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-103 transition-transform cursor-pointer shrink-0"
              >
                Subscribe 💄
              </button>
            </form>
          )}
        </div>

        {/* Footer Links & Doodles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4 border-t-2 border-pink-200">
          
          <div className="space-y-3">
            <div className="font-bubbly text-xl font-bold text-[#FF1493] flex items-center gap-1.5">
              <span>ALLIE'S GLAM DIARY</span>
              <span>✨</span>
            </div>
            <p className="text-xs text-stone-600 font-body leading-relaxed">
              Made with hot pink love, lots of lip gloss, and iced matcha by a 19-year-old beauty lover.
            </p>
            <div className="text-xs font-bold text-[#A855F7] font-body">
              TikTok / IG: @alliesglamdiary 💖
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bubbly text-sm font-bold text-[#2D1226]">Navigation 🎀</h4>
            <ul className="space-y-1.5 text-xs font-body text-stone-600">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-[#FF1493] cursor-pointer">Home 🏠</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('blog')} className="hover:text-[#FF1493] cursor-pointer">All 10 Blog Entries 📖</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('profile')} className="hover:text-[#FF1493] cursor-pointer">My Profile & Glow-Up Timer 🧖‍♀️</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('calendar')} className="hover:text-[#FF1493] cursor-pointer">Beauty Calendar 🗓️</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('tips')} className="hover:text-[#FF1493] cursor-pointer">Beginner Makeup Tips 💡</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('faves')} className="hover:text-[#FF1493] cursor-pointer">My Holy Grails 💖</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('grwm')} className="hover:text-[#FF1493] cursor-pointer">12-Min GRWM Routine ✨</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('looks')} className="hover:text-[#FF1493] cursor-pointer">Aesthetic Makeup Looks 🦋</button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bubbly text-sm font-bold text-[#2D1226]">Vanity Goodies 💄</h4>
            <ul className="space-y-1.5 text-xs font-body text-stone-600">
              <li>
                <button onClick={onOpenLipSpinner} className="hover:text-[#FF1493] font-bold cursor-pointer">
                  → Spin Today’s Lip Combo! 💋
                </button>
              </li>
              <li>
                <button onClick={onOpenAudioPlayer} className="hover:text-purple-700 font-bold flex items-center gap-1 cursor-pointer">
                  <span>→ Listen to Vanity Tunes 🎵 (Full Tracks)</span>
                </button>
              </li>
              <li>
                <span className="text-[#854D0E] bg-[#FEF08A] px-2 py-0.5 rounded-full font-bold text-[10px]">
                  ⭐ 100% Unsponsored & Honest
                </span>
              </li>
              <li>
                <span className="text-xs">Cruelty-free & Drugstore friendly</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bubbly text-sm font-bold text-[#2D1226]">Allie’s Creed 🌸</h4>
            <p className="text-xs text-stone-600 font-body leading-relaxed bg-white/70 p-3 rounded-2xl border border-pink-200">
              "Makeup should be fun, playful, and make you smile when you catch your reflection in a shop window. Never take beauty too seriously!" 💕
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-pink-200 text-center text-xs font-body text-stone-500">
          <p>© {new Date().getFullYear()} Allie’s Glam Diary. Stay cute, stay glossy! ✨💋</p>
        </div>

      </div>
    </footer>
  );
};
