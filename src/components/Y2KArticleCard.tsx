import React from 'react';
import { Heart, MessageSquare, Clock, Bookmark, ArrowRight, Sparkles, Award } from 'lucide-react';
import { BlogArticle } from '../types/blog';
import { UserStamp } from '../types/stamps';
import { PlacedSticker } from '../types/cardStickers';
import { Y2K_CARD_STICKERS } from '../data/cardStickersData';
import { ArticleStampBadge } from './ArticleStampBadge';

interface Y2KArticleCardProps {
  article: BlogArticle;
  onRead: (article: BlogArticle) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  stamp?: UserStamp;
  onOpenStampModal?: (article: BlogArticle, e: React.MouseEvent) => void;
  stickers?: PlacedSticker[];
  onOpenStickerModal?: (article: BlogArticle, e: React.MouseEvent) => void;
}

export const Y2KArticleCard: React.FC<Y2KArticleCardProps> = ({
  article,
  onRead,
  isBookmarked,
  onToggleBookmark,
  stamp,
  onOpenStampModal,
  stickers = [],
  onOpenStickerModal,
}) => {
  return (
    <div 
      onClick={() => onRead(article)}
      className="group bg-white rounded-3xl border-3 border-[#FF2A85] p-5 shadow-sticker hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FF2A85] transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Card Image with Sticker Badges */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border-2 border-pink-200 bg-pink-100">
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Vibe Tag Floating Pill */}
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#FF1493] text-[11px] font-bubbly font-bold px-3 py-1 rounded-full border border-pink-300 shadow-sm flex items-center gap-1">
            <span>{article.vibeTag}</span>
          </div>

          {/* Action Buttons (Bookmark, Stamp & Sticker Decorate) */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
            {onOpenStickerModal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenStickerModal(article, e);
                }}
                className={`p-2 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${
                  stickers && stickers.length > 0
                    ? 'bg-gradient-to-r from-[#FF2A85] to-[#A855F7] text-white border-white shadow-sticker-sm'
                    : 'bg-white/90 text-stone-700 border-pink-200 hover:text-[#FF1493]'
                }`}
                title={
                  stickers && stickers.length > 0
                    ? `${stickers.length} stickers placed! Click to decorate/edit`
                    : 'Decorate card with Y2K stickers 🎨'
                }
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenStampModal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenStampModal(article, e);
                }}
                className={`p-2 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${
                  stamp
                    ? 'bg-[#FEF08A] text-[#854D0E] border-yellow-400 shadow-sticker-sm'
                    : 'bg-white/90 text-stone-700 border-pink-200 hover:text-[#FF1493]'
                }`}
                title={stamp ? 'Change/view stamp' : 'Stamp this article 🏷️'}
              >
                <Award className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Bookmark Button */}
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-2 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${
                isBookmarked
                  ? 'bg-[#FF2A85] text-white border-white shadow-sm'
                  : 'bg-white/90 text-stone-700 border-pink-200 hover:text-[#FF1493]'
              }`}
              title={isBookmarked ? 'Saved to beauty box' : 'Save for later'}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dynamically Placed Y2K Digital Stickers */}
          {stickers && stickers.map((st) => {
            const stickerData = Y2K_CARD_STICKERS.find((s) => s.id === st.stickerId);
            if (!stickerData) return null;
            const posClass =
              st.position === 'top-left'
                ? 'top-1 left-1'
                : st.position === 'top-right'
                ? 'top-1 right-1'
                : st.position === 'bottom-left'
                ? 'bottom-8 left-1'
                : 'bottom-8 right-1';

            return (
              <div
                key={st.stickerId}
                style={{ transform: `rotate(${st.rotation || 0}deg)` }}
                className={`absolute z-10 pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.32)] transition-transform group-hover:scale-110 ${posClass}`}
              >
                <img
                  src={stickerData.image}
                  alt={stickerData.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain select-none filter contrast-105"
                />
              </div>
            );
          })}

          {/* Applied Y2K Stamp Sticker Badge */}
          {stamp && (
            <div className="absolute -bottom-2 -right-1 z-10 pointer-events-none drop-shadow-md">
              <ArticleStampBadge stampId={stamp.stampId} size="sm" />
            </div>
          )}

          {/* Category Chip & Mood Badge at Bottom */}
          <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 flex-wrap">
            <div className="bg-[#FEF08A] text-[#854D0E] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-yellow-400 shadow-xs">
              {article.category}
            </div>
            {article.mood && (
              <div className="bg-white/95 text-[10px] font-bubbly font-bold px-2 py-0.5 rounded-full border border-pink-200 text-stone-700 shadow-xs flex items-center gap-1">
                <span>
                  {article.mood === 'Happy' && '💖'}
                  {article.mood === 'Dreamy' && '☁️'}
                  {article.mood === 'Bold' && '⚡'}
                  {article.mood === 'Chill' && '🍵'}
                </span>
                <span>{article.mood}</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bubbly text-lg sm:text-xl font-bold text-[#2D1226] group-hover:text-[#FF1493] transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>

        {/* Tagline / Snippet */}
        <p className="mt-2 text-xs sm:text-sm text-stone-600 font-body line-clamp-2 leading-relaxed">
          {article.tagline}
        </p>

        {/* Worth the Hype Badge if available */}
        {article.worthTheHype && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFF0F5] border border-pink-200 text-[#FF1493] text-[11px] font-bold">
            <span>Verdict:</span>
            <span className="text-stone-900">{article.worthTheHype}</span>
          </div>
        )}
      </div>

      {/* Footer Info Row */}
      <div className="mt-5 pt-3 border-t-2 border-pink-100 flex items-center justify-between text-xs text-stone-500 font-body">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold text-[#FF2A85]">
            <Heart className="w-3.5 h-3.5 fill-[#FF2A85]" />
            <span className="tabular-nums">{article.likesCount}</span>
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{article.comments.length}</span>
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1 font-bubbly font-bold text-[#FF1493] group-hover:translate-x-1 transition-transform">
          <span>Read Post</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
