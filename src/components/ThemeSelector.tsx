import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { ColorTheme, THEME_OPTIONS } from '../types/theme';

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onSelectTheme: (theme: ColorTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleChoose = (themeId: ColorTheme) => {
    onSelectTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Theme Trigger Button in Navbar */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sticker-sm hover:scale-105 border ${
          isOpen
            ? 'theme-accent-bg text-white border-black/20 ring-2 ring-pink-300'
            : 'bg-white text-stone-800 border-pink-200 hover:bg-pink-50'
        }`}
        title="Switch color theme"
        aria-label="Color theme selector"
      >
        <Palette className="w-3.5 h-3.5 theme-accent-text hidden xs:inline" />
        <span className="text-sm select-none">{activeOption.emoji}</span>
        <span className="hidden sm:inline font-bubbly text-xs">
          {activeOption.name.split(' ')[0]}
        </span>
        <span className="text-[10px] opacity-70">▾</span>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 max-w-[calc(100vw-24px)] bg-white rounded-2xl border-3 theme-accent-border p-3 shadow-sticker z-50 animate-in fade-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between border-b border-pink-100 pb-2 mb-2 px-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 theme-accent-text" />
              <span className="font-bubbly font-bold text-xs theme-accent-text uppercase tracking-wider">
                Color Theme 🎨
              </span>
            </div>
            <span className="text-[10px] font-bold text-stone-400">
              Pick your vibe!
            </span>
          </div>

          <div className="space-y-1.5">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleChoose(theme.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer group ${
                    isSelected
                      ? 'border-2 theme-accent-border theme-subtle-bg shadow-sticker-sm scale-[1.01]'
                      : 'border-pink-100 bg-white hover:border-pink-200 hover:bg-pink-50/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Color Swatch Circle */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-xs border border-white"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                      }}
                    >
                      <span className="drop-shadow-xs">{theme.emoji}</span>
                    </div>

                    <div>
                      <div className="font-bubbly text-xs font-bold text-stone-800 group-hover:text-stone-900 flex items-center gap-1">
                        <span>{theme.name}</span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-body">
                        {theme.flavor}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] shadow-xs"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-pink-100 px-1 text-center">
            <span className="text-[10px] text-stone-400 font-body">
              Changes accent colors, borders & polka-dots across the site ✨
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
