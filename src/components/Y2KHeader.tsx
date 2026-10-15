import React, { useMemo } from 'react';
import { Sparkles, Heart, Bookmark, Search, Music, Dices, Radio, X, ArrowRight, BookOpen, ShoppingBag } from 'lucide-react';
import { BlogArticle } from '../types/blog';
import { ColorTheme } from '../types/theme';
import { ThemeSelector } from './ThemeSelector';

interface Y2KHeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
  onOpenLipSpinner: () => void;
  onToggleAudioPlayer: () => void;
  isAudioPlayerOpen: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  articles?: BlogArticle[];
  onSelectArticle?: (article: BlogArticle) => void;
  currentTheme: ColorTheme;
  onSelectTheme: (theme: ColorTheme) => void;
  isGlowMode: boolean;
  onToggleGlowMode: () => void;
}

export const Y2KHeader: React.FC<Y2KHeaderProps> = ({
  activeTab,
  onSelectTab,
  bookmarksCount,
  onOpenBookmarks,
  wishlistCount = 0,
  onOpenWishlist,
  onOpenLipSpinner,
  onToggleAudioPlayer,
  isAudioPlayerOpen,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onToggleSearch,
  articles = [],
  onSelectArticle,
  currentTheme,
  onSelectTheme,
  isGlowMode,
  onToggleGlowMode,
}) => {
  const POPULAR_SEARCH_TAGS = ['Lip Oil', 'Strawberry Blush', 'Dupes', 'Eyeshadow', 'Mascara', 'Acne', 'GRWM'];

  // Instant live matching articles
  const matchingArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return articles.slice(0, 4); // show trending top 4 when search first opened
    return articles.filter((article) => {
      const inTitle = article.title.toLowerCase().includes(q);
      const inTagline = article.tagline.toLowerCase().includes(q);
      const inCategory = article.category.toLowerCase().includes(q);
      const inVibe = article.vibeTag.toLowerCase().includes(q);
      const inParagraphs = article.paragraphs.some((p) => p.toLowerCase().includes(q));
      const inProducts = article.productMentions?.some(
        (pm) => pm.name.toLowerCase().includes(q) || pm.brand.toLowerCase().includes(q)
      );
      return inTitle || inTagline || inCategory || inVibe || inParagraphs || inProducts;
    });
  }, [articles, searchQuery]);

  const handleArticleClick = (article: BlogArticle) => {
    if (onSelectArticle) {
      onSelectArticle(article);
      onToggleSearch(); // Close search tray after opening article
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (matchingArticles.length > 0 && onSelectArticle) {
        handleArticleClick(matchingArticles[0]);
      }
    } else if (e.key === 'Escape') {
      onToggleSearch();
    }
  };
  return (
    <header className="sticky top-0 z-40 bg-[#FFF0F5]/95 backdrop-blur-md border-b-3 theme-accent-border transition-all">
      {/* Fun Marquee Banner */}
      <div className="theme-accent-bg text-white text-[12px] font-bold py-1.5 px-0 overflow-hidden shadow-xs relative select-none transition-colors">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          <div className="flex items-center gap-8 whitespace-nowrap shrink-0 pr-8">
            <span>💖 WELCOME TO ALLIE’S GLAM DIARY ✨</span>
            <span>💋 NO STICKY LIP GLOSS ALLOWED</span>
            <span>🎀 DRUGSTORE DUPES THAT ACTUALLY SLAY</span>
            <span>⭐ TEEN BEAUTY OBSESSION HEADQUARTERS</span>
            <span>🍓 DEWY STRAWBERRY BLUSH ADDICT</span>
            <span>CUTE MUSIC TO ACCOMPANY YOUR SCROLLING! 🎶</span>
            <span className="text-yellow-200">💅 UPDATED FOR 2026!</span>
          </div>
          <div className="flex items-center gap-8 whitespace-nowrap shrink-0 pr-8" aria-hidden="true">
            <span>💖 WELCOME TO ALLIE’S GLAM DIARY ✨</span>
            <span>💋 NO STICKY LIP GLOSS ALLOWED</span>
            <span>🎀 DRUGSTORE DUPES THAT ACTUALLY SLAY</span>
            <span>⭐ TEEN BEAUTY OBSESSION HEADQUARTERS</span>
            <span>🍓 DEWY STRAWBERRY BLUSH ADDICT</span>
            <span>CUTE MUSIC TO ACCOMPANY YOUR SCROLLING! 🎶</span>
            <span className="text-yellow-200">💅 UPDATED FOR 2026!</span>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-16 py-2.5 sm:py-3.5 flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Brand / Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-1.5 sm:gap-2.5 group text-left cursor-pointer focus:outline-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full theme-accent-bg text-white flex items-center justify-center font-bubbly text-base sm:text-xl font-bold shadow-sticker-sm sm:shadow-sticker group-hover:scale-105 transition-all shrink-0">
            💄
          </div>
          <div>
            <div className="font-bubbly text-lg sm:text-2xl lg:text-3xl font-bold theme-accent-text tracking-tight flex items-center gap-1 sm:gap-1.5 leading-none transition-colors">
              <span>ALLIE'S</span>
              <span className="text-[#A855F7]">GLAM</span>
              <span className="hidden xs:inline">DIARY</span>
              <span className="text-yellow-400 text-sm sm:text-lg">✨</span>
            </div>
            <span className="text-[9px] sm:text-[11px] font-bold text-stone-500 font-body block -mt-0.5 tracking-wider">
              YOUR BEAUTY BESTIE 🎀
            </span>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {[
            { id: 'home', label: 'Home 🏠' },
            { id: 'blog', label: 'Beauty Diary 📖' },
            { id: 'profile', label: 'My Profile 🧖‍♀️' },
            { id: 'calendar', label: 'Beauty Calendar 🗓️' },
            { id: 'tips', label: 'Makeup Tips 💡' },
            { id: 'faves', label: 'My Faves 💖' },
            { id: 'grwm', label: 'GRWM Routine ✨' },
            { id: 'looks', label: 'Aesthetic Looks 🦋' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`px-3 xl:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === item.id
                  ? 'theme-accent-bg text-white shadow-sticker-sm scale-102'
                  : 'bg-white/80 text-[#38152C] hover:bg-[#FFE4EE] border border-pink-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Fun Utility Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Color Theme Selector */}
          <ThemeSelector
            currentTheme={currentTheme}
            onSelectTheme={onSelectTheme}
          />

          {/* Glow Mode Toggle Button */}
          <button
            onClick={onToggleGlowMode}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-full font-bold text-xs border transition-all cursor-pointer shadow-sticker-sm hover:scale-105 ${
              isGlowMode
                ? 'theme-accent-bg text-white border-black/20 ring-2 ring-yellow-300'
                : 'bg-white text-stone-800 border-pink-200 hover:bg-pink-50'
            }`}
            title={isGlowMode ? 'Dewy Glow Mode is ACTIVE! Click to disable' : 'Turn on Dewy Glow Mode ✨'}
            aria-label="Toggle Dewy Glow Mode"
            aria-pressed={isGlowMode}
          >
            <Sparkles
              className={`w-3.5 h-3.5 transition-transform ${
                isGlowMode
                  ? 'text-yellow-300 fill-current animate-dewy-pulse'
                  : 'text-stone-400'
              }`}
            />
            <span className="hidden sm:inline font-bubbly text-xs">
              {isGlowMode ? 'Dewy ✨' : 'Glow'}
            </span>
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                isGlowMode ? 'bg-yellow-300 shadow-xs' : 'bg-stone-300'
              }`}
            />
          </button>

          {/* Vanity Audio Player Button */}
          <button
            onClick={onToggleAudioPlayer}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-full font-bold text-xs border transition-all cursor-pointer shadow-sticker-sm hover:scale-105 ${
              isAudioPlayerOpen
                ? 'bg-[#A855F7] text-white border-purple-700 animate-pulse'
                : 'bg-white text-stone-800 border-pink-300 hover:bg-pink-100 hover:text-[#FF1493]'
            }`}
            title="Open Full Song Vanity Music Player"
          >
            <Music className="w-3.5 h-3.5 text-pink-400 fill-current" />
            <span className="hidden sm:inline">Tunes 🎵</span>
          </button>

          {/* Lip Combo Spinner */}
          <button
            onClick={onOpenLipSpinner}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF08A] hover:bg-[#FDE047] text-[#854D0E] font-bold text-xs border border-amber-300 shadow-sticker-sm transition-transform hover:scale-105 cursor-pointer"
            title="Spin for today's cute lip combo!"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Lip Combo 💄</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onToggleSearch}
            className={`p-1.5 sm:p-2 rounded-full border-2 transition-all cursor-pointer shadow-sticker-sm ${
              isSearchOpen
                ? 'theme-accent-bg text-white border-black/20 scale-105 ring-2 ring-pink-300'
                : 'bg-white theme-accent-text border-pink-200 hover:bg-pink-100 hover:scale-105'
            }`}
            title="Search blog posts & click to open"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Saved Posts Drawer Trigger */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-1.5 sm:p-2 rounded-full theme-accent-bg text-white shadow-sticker-sm hover:scale-105 transition-transform cursor-pointer"
            title="View saved beauty posts"
          >
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#FEF08A] text-[#854D0E] text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center border-2 theme-accent-border">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Glam Wishlist / Shopping Basket Drawer Trigger */}
          {onOpenWishlist && (
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 sm:p-2 rounded-full bg-[#FF2A85] text-white shadow-sticker-sm hover:scale-105 transition-transform cursor-pointer border-2 border-white"
              title="View Glam Wishlist & Shopping Bag 🛍️"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#FEF08A] text-[#854D0E] text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#FF2A85] animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>
          )}
        </div>

      </div>

      {/* Mobile Tab Scroller */}
      <div className="lg:hidden w-full max-w-[1720px] mx-auto px-3 sm:px-6 pb-2.5 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
        {[
          { id: 'home', label: 'Home 🏠' },
          { id: 'blog', label: 'Diary 📖' },
          { id: 'profile', label: 'Profile 🧖‍♀️' },
          { id: 'calendar', label: 'Calendar 🗓️' },
          { id: 'tips', label: 'Tips 💡' },
          { id: 'faves', label: 'Faves 💖' },
          { id: 'grwm', label: 'GRWM ✨' },
          { id: 'looks', label: 'Looks 🦋' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === item.id
                ? 'theme-accent-bg text-white'
                : 'bg-white text-stone-700 border border-pink-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Search Input Tray & Live Instant Open Panel */}
      {isSearchOpen && (
        <div className="border-t-2 border-pink-200 bg-white shadow-xl animate-in fade-in duration-200">
          <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
            {/* Input Bar */}
            <div className="relative flex items-center gap-2">
              <span className="text-xl">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search anything (lip oil, strawberry blush, dupes, mascara) & press Enter to open..."
                className="w-full text-sm sm:text-base font-body px-4 py-2 bg-[#FFF0F5] border-2 border-pink-300 rounded-full focus:outline-none focus:border-[#FF2A85] text-stone-800 shadow-inner"
                autoFocus
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="px-3 py-1 text-xs font-bold text-pink-600 hover:text-pink-900 bg-pink-100 rounded-full cursor-pointer"
                >
                  Clear
                </button>
              ) : null}
              <button
                onClick={onToggleSearch}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full cursor-pointer"
                title="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Popular Quick Search Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0">
                Trending:
              </span>
              {POPULAR_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearchChange(tag)}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? 'bg-[#FF2A85] text-white shadow-xs'
                      : 'bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Live Interactive Matching Results (Click any to OPEN!) */}
            <div className="space-y-2 pt-1 border-t border-pink-100">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                <span>
                  {searchQuery ? `Matching Articles (${matchingArticles.length})` : 'Popular Beauty Articles 💖'}
                </span>
                <span className="text-[11px] text-[#FF1493] font-bold">✨ Tap any entry to open!</span>
              </div>

              {matchingArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                  {matchingArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => handleArticleClick(article)}
                      className="group flex items-center gap-3 p-2.5 rounded-2xl bg-white hover:bg-[#FFF0F5] border-2 border-pink-100 hover:border-[#FF2A85] text-left transition-all shadow-xs hover:shadow-sticker-sm cursor-pointer"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-12 rounded-xl object-cover border border-pink-200 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-[#A855F7] uppercase tracking-wide block truncate">
                          {article.category} • {article.readTime}
                        </span>
                        <h4 className="font-bubbly text-xs font-bold text-[#2D1226] group-hover:text-[#FF1493] line-clamp-1 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1 font-body">
                          {article.tagline}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF2A85] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 space-y-2">
                  <p className="text-sm font-bold text-stone-600">
                    No articles found matching "{searchQuery}" 🥺
                  </p>
                  <p className="text-xs text-stone-400">
                    Try searching for lip oil, blush, highlighter, perfume, or dupes!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
