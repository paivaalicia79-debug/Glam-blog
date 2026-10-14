import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Heart, Bookmark, MessageSquare, Send, Sparkles, ThumbsUp, Star, Award, Trash2, PartyPopper, Tag } from 'lucide-react';
import { BlogArticle, Comment } from '../types/blog';
import { UserStamp, StampId, Y2K_STAMPS } from '../types/stamps';
import { PlacedSticker } from '../types/cardStickers';
import { Y2K_CARD_STICKERS } from '../data/cardStickersData';
import { ArticleStampBadge } from './ArticleStampBadge';
import { ArticleStampModal } from './ArticleStampModal';
import { triggerY2KConfetti } from './Y2KConfettiBurst';

interface Y2KArticleDetailProps {
  article: BlogArticle;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectArticle: (article: BlogArticle) => void;
  allArticles: BlogArticle[];
  currentStamp?: UserStamp;
  onApplyStamp: (stampId: StampId) => void;
  onRemoveStamp: () => void;
  isInWishlist?: (name: string, brand: string) => boolean;
  onToggleWishlist?: (
    product: {
      name: string;
      brand: string;
      price: string;
      verdict: string;
      articleId?: string;
      articleTitle?: string;
    },
    e?: React.MouseEvent
  ) => void;
  stickers?: PlacedSticker[];
  onOpenStickerModal?: () => void;
}

