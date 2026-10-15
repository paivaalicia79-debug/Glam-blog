import React, { useState, useEffect, useMemo } from 'react';
import { BLOG_ARTICLES } from './data/blogData';
import { BlogArticle, ArticleMood } from './types/blog';
import { Y2KHeader } from './components/Y2KHeader';
import { Y2KHero } from './components/Y2KHero';
import { Y2KArticleCard } from './components/Y2KArticleCard';
import { Y2KArticleDetail } from './components/Y2KArticleDetail';
import { Y2KMakeupTips } from './components/Y2KMakeupTips';
import { Y2KMyFaves } from './components/Y2KMyFaves';
import { Y2KGRWM } from './components/Y2KGRWM';
import { Y2KMakeupLooks } from './components/Y2KMakeupLooks';
import { LipComboModal } from './components/LipComboModal';
import { VanityAudioPlayer } from './components/VanityAudioPlayer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Y2KFooter } from './components/Y2KFooter';
import { Y2KGlitterParticles } from './components/Y2KGlitterParticles';
import { DailyBeautyPoll } from './components/DailyBeautyPoll';
import { DailyBeautyTip } from './components/DailyBeautyTip';
import { BeautyCalendar } from './components/BeautyCalendar';
import { MakeupPersonalityQuiz } from './components/MakeupPersonalityQuiz';
import { MirrorSelfieGallery } from './components/MirrorSelfieGallery';
import { ArticleStampModal } from './components/ArticleStampModal';
import { Y2KConfettiBurst, triggerY2KConfetti } from './components/Y2KConfettiBurst';
import { MoodSelector } from './components/MoodSelector';
import { GlamWishlistDrawer } from './components/GlamWishlistDrawer';
import { CardStickerModal } from './components/CardStickerModal';
import { StickerToolbar } from './components/StickerToolbar';
import { Y2KUserProfile } from './components/Y2KUserProfile';
import { GlowUpSkinPrepTimer } from './components/GlowUpSkinPrepTimer';
import { ColorTheme } from './types/theme';
import { ArticleStampsMap, StampId } from './types/stamps';
import { WishlistItem } from './types/blog';
import { ArticleDecorationsMap, CardStickerId, PlacedSticker } from './types/cardStickers';
import { DEFAULT_DEMO_DECORATIONS } from './data/cardStickersData';
import { Sparkles, Heart, ArrowRight, Search, BookOpen, Dices, Music } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('All');
  const [selectedMood, setSelectedMood] = useState<ArticleMood | 'All'>('All');
  const [stampModalArticle, setStampModalArticle] = useState<BlogArticle | null>(null);
  const [stickerModalArticle, setStickerModalArticle] = useState<BlogArticle | null>(null);

  // Article Digital Card Decorations (Imagen Y2K Stickers) in localStorage
  const [cardDecorations, setCardDecorations] = useState<ArticleDecorationsMap>(() => {
    try {
      const saved = localStorage.getItem('allies_card_decorations');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_DECORATIONS;
    } catch {
      return DEFAULT_DEMO_DECORATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('allies_card_decorations', JSON.stringify(cardDecorations));
    } catch {
      // ignore
    }
  }, [cardDecorations]);

  const handleSaveCardStickers = (articleId: string, stickers: PlacedSticker[]) => {
    setCardDecorations((prev) => ({
      ...prev,
      [articleId]: stickers,
    }));
  };

  const handleToggleStickerForAll = (stickerId: CardStickerId) => {
    // Check if every article currently has this sticker
    const allHaveIt = BLOG_ARTICLES.every((art) =>
      (cardDecorations[art.id] || []).some((s) => s.stickerId === stickerId)
    );

    setCardDecorations((prev) => {
      const next: ArticleDecorationsMap = { ...prev };
      BLOG_ARTICLES.forEach((art) => {
        const current = next[art.id] || [];
        if (allHaveIt) {
          // Remove from all
          next[art.id] = current.filter((s) => s.stickerId !== stickerId);
        } else {
          // Add to those that don't have it
          if (!current.some((s) => s.stickerId === stickerId)) {
            const positions: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[] = [
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ];
            const taken = current.map((s) => s.position);
            const free = positions.find((p) => !taken.includes(p)) || 'top-right';
            next[art.id] = [
              ...current,
              {
                stickerId,
                position: free,
                rotation: Math.floor(Math.random() * 20) - 10,
              },
            ];
          }
        }
      });
      return next;
    });

    triggerY2KConfetti({ count: 45, mode: 'quiz' });
  };

  const handleRandomizeAllStickers = () => {
    const allStickerIds: CardStickerId[] = ['flip-phone', 'butterfly', 'glitter-heart', 'chrome-star'];
    const positions: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[] = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ];

    setCardDecorations(() => {
      const next: ArticleDecorationsMap = {};
      BLOG_ARTICLES.forEach((art) => {
        const count = Math.floor(Math.random() * 2) + 1; // 1 to 2 stickers per card
        const shuffledStickers = [...allStickerIds].sort(() => 0.5 - Math.random());
        const shuffledPositions = [...positions].sort(() => 0.5 - Math.random());
        next[art.id] = shuffledStickers.slice(0, count).map((sid, i) => ({
          stickerId: sid,
          position: shuffledPositions[i],
          rotation: Math.floor(Math.random() * 24) - 12,
        }));
      });
      return next;
    });

    triggerY2KConfetti({ count: 70, mode: 'all' });
  };

  const handleClearAllStickers = () => {
    setCardDecorations({});
  };

  const handleResetDefaultStickers = () => {
    setCardDecorations(DEFAULT_DEMO_DECORATIONS);
    triggerY2KConfetti({ count: 50, mode: 'quiz' });
  };

  // Active sticker counts calculation
  const stickerCounts = useMemo(() => {
    const counts: Record<CardStickerId, number> = {
      'flip-phone': 0,
      butterfly: 0,
      'glitter-heart': 0,
      'chrome-star': 0,
    };
    BLOG_ARTICLES.forEach((art) => {
      const list = cardDecorations[art.id] || [];
      list.forEach((st) => {
        if (counts[st.stickerId] !== undefined) {
          counts[st.stickerId]++;
        }
      });
    });
    return counts;
  }, [cardDecorations]);

  const totalDecoratedCards = useMemo(() => {
    return BLOG_ARTICLES.filter((art) => (cardDecorations[art.id] || []).length > 0).length;
  }, [cardDecorations]);

  // Article Digital Stamps in localStorage
  const [articleStamps, setArticleStamps] = useState<ArticleStampsMap>(() => {
    try {
      const saved = localStorage.getItem('allies_article_stamps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('allies_article_stamps', JSON.stringify(articleStamps));
    } catch {
      // ignore
    }
  }, [articleStamps]);

  const handleApplyStamp = (articleId: string, stampId: StampId) => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    setArticleStamps((prev) => ({
      ...prev,
      [articleId]: {
        stampId,
        stampedAt: today,
      },
    }));
  };

  const handleRemoveStamp = (articleId: string) => {
    setArticleStamps((prev) => {
      const next = { ...prev };
      delete next[articleId];
      return next;
    });
  };

  // Color Theme (Strawberry, Blueberry, Grape)
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(() => {
    try {
      const saved = localStorage.getItem('allies_color_theme') as ColorTheme;
      if (saved && ['strawberry', 'blueberry', 'grape'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'strawberry';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('allies_color_theme', currentTheme);
    } catch {
      // ignore
    }
  }, [currentTheme]);

  // Dewy Y2K Glow Mode (subtle animated outer-glow on cards & buttons)
  const [isGlowMode, setIsGlowMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('allies_glow_mode');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-glow', isGlowMode ? 'true' : 'false');
    document.body.setAttribute('data-glow', isGlowMode ? 'true' : 'false');
    try {
      localStorage.setItem('allies_glow_mode', JSON.stringify(isGlowMode));
    } catch {
      // ignore
    }
  }, [isGlowMode]);

  // Bookmarks in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('allies_saved_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isLipSpinnerOpen, setIsLipSpinnerOpen] = useState<boolean>(false);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState<boolean>(true);
  const [isFloatingTimer, setIsFloatingTimer] = useState<boolean>(false);

  // Glam Wishlist / Shopping Basket State in localStorage
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('allies_glam_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('allies_glam_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (
    product: {
      name: string;
      brand: string;
      price: string;
      verdict: string;
      articleId?: string;
      articleTitle?: string;
    },
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    const id = `${product.brand.toLowerCase()}-${product.name.toLowerCase()}`.replace(/\s+/g, '-');

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        return prev.filter((item) => item.id !== id);
      } else {
        // Trigger star/heart celebration!
        triggerY2KConfetti({
          originX: e ? e.clientX : undefined,
          originY: e ? e.clientY : undefined,
          count: 50,
          mode: 'bookmarks',
        });
        return [
          ...prev,
          {
            id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            verdict: product.verdict,
            articleId: product.articleId,
            articleTitle: product.articleTitle,
            addedAt: new Date().toLocaleDateString('en-US'),
          },
        ];
      }
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (name: string, brand: string) => {
    const id = `${brand.toLowerCase()}-${name.toLowerCase()}`.replace(/\s+/g, '-');
    return wishlist.some((item) => item.id === id);
  };

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('allies_saved_stories', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const willAdd = !prev.includes(id);
      if (willAdd) {
        triggerY2KConfetti({
          originX: e ? e.clientX : undefined,
          originY: e ? e.clientY : undefined,
          mode: 'bookmarks',
        });
      }
      return willAdd ? [...prev, id] : prev.filter((item) => item !== id);
    });
  };

  const savedArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((a) => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds]);

  // Mood counts calculation
  const moodCounts = useMemo(() => {
    const counts: Record<ArticleMood | 'All', number> = {
      All: BLOG_ARTICLES.length,
      Happy: 0,
      Dreamy: 0,
      Bold: 0,
      Chill: 0,
    };
    BLOG_ARTICLES.forEach((a) => {
      if (a.mood && counts[a.mood] !== undefined) {
        counts[a.mood]++;
      }
    });
    return counts;
  }, []);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesMood =
        selectedMood === 'All' || article.mood === selectedMood;
      const matchesCat =
        blogCategoryFilter === 'All' || article.category === blogCategoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.tagline.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.vibeTag.toLowerCase().includes(q) ||
        (article.mood && article.mood.toLowerCase().includes(q)) ||
        article.paragraphs.some((p) => p.toLowerCase().includes(q));

      return matchesMood && matchesCat && matchesSearch;
    });
  }, [blogCategoryFilter, searchQuery, selectedMood]);

  // URL Hash-based Routing & Browser Navigation Sync
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setSelectedArticle(null);
        setActiveTab('home');
        return;
      }

      // Check for article route e.g. articles/slug or article/slug
      const articleMatch = hash.match(/^articles?\/(.+)$/);
      if (articleMatch && articleMatch[1]) {
        const slug = articleMatch[1];
        const match = BLOG_ARTICLES.find((a) => a.slug === slug || a.id === slug);
        if (match) {
          setSelectedArticle(match);
          return;
        }
      }

      // Check for direct tab route
      const knownTabs = ['home', 'blog', 'profile', 'calendar', 'tips', 'faves', 'grwm', 'looks'];
      if (knownTabs.includes(hash)) {
        setSelectedArticle(null);
        setActiveTab(hash);
        return;
      }

      // Check if the hash matches an article slug directly
      const directMatch = BLOG_ARTICLES.find((a) => a.slug === hash || a.id === hash);
      if (directMatch) {
        setSelectedArticle(directMatch);
        return;
      }
    };

    parseHashRoute();
    window.addEventListener('hashchange', parseHashRoute);
    return () => window.removeEventListener('hashchange', parseHashRoute);
  }, []);

  // Dynamic SEO Title, Meta Description & Schema.org JSON-LD Structured Data
  useEffect(() => {
    const defaultTitle = "ALLIE'S GLAM DIARY ✨💋 — Cute Y2K Teen Makeup & Beauty Blog";
    const defaultDesc = "Welcome to my cute makeup vanity! Serving dewy skin, juicy lip glosses, strawberry blush, glitter eyes, and honest teen beauty reviews! 💗✨";

    let schemaData: object;

    if (selectedArticle) {
      const pageTitle = `${selectedArticle.seoTitle || selectedArticle.title} | Allie’s Glam Diary ✨💄`;
      const metaDesc = selectedArticle.metaDescription || selectedArticle.tagline;

      document.title = pageTitle;
      
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) metaTag.setAttribute('content', metaDesc);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', metaDesc);

      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': selectedArticle.title,
        'description': metaDesc,
        'image': selectedArticle.image,
        'datePublished': '2026-10-04',
        'author': {
          '@type': 'Person',
          'name': 'Allie',
          'jobTitle': 'Teen Beauty Blogger & Content Creator'
        },
        'publisher': {
          '@type': 'Organization',
          'name': "Allie's Glam Diary"
        },
        'keywords': [selectedArticle.mainKeyword, ...(selectedArticle.relatedKeywords || [])].filter(Boolean).join(', '),
        'mainEntityOfPage': window.location.href
      };
    } else {
      document.title = defaultTitle;
      
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) metaTag.setAttribute('content', defaultDesc);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', defaultTitle);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', defaultDesc);

      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': "Allie's Glam Diary",
        'description': defaultDesc,
        'url': window.location.origin,
        'author': {
          '@type': 'Person',
          'name': 'Allie'
        }
      };
    }

    // Inject / Update JSON-LD script
    let scriptTag = document.getElementById('allie-jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'allie-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [selectedArticle, activeTab]);

  const handleOpenArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    window.location.hash = `/articles/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDiary = () => {
    setSelectedArticle(null);
    window.location.hash = '/blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: string) => {
    setSelectedArticle(null);
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '/' : `/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FFF0F5] text-[#2D1226] selection:bg-[#FF1493] selection:text-white flex flex-col justify-between relative">
      
      {/* Floating Y2K Glitter, Sparkles and Hearts particle layer */}
      <Y2KGlitterParticles />

      {/* Header */}
      <Y2KHeader
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenLipSpinner={() => setIsLipSpinnerOpen(true)}
        onToggleAudioPlayer={() => setIsAudioPlayerOpen(!isAudioPlayerOpen)}
        isAudioPlayerOpen={isAudioPlayerOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
        articles={BLOG_ARTICLES}
        onSelectArticle={handleOpenArticle}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        isGlowMode={isGlowMode}
        onToggleGlowMode={() => setIsGlowMode((prev) => !prev)}
      />

      {/* Main View Switcher */}
      <div className="flex-1 w-full max-w-full">
        {selectedArticle ? (
          <Y2KArticleDetail
            article={selectedArticle}
            onBack={handleBackToDiary}
            isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
            onToggleBookmark={toggleBookmark}
            onSelectArticle={handleOpenArticle}
            allArticles={BLOG_ARTICLES}
            currentStamp={articleStamps[selectedArticle.id]}
            onApplyStamp={(stampId) => handleApplyStamp(selectedArticle.id, stampId)}
            onRemoveStamp={() => handleRemoveStamp(selectedArticle.id)}
            isInWishlist={isInWishlist}
            onToggleWishlist={toggleWishlist}
            stickers={cardDecorations[selectedArticle.id] || []}
            onOpenStickerModal={() => setStickerModalArticle(selectedArticle)}
          />
        ) : (
          <>
            {/* HOME TAB */}
            {activeTab === 'home' && (
              <main className="space-y-12 pb-16">
                {/* Hero Section */}
                <Y2KHero
                  onExploreClick={() => handleSelectTab('blog')}
                  onGRWMClick={() => handleSelectTab('grwm')}
                  onLipSpinnerClick={() => setIsLipSpinnerOpen(true)}
                  onOpenAudioPlayer={() => setIsAudioPlayerOpen(true)}
                  onProfileClick={() => handleSelectTab('profile')}
                />

                {/* Daily Beauty Dilemma Poll */}
                <DailyBeautyPoll />

                {/* Daily Beauty Tip of the Day */}
                <DailyBeautyTip />

                {/* Beauty Calendar & Consistency Streak Tracker */}
                <BeautyCalendar onSelectTab={handleSelectTab} />

                {/* Recent Diary Entries Preview */}
                <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 space-y-6 sm:space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-pink-200 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border border-yellow-400 mb-1">
                        <span>✨ FRESH TEA & REVIEWS</span>
                      </div>
                      <h2 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493]">
                        Latest From The Beauty Diary 📖
                      </h2>
                    </div>

                    <button
                      onClick={() => handleSelectTab('blog')}
                      className="inline-flex items-center gap-1.5 font-bubbly font-bold text-xs text-[#FF2A85] hover:text-[#2D1226] bg-white px-4 py-2 rounded-full border-2 border-pink-300 shadow-sticker-sm hover:scale-103 transition-transform cursor-pointer"
                    >
                      <span>Read All 10 Entries</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {BLOG_ARTICLES.slice(0, 6).map((art) => (
                      <Y2KArticleCard
                        key={art.id}
                        article={art}
                        onRead={handleOpenArticle}
                        isBookmarked={bookmarkedIds.includes(art.id)}
                        onToggleBookmark={toggleBookmark}
                        stamp={articleStamps[art.id]}
                        onOpenStampModal={(art) => setStampModalArticle(art)}
                        stickers={cardDecorations[art.id] || []}
                        onOpenStickerModal={(art) => setStickerModalArticle(art)}
                      />
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => handleSelectTab('blog')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly font-bold text-sm shadow-sticker hover:scale-104 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>View All 10 Makeup Articles 💖</span>
                    </button>
                  </div>
                </section>

                {/* Y2K Digicam Mirror Selfie Gallery Section */}
                <MirrorSelfieGallery />

                {/* Interactive Makeup Personality Quiz */}
                <MakeupPersonalityQuiz
                  onOpenArticle={(articleId) => {
                    const match = BLOG_ARTICLES.find((a) => a.id === articleId);
                    if (match) handleOpenArticle(match);
                  }}
                />

                {/* Makeup Tips Preview Section */}
                <Y2KMakeupTips />

                {/* Quick Faves Preview */}
                <Y2KMyFaves
                  isInWishlist={isInWishlist}
                  onToggleWishlist={toggleWishlist}
                />

                {/* GRWM Preview */}
                <Y2KGRWM />

                {/* Aesthetic Looks Preview */}
                <Y2KMakeupLooks />
              </main>
            )}

            {/* BLOG / BEAUTY DIARY TAB (All 10 Articles) */}
            {activeTab === 'blog' && (
              <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 sm:py-12 space-y-8">
                
                {/* Header */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border-2 border-yellow-400 shadow-sticker-sm">
                    <span>📖 THE COMPLETE DIARY ARCHIVE</span>
                  </div>
                  <h1 className="font-bubbly text-3xl sm:text-5xl font-bold text-[#FF1493]">
                    Allie’s 10 Beauty Diary Entries 💄✨
                  </h1>
                  <p className="text-sm sm:text-base text-stone-600 font-body max-w-xl mx-auto">
                    From non-sticky lip oils to strawberry blush and frosted baby blue eyeshadow! Everything you need for cute, glowy, fun makeup.
                  </p>

                  {/* Mood Selector Component */}
                  <div className="pt-2">
                    <MoodSelector
                      selectedMood={selectedMood}
                      onSelectMood={setSelectedMood}
                      moodCounts={moodCounts}
                    />
                  </div>

                  {/* Category Pills Filter */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
                    {['All', 'Lip Gossip', 'Cheek Tint', 'Base & Glow', 'Viral Trends', 'Makeup Bag', 'Disasters & Care'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setBlogCategoryFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bubbly font-bold transition-all cursor-pointer ${
                          blogCategoryFilter === cat
                            ? 'theme-accent-bg text-white shadow-sticker-sm scale-105'
                            : 'bg-white text-stone-700 hover:bg-pink-100 border border-pink-200'
                        }`}
                      >
                        {cat === 'All' ? `All 10 Entries 🎀` : cat}
                      </button>
                    ))}
                  </div>

                  {/* Results Count */}
                  <div className="text-xs font-body font-bold text-stone-500 pt-1">
                    Showing {filteredArticles.length} of 10 Articles
                  </div>

                  {/* Y2K Digital Stickers Bulk Decorator Toolbar */}
                  <div className="pt-2">
                    <StickerToolbar
                      onToggleStickerForAll={handleToggleStickerForAll}
                      onRandomizeAll={handleRandomizeAllStickers}
                      onClearAll={handleClearAllStickers}
                      onResetDefaults={handleResetDefaultStickers}
                      activeStickerCounts={stickerCounts}
                      totalDecoratedCards={totalDecoratedCards}
                      totalCards={BLOG_ARTICLES.length}
                    />
                  </div>
                </div>

                {/* Articles Grid */}
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-16 bg-white border-3 border-pink-300 rounded-3xl p-8 space-y-3">
                    <div className="text-4xl">🔎</div>
                    <h3 className="font-bubbly text-xl font-bold text-stone-800">
                      No diary posts matched your search!
                    </h3>
                    <p className="text-xs text-stone-500 font-body">
                      Try searching for "blush", "lip oil", "dupe", or "shimmer"!
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setBlogCategoryFilter('All');
                        setSelectedMood('All');
                      }}
                      className="px-4 py-2 rounded-full bg-[#FF2A85] text-white font-bubbly font-bold text-xs shadow-sticker-sm cursor-pointer"
                    >
                      Show All Posts 💖
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredArticles.map((art) => (
                      <Y2KArticleCard
                        key={art.id}
                        article={art}
                        onRead={handleOpenArticle}
                        isBookmarked={bookmarkedIds.includes(art.id)}
                        onToggleBookmark={toggleBookmark}
                        stamp={articleStamps[art.id]}
                        onOpenStampModal={(article) => setStampModalArticle(article)}
                        stickers={cardDecorations[art.id] || []}
                        onOpenStickerModal={(article) => setStickerModalArticle(article)}
                      />
                    ))}
                  </div>
                )}

              </main>
            )}

            {/* PROFILE & GLOW-UP SKIN PREP TIMER TAB */}
            {activeTab === 'profile' && (
              <main className="space-y-8 pb-16">
                <Y2KUserProfile
                  onSelectTab={handleSelectTab}
                  isFloatingTimer={isFloatingTimer}
                  onToggleFloatingTimer={() => setIsFloatingTimer(!isFloatingTimer)}
                  onOpenArticleByTopic={(topic) => {
                    const match = BLOG_ARTICLES.find(
                      (a) =>
                        a.title.toLowerCase().includes(topic.toLowerCase()) ||
                        a.category.toLowerCase().includes(topic.toLowerCase())
                    );
                    if (match) handleOpenArticle(match);
                  }}
                />
              </main>
            )}

            {/* CALENDAR TAB */}
            {activeTab === 'calendar' && (
              <main className="space-y-8 pb-16">
                <BeautyCalendar onSelectTab={handleSelectTab} />
              </main>
            )}

            {/* TIPS TAB */}
            {activeTab === 'tips' && <Y2KMakeupTips />}

            {/* FAVES TAB */}
            {activeTab === 'faves' && (
              <Y2KMyFaves
                isInWishlist={isInWishlist}
                onToggleWishlist={toggleWishlist}
              />
            )}

            {/* GRWM TAB */}
            {activeTab === 'grwm' && <Y2KGRWM />}

            {/* LOOKS TAB */}
            {activeTab === 'looks' && <Y2KMakeupLooks />}
          </>
        )}
      </div>

      {/* Footer */}
      <Y2KFooter
        onSelectTab={handleSelectTab}
        onOpenLipSpinner={() => setIsLipSpinnerOpen(true)}
        onOpenAudioPlayer={() => setIsAudioPlayerOpen(true)}
      />

      {/* Full Song Native Vanity Audio Player (No Spotify, Plays in Background) */}
      <VanityAudioPlayer
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
      />

      {/* Lip Combo Spinner Modal */}
      <LipComboModal
        isOpen={isLipSpinnerOpen}
        onClose={() => setIsLipSpinnerOpen(false)}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticles}
        onRemove={(id) => toggleBookmark(id)}
        onOpenArticle={(art) => {
          setIsBookmarksOpen(false);
          handleOpenArticle(art);
        }}
        articleStamps={articleStamps}
      />

      {/* Glam Wishlist Y2K Plastic Shopping Bag Drawer */}
      <GlamWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={removeFromWishlist}
        onClearWishlist={clearWishlist}
        onNavigateToArticles={() => {
          setIsWishlistOpen(false);
          handleSelectTab('blog');
        }}
        onOpenArticleById={(artId) => {
          const match = BLOG_ARTICLES.find((a) => a.id === artId);
          if (match) {
            setIsWishlistOpen(false);
            handleOpenArticle(match);
          }
        }}
      />

      {/* Floating Glam Bag Pill Button */}
      {wishlist.length > 0 && !isWishlistOpen && (
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#FF2A85] hover:bg-[#E0176F] text-white px-4 py-2.5 rounded-full shadow-sticker border-2 border-white hover:scale-108 transition-all flex items-center gap-2 cursor-pointer font-bubbly text-xs font-bold animate-in fade-in slide-in-from-bottom-3"
          title="Open your Glam Shopping Bag"
        >
          <span className="text-base">🛍️</span>
          <span>Glam Bag ({wishlist.length})</span>
          <span className="bg-[#FEF08A] text-[#854D0E] px-2 py-0.5 rounded-full text-[10px] font-black border border-yellow-400">
            ${wishlist.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0), 0).toFixed(0)}
          </span>
        </button>
      )}

      {/* Global Card Quick Stamp Modal */}
      {stampModalArticle && (
        <ArticleStampModal
          isOpen={true}
          onClose={() => setStampModalArticle(null)}
          articleTitle={stampModalArticle.title}
          currentStamp={articleStamps[stampModalArticle.id]}
          onApplyStamp={(stampId) => handleApplyStamp(stampModalArticle.id, stampId)}
          onRemoveStamp={() => handleRemoveStamp(stampModalArticle.id)}
        />
      )}

      {/* Global Y2K Digital Card Sticker Decorator Modal */}
      {stickerModalArticle && (
        <CardStickerModal
          isOpen={true}
          onClose={() => setStickerModalArticle(null)}
          article={stickerModalArticle}
          stickers={cardDecorations[stickerModalArticle.id] || []}
          onSaveStickers={handleSaveCardStickers}
        />
      )}

      {/* Floating 10-Minute Skin Prep Vanity Dock Widget */}
      {isFloatingTimer && activeTab !== 'profile' && (
        <GlowUpSkinPrepTimer
          isFloating={true}
          onToggleFloating={() => setIsFloatingTimer(false)}
        />
      )}

      {/* Global Y2K Digital Confetti Celebration Canvas */}
      <Y2KConfettiBurst />

    </div>
  );
}