export const Y2KArticleDetail: React.FC<Y2KArticleDetailProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  allArticles,
  currentStamp,
  onApplyStamp,
  onRemoveStamp,
  isInWishlist,
  onToggleWishlist,
  stickers = [],
  onOpenStickerModal,
}) => {
  const [likes, setLikes] = useState<number>(article.likesCount);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isStampModalOpen, setIsStampModalOpen] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  // Digital Confetti Bottom Sentinel
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);
  const hasTriggeredConfettiRef = useRef<boolean>(false);

  // Reset confetti trigger when article changes
  useEffect(() => {
    hasTriggeredConfettiRef.current = false;
    setShowCelebrationBanner(false);
  }, [article.id]);

  useEffect(() => {
    const sentinel = bottomSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredConfettiRef.current) {
          hasTriggeredConfettiRef.current = true;
          setShowCelebrationBanner(true);
          triggerY2KConfetti({ mode: 'article', count: 90 });
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 80px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [article.id]);

  // Comments state persisted in localStorage
  const commentsKey = `allies_comments_${article.id}`;
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem(commentsKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return article.comments;
  });

  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');

  useEffect(() => {
    const likedKey = `allies_liked_${article.id}`;
    if (localStorage.getItem(likedKey) === 'true') {
      setHasLiked(true);
    }
  }, [article.id]);

  useEffect(() => {
    try {
      localStorage.setItem(commentsKey, JSON.stringify(comments));
    } catch {
      // ignore
    }
  }, [comments, commentsKey]);

  const handleLike = () => {
    const likedKey = `allies_liked_${article.id}`;
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
      localStorage.removeItem(likedKey);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      localStorage.setItem(likedKey, 'true');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      author: authorName.trim() || 'Glam Girlie 💕',
      date: 'Just now',
      text: commentText.trim(),
      likes: 0,
      avatarEmoji: selectedEmoji
    };

    setComments([newComment, ...comments]);
    setCommentText('');
    setAuthorName('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c)));
  };

  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFF0F5] pb-24">
      
      {/* Top Floating Mini Bar */}
      <div className="sticky top-14 z-30 bg-[#FFF0F5]/90 backdrop-blur-md border-b-2 border-pink-200 py-2.5 sm:py-3 px-3 sm:px-6 lg:px-10 xl:px-16">
        <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bubbly font-bold text-[#FF1493] hover:text-[#2D1226] bg-white px-2.5 sm:px-3 py-1.5 rounded-full border border-pink-300 shadow-sticker-sm transition-transform hover:scale-105 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Vanity 💄</span>
            <span className="sm:hidden">Back 💄</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Stamp Button */}
            <button
              onClick={() => setIsStampModalOpen(true)}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border-2 ${
                currentStamp
                  ? 'bg-[#FEF08A] text-[#854D0E] border-yellow-400 shadow-sticker-sm scale-105'
                  : 'bg-white text-stone-700 border-pink-300 hover:text-[#FF1493] hover:bg-pink-50'
              }`}
              title={currentStamp ? 'View or change your digital stamp' : 'Stamp this article with a cute sticker!'}
            >
              <Award className="w-3.5 h-3.5 text-[#FF2A85]" />
              <span className="font-bubbly text-xs">
                {currentStamp ? 'Stamped 🏷️' : 'Stamp'}
              </span>
            </button>

            {/* Heart Button */}
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border-2 ${
                hasLiked
                  ? 'bg-[#FF2A85] text-white border-[#FF2A85] shadow-sticker-sm scale-105'
                  : 'bg-white text-[#FF1493] border-pink-300 hover:bg-pink-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : 'fill-[#FF1493]'}`} />
              <span className="tabular-nums">{likes}</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 sm:p-2 rounded-full border-2 transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#FF2A85] text-white border-[#FF2A85] shadow-sticker-sm'
                  : 'bg-white text-stone-700 border-pink-300 hover:bg-pink-50'
              }`}
              title={isBookmarked ? 'Saved in beauty box' : 'Save post'}
            >
              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Post Content */}
      <main className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-8">
        
        {/* Post Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FF2A85] shadow-sticker space-y-4 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold font-body">
            <div className="flex items-center gap-2">
              <span className="bg-[#FEF08A] text-[#854D0E] border border-yellow-400 px-3 py-0.5 rounded-full">
                {article.category}
              </span>
              <span className="text-pink-300">•</span>
              <span className="text-stone-500">{article.publishedAt}</span>
              <span className="text-pink-300">•</span>
              <span className="text-[#FF1493]">{article.readTime}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Decorate Stickers Button */}
              {onOpenStickerModal && (
                <button
                  onClick={onOpenStickerModal}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bubbly font-bold border-2 transition-transform hover:scale-105 cursor-pointer ${
                    stickers && stickers.length > 0
                      ? 'bg-gradient-to-r from-[#FF2A85] to-[#A855F7] text-white border-white shadow-sticker-sm'
                      : 'bg-white text-stone-700 border-pink-200 hover:text-[#FF1493]'
                  }`}
                  title="Decorate with Y2K digital stickers"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{stickers && stickers.length > 0 ? `${stickers.length} Stickers 🎨` : 'Stickers 🎨'}</span>
                </button>
              )}

              {/* Stamped Badge if present */}
              {currentStamp && (
                <button
                  onClick={() => setIsStampModalOpen(true)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  title="Click to change your stamp"
                >
                  <ArticleStampBadge
                    stampId={currentStamp.stampId}
                    size="md"
                    date={currentStamp.stampedAt}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Overlaid Placed Digital Stickers on Header Card */}
          {stickers && stickers.map((st) => {
            const stickerData = Y2K_CARD_STICKERS.find((s) => s.id === st.stickerId);
            if (!stickerData) return null;
            const posClass =
              st.position === 'top-left'
                ? '-top-3 -left-3'
                : st.position === 'top-right'
                ? '-top-3 -right-3'
                : st.position === 'bottom-left'
                ? '-bottom-3 -left-3'
                : '-bottom-3 -right-3';
            return (
              <div
                key={st.stickerId}
                style={{ transform: `rotate(${st.rotation || 0}deg)` }}
                className={`absolute z-20 pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] select-none ${posClass}`}
              >
                <img
                  src={stickerData.image}
                  alt={stickerData.name}
                  className="w-14 h-14 sm:w-18 sm:h-18 object-contain"
                />
              </div>
            );
          })}

          <h1 className="font-bubbly text-2xl sm:text-4xl font-bold text-[#2D1226] leading-snug">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-body leading-relaxed">
            {article.tagline}
          </p>

          {/* Allie's Verdict Card */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {article.worthTheHype && (
              <div className="bg-[#FFF0F5] border-2 border-pink-300 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold">
                <span className="text-[#FF1493]">Worth the hype?</span>
                <span className="bg-[#FF2A85] text-white px-2 py-0.5 rounded-full text-[11px]">
                  {article.worthTheHype}
                </span>
              </div>
            )}

            {article.allieRating && (
              <div className="bg-[#FEF08A] border-2 border-yellow-400 text-[#854D0E] px-3 py-1.5 rounded-2xl flex items-center gap-1 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-[#854D0E]" />
                <span>Allie’s Rating: {article.allieRating}</span>
              </div>
            )}
          </div>

        </div>

        {/* Big Cute Photo with Sticker & Applied Stamp */}
        <div className="relative rounded-3xl overflow-hidden border-3 border-[#FF2A85] shadow-sticker bg-white">
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            className="w-full max-h-[460px] object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-pink-300 text-xs font-bubbly font-bold text-[#FF1493] shadow-sm flex items-center gap-1">
            <span>✨ {article.vibeTag}</span>
          </div>

          {/* Stamped Seal Over Photo */}
          {currentStamp && (
            <div className="absolute top-4 right-4 z-10 pointer-events-none drop-shadow-lg">
              <ArticleStampBadge
                stampId={currentStamp.stampId}
                size="md"
                date={currentStamp.stampedAt}
              />
            </div>
          )}
        </div>

        {/* Purikura Interactive Digital Stamp Station */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#FF2A85] shadow-sticker space-y-4">
          <div className="flex items-center justify-between border-b-2 border-pink-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FEF08A] text-[#854D0E] flex items-center justify-center font-bold shadow-sticker-sm text-sm">
                🏷️
              </div>
              <div>
                <h3 className="font-bubbly text-base sm:text-lg font-bold text-[#FF1493] flex items-center gap-1.5 leading-none">
                  <span>Purikura Stamp Station</span>
                  <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </h3>
                <p className="text-[11px] text-stone-500 font-body">
                  Tap any digital seal to stamp this review into your personal vanity diary!
                </p>
              </div>
            </div>

            {currentStamp && (
              <button
                onClick={onRemoveStamp}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-bold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                title="Remove stamp"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Remove</span>
              </button>
            )}
          </div>

          {/* Stamp Options Palette */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {Y2K_STAMPS.map((stamp) => {
              const isSelected = currentStamp?.stampId === stamp.id;
              return (
                <button
                  key={stamp.id}
                  onClick={() => onApplyStamp(stamp.id)}
                  className={`p-2.5 rounded-2xl border-2 text-center flex flex-col items-center justify-between transition-all cursor-pointer group ${
                    isSelected
                      ? 'border-[#FF2A85] bg-pink-100/70 shadow-sticker-sm scale-105 ring-2 ring-pink-300'
                      : 'border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50 hover:scale-105'
                  }`}
                  title={`Stamp with ${stamp.name}`}
                >
                  <span className="text-2xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
                    {stamp.emoji}
                  </span>
                  <span className="font-bubbly text-[11px] font-bold text-stone-800 leading-tight mt-1 group-hover:text-[#FF1493]">
                    {stamp.name}
                  </span>
                  {isSelected && (
                    <span className="mt-1 text-[9px] font-black uppercase tracking-wider text-[#FF1493] bg-white px-1.5 py-0.5 rounded-full border border-pink-200">
                      Stamped!
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {currentStamp && (
            <div className="text-center pt-1 font-body text-xs text-stone-500">
              <span>Currently sealed with </span>
              <strong className="text-[#FF1493]">
                {Y2K_STAMPS.find((s) => s.id === currentStamp.stampId)?.name}
              </strong>
              <span> on {currentStamp.stampedAt} ✨</span>
            </div>
          )}
        </div>

        {/* Allie's Golden Takeaway Box */}
        <div className="bg-[#E9D5FF] border-3 border-[#A855F7] rounded-3xl p-5 shadow-sticker-purple space-y-2">
          <div className="flex items-center gap-2 text-xs font-bubbly font-bold text-[#6B21A8]">
            <Sparkles className="w-4 h-4 text-[#A855F7]" />
            <span>ALLIE’S QUICK GOLDEN RULE 🎀</span>
          </div>
          <p className="text-xs sm:text-sm font-body text-[#3B0764] leading-relaxed font-semibold">
            "{article.quickTakeaway}"
          </p>
        </div>

        {/* Article Body Content & Question-based H2 Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FF2A85] shadow-sticker space-y-8">
          
          {/* Question-based H2 Sections with Direct Answers */}
          {article.sections && article.sections.length > 0 ? (
            <div className="space-y-8">
              {article.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h2 className="font-bubbly text-xl sm:text-2xl font-bold text-[#FF1493] flex items-start gap-2.5">
                    <span className="bg-[#FEF08A] text-[#854D0E] text-xs font-black px-2 py-0.5 rounded-md border border-yellow-400 mt-1 select-none shrink-0">
                      Q&A
                    </span>
                    <span>{sec.questionH2}</span>
                  </h2>

                  {/* Direct Answer Box for SEO Featured Snippets */}
                  <div className="bg-[#FFF0F6] border-l-4 border-[#FF2A85] p-4 sm:p-5 rounded-r-2xl font-body text-sm sm:text-base text-stone-800 shadow-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-base select-none shrink-0">💡</span>
                      <p className="leading-relaxed">
                        <strong className="text-[#2D1226] font-bold">Direct Answer: </strong>
                        {sec.directAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Detail Paragraphs */}
                  {sec.details && sec.details.map((detail, dIdx) => (
                    <p key={dIdx} className="text-sm sm:text-base text-stone-800 font-body leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {article.paragraphs.map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-stone-800 font-body leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Contextual Internal Links Section */}
          {article.internalLinks && article.internalLinks.length > 0 && (
            <div className="pt-6 border-t-2 border-pink-100 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎀</span>
                <h3 className="font-bubbly text-base sm:text-lg font-bold text-[#FF1493]">
                  Allie’s Recommended Reads from the Vanity 💕
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.internalLinks.map((link, lIdx) => {
                  const targetArt = allArticles.find((a) => a.slug === link.slug || a.id === link.slug);
                  return (
                    <a
                      key={lIdx}
                      href={`#/articles/${link.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (targetArt) {
                          onSelectArticle(targetArt);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="bg-[#FFF0F6] border-2 border-pink-200 hover:border-[#FF2A85] p-3.5 rounded-2xl block transition-all hover:scale-102 group shadow-xs cursor-pointer"
                    >
                      <span className="font-bubbly font-bold text-xs sm:text-sm text-[#2D1226] group-hover:text-[#FF1493] flex items-center justify-between gap-2">
                        <span>{link.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FF2A85] shrink-0 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[11px] text-stone-600 font-body block mt-1">
                        {link.blurb}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main & Related Keywords SEO Tags */}
          {article.mainKeyword && (
            <div className="pt-4 border-t-2 border-pink-100 flex flex-wrap items-center gap-1.5 text-[11px] font-body text-stone-500">
              <Tag className="w-3 h-3 text-[#FF2A85]" />
              <span className="font-bold text-[#FF1493]">Article Topic:</span>
              <span className="bg-pink-50 border border-pink-200 text-[#2D1226] font-bold px-2.5 py-0.5 rounded-full">
                #{article.mainKeyword}
              </span>
              {article.relatedKeywords?.map((kw, kIdx) => (
                <span key={kIdx} className="bg-white border border-pink-200 text-stone-600 px-2.5 py-0.5 rounded-full">
                  #{kw}
                </span>
              ))}
            </div>
          )}

          {/* Product Mentions Table / Cards */}
          {article.productMentions && article.productMentions.length > 0 && (
            <div className="pt-6 border-t-2 border-pink-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bubbly text-lg font-bold text-[#FF1493] flex items-center gap-1.5">
                  <span>Products Mentioned & Honest Tea ☕</span>
                </h3>
                <span className="text-[11px] font-body text-stone-500 flex items-center gap-1">
                  <span>Click</span>
                  <Heart className="w-3.5 h-3.5 text-[#FF2A85] fill-[#FF2A85] inline" />
                  <span>to save to your Glam Bag 🛍️</span>
                </span>
              </div>

              <div className="space-y-3">
                {article.productMentions.map((prod, idx) => {
                  const isWishlisted = isInWishlist
                    ? isInWishlist(prod.name, prod.brand)
                    : false;

                  return (
                    <div
                      key={idx}
                      className="bg-[#FFF0F5] border-2 border-pink-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/item hover:border-pink-300 transition-colors"
                    >
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bubbly font-bold text-sm sm:text-base text-[#2D1226]">
                            {prod.name}
                          </span>
                          <span className="text-[11px] bg-white border border-pink-300 text-[#FF2A85] px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                            {prod.price}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 font-body font-medium">
                          {prod.brand}
                        </div>
                        <div className="text-xs text-[#854D0E] font-body font-semibold pt-0.5">
                          👉 {prod.verdict}
                        </div>
                      </div>

                      {/* Heart Wishlist Button */}
                      {onToggleWishlist && (
                        <button
                          onClick={(e) =>
                            onToggleWishlist(
                              {
                                name: prod.name,
                                brand: prod.brand,
                                price: prod.price,
                                verdict: prod.verdict,
                                articleId: article.id,
                                articleTitle: article.title,
                              },
                              e
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-bubbly font-bold transition-all hover:scale-105 cursor-pointer shadow-xs shrink-0 ${
                            isWishlisted
                              ? 'bg-[#FF2A85] text-white border-white shadow-sticker-sm'
                              : 'bg-white text-stone-700 border-pink-200 hover:text-[#FF1493] hover:bg-pink-50'
                          }`}
                          title={
                            isWishlisted
                              ? 'In your Glam Bag! Click to remove'
                              : 'Add to Glam Wishlist 💖'
                          }
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-transform ${
                              isWishlisted ? 'fill-white text-white scale-110' : 'text-[#FF2A85]'
                            }`}
                          />
                          <span>{isWishlisted ? 'In Glam Bag 🛍️' : 'Add to Bag'}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Author Sign-off */}
          <div className="pt-6 border-t-2 border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF2A85] text-white flex items-center justify-center font-bold text-xl shadow-sticker-sm">
                🎀
              </div>
              <div>
                <span className="font-bubbly font-bold text-sm text-[#2D1226] block">Written by Allie (19) 💕</span>
                <span className="text-xs text-stone-500 font-body block">Lip gloss hoarder & beauty researcher</span>
              </div>
            </div>

            <button
              onClick={handleLike}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF2A85] text-white font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Send Love ({likes})</span>
            </button>
          </div>

        </div>

        {/* Comment Section ("Leave a cute note! 💬") */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FF2A85] shadow-sticker space-y-6">
          <div className="flex items-center justify-between border-b-2 border-pink-100 pb-4">
            <h3 className="font-bubbly text-xl font-bold text-[#FF1493] flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>Vanity Love Notes ({comments.length})</span>
            </h3>
            <span className="text-xs text-stone-500 font-body">Come say hi! 💖</span>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="bg-[#FFF0F5] border-2 border-pink-300 rounded-2xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name or cute handle (e.g. Jessica 🍓)..."
                className="flex-1 text-xs font-body px-3.5 py-2.5 bg-white border border-pink-300 rounded-full focus:outline-none focus:border-[#FF2A85]"
              />

              {/* Emoji Picker */}
              <div className="flex items-center gap-1 bg-white border border-pink-300 rounded-full px-2 py-1">
                {['💖', '🎀', '💄', '🍓', '✨', '💅'].map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm cursor-pointer transition-transform ${
                      selectedEmoji === emoji ? 'bg-pink-100 scale-120 border border-pink-400' : 'hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Leave a sweet comment, ask about dupes, or share your thoughts! ✨"
              className="w-full text-xs font-body px-3.5 py-2.5 bg-white border border-pink-300 rounded-2xl focus:outline-none focus:border-[#FF2A85]"
              required
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly font-bold text-xs shadow-sticker-sm hover:scale-103 transition-transform cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>Post Note 💕</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white border-2 border-pink-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bubbly font-bold text-[#FF1493]">
                    <span className="text-base">{comment.avatarEmoji || '💖'}</span>
                    <span>{comment.author}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-body">{comment.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 font-body leading-relaxed pl-6">
                  {comment.text}
                </p>

                <div className="pl-6 pt-1">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-900 cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.likes} agree</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* End of Article Celebration Box */}
        <section className="bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100 border-3 border-[#FF2A85] rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-sticker relative overflow-hidden">
          <div className="absolute -top-3 -right-3 text-3xl select-none rotate-12 pointer-events-none">
            💖
          </div>
          <div className="absolute -bottom-3 -left-3 text-3xl select-none -rotate-12 pointer-events-none">
            ⭐
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#FF1493] font-bubbly text-xs font-bold border-2 border-pink-300 shadow-sticker-sm">
            <PartyPopper className="w-3.5 h-3.5 text-[#FF2A85]" />
            <span>YOU FINISHED THIS DIARY ENTRY!</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-current" />
          </div>

          <h3 className="font-bubbly text-xl sm:text-2xl font-bold text-[#FF1493]">
            Slay Bestie! Thanks for Reading 🎀✨
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 font-body max-w-md mx-auto">
            You made it all the way to the end! Don't forget to seal this post with your collectible digital stamp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => triggerY2KConfetti({ mode: 'article', count: 90 })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full theme-accent-bg text-white font-bubbly text-xs font-bold shadow-sticker-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-current" />
              <span>Toss Confetti Again! 💖⭐</span>
            </button>

            <button
              onClick={() => setIsStampModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-[#FF1493] font-bubbly text-xs font-bold border-2 border-pink-300 shadow-sticker-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{currentStamp ? 'Change Digital Stamp 🏷️' : 'Add Purikura Stamp 🏷️'}</span>
            </button>
          </div>
        </section>

        {/* Read Next Section */}
        <section className="space-y-4 pt-4">
          <h3 className="font-bubbly text-xl font-bold text-[#FF1493] flex items-center gap-2">
            <span>More Cute Diary Entries 🎀</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectArticle(rel);
                }}
                className="group bg-white border-2 border-pink-300 rounded-2xl p-3 shadow-sticker-sm hover:scale-102 transition-transform cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2 border border-pink-200">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-purple-700 block">{rel.category}</span>
                <h4 className="font-bubbly font-bold text-xs text-[#2D1226] group-hover:text-[#FF1493] line-clamp-2 mt-0.5">
                  {rel.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Sentinel to trigger digital confetti */}
        <div ref={bottomSentinelRef} className="h-6 w-full pointer-events-none" />

      </main>

      {/* Modal Stamp Picker */}
      <ArticleStampModal
        isOpen={isStampModalOpen}
        onClose={() => setIsStampModalOpen(false)}
        articleTitle={article.title}
        currentStamp={currentStamp}
        onApplyStamp={onApplyStamp}
        onRemoveStamp={onRemoveStamp}
      />
    </div>
  );
};
