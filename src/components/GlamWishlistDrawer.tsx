import React, { useState, useMemo } from 'react';
import { X, Heart, Trash2, ArrowRight, Sparkles, Star, ShoppingBag, Copy, Check, ExternalLink, BookOpen } from 'lucide-react';
import { WishlistItem } from '../types/blog';

interface GlamWishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onClearWishlist: () => void;
  onOpenArticleById?: (articleId: string) => void;
  onNavigateToArticles?: () => void;
}

export const GlamWishlistDrawer: React.FC<GlamWishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem,
  onClearWishlist,
  onOpenArticleById,
  onNavigateToArticles,
}) => {
  const [copiedList, setCopiedList] = useState<boolean>(false);

  // Calculate estimated total price
  const totalPrice = useMemo(() => {
    return wishlist.reduce((acc, item) => {
      const numeric = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return acc + (isNaN(numeric) ? 0 : numeric);
    }, 0);
  }, [wishlist]);

  const handleCopyWishlist = () => {
    if (wishlist.length === 0) return;
    const text = [
      `🛍️ ALLIE'S GLAM WISHLIST & VANITY HAUL 💖✨`,
      `=============================================`,
      ...wishlist.map(
        (item, i) =>
          `${i + 1}. ${item.name} (${item.brand}) - ${item.price}\n   Verdict: ${item.verdict}`
      ),
      `=============================================`,
      `Estimated Damage: $${totalPrice.toFixed(2)} ✨`,
      `Saved from Allie's Y2K Makeup Diary! 💋`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedList(true);
    setTimeout(() => setCopiedList(false), 2400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop with Animated Star Sparkles */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/45 backdrop-blur-xs transition-opacity duration-300"
      >
        {/* Ambient Twinkling Floating Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute top-[12%] left-[18%] text-yellow-300 text-xl animate-pulse">✨</span>
          <span className="absolute top-[35%] left-[28%] text-pink-300 text-lg animate-bounce">⭐</span>
          <span className="absolute top-[68%] left-[12%] text-yellow-200 text-2xl animate-pulse">🌟</span>
          <span className="absolute top-[82%] left-[34%] text-pink-200 text-base animate-bounce">✨</span>
        </div>
      </div>

      {/* Y2K Translucent Plastic Shopping Bag Drawer */}
      <div className="relative z-10 w-full max-w-md h-full flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Shopping Bag Outer Shell (Crinkly Frost Plastic Aesthetic) */}
        <div className="relative w-full h-full flex flex-col overflow-hidden bg-gradient-to-b from-[#FFF5F8]/95 via-[#FFE8F0]/90 to-[#FFD5E5]/95 backdrop-blur-md border-l-4 border-t-2 border-b-2 border-[#FF2A85] shadow-2xl">
          
          {/* Plastic Gloss Highlights & Sheen Creases */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-pink-200/20" />
          <div className="absolute top-0 right-16 w-8 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-12deg] pointer-events-none" />
          <div className="absolute top-0 left-20 w-4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-12deg] pointer-events-none" />

          {/* Plastic Shopping Bag Handle Die-Cut Section */}
          <div className="relative pt-5 pb-3 px-6 text-center shrink-0 border-b-2 border-dashed border-pink-300/80 bg-white/70">
            {/* Bag Oval Punch Handle */}
            <div className="w-28 h-7 mx-auto rounded-full border-3 border-[#FF2A85] bg-pink-100/80 shadow-inner flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
              <span className="text-[10px] font-black tracking-widest text-[#FF1493] uppercase select-none opacity-80">
                PULL & HOLD 🛍️
              </span>
            </div>

            {/* Bag Close Button in Top Right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/90 text-stone-500 hover:text-stone-900 border-2 border-pink-300 hover:bg-pink-100 transition-all hover:scale-110 cursor-pointer shadow-xs"
              title="Close Shopping Bag"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Retro Plastic Bag Typography Header */}
            <div className="mt-3 space-y-0.5">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-widest text-[#FF1493] uppercase font-bubbly">
                <span className="animate-spin text-sm">⭐</span>
                <span>THANK YOU FOR SHOPPING AT ALLIE'S</span>
                <span className="animate-spin text-sm">⭐</span>
              </div>
              <h2 className="font-bubbly text-2xl font-bold text-[#E0176F] tracking-tight flex items-center justify-center gap-1.5">
                <span>My Glam Wishlist</span>
                <span className="text-xl">🛍️</span>
              </h2>
              <p className="text-[11px] font-body text-pink-700 font-semibold tracking-wide">
                HAVE A GLAM DAY • 100% NOSTALGIC VANITY STASH
              </p>
            </div>
          </div>

          {/* Wishlist Items List (Scrollable Bag Interior) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 relative">
            {wishlist.length === 0 ? (
              /* Empty Bag State */
              <div className="text-center py-16 px-4 space-y-4">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="w-20 h-20 rounded-3xl bg-pink-100/90 border-3 border-dashed border-[#FF2A85] flex items-center justify-center shadow-inner animate-pulse">
                    <ShoppingBag className="w-10 h-10 text-[#FF2A85]" />
                  </div>
                  <span className="absolute -top-1 -right-1 text-2xl animate-bounce">✨</span>
                  <span className="absolute -bottom-1 -left-1 text-xl animate-spin">⭐</span>
                </div>

                <div className="space-y-1.5 max-w-xs mx-auto">
                  <h3 className="font-bubbly text-lg font-bold text-[#FF1493]">
                    Your Glam Bag is Empty! 👛
                  </h3>
                  <p className="text-xs text-stone-600 font-body leading-relaxed">
                    Click the cute heart icon <span className="text-[#FF2A85] font-bold">💖</span> next to any beauty product mentioned in Allie's diary entries to save it here!
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onNavigateToArticles) {
                        onNavigateToArticles();
                      } else {
                        onClose();
                      }
                    }}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2A85] via-[#E0176F] to-[#9333EA] hover:from-[#E0176F] hover:to-[#7E22CE] text-white font-bubbly text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(255,42,133,0.39)] hover:shadow-[0_6px_20px_rgba(255,42,133,0.55)] border-2 border-white hover:scale-106 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <BookOpen className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform duration-200 shrink-0" />
                    <span>Browse All 10 Diary Articles 📖✨</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  </button>
                </div>
              </div>
            ) : (
              /* Item Cards */
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white/95 rounded-2xl border-2 border-pink-300 p-4 shadow-sm hover:shadow-sticker-sm transition-all duration-200 hover:border-[#FF2A85] flex flex-col justify-between"
                >
                  {/* Subtle Star Glint on Card */}
                  <div className="absolute top-2 right-10 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-[#BE185D] border border-pink-200">
                          {item.brand}
                        </span>
                        <span className="font-mono text-xs font-black text-[#854D0E] bg-[#FEF08A] px-2 py-0.5 rounded-md border border-yellow-400">
                          {item.price}
                        </span>
                      </div>

                      <h4 className="font-bubbly text-sm font-bold text-[#2D1226] leading-snug">
                        {item.name}
                      </h4>

                      <p className="text-xs text-stone-600 font-body italic leading-relaxed">
                        👉 "{item.verdict}"
                      </p>

                      {item.articleTitle && (
                        <div className="pt-1 flex items-center gap-1 text-[11px] text-[#A855F7] font-bold">
                          <span>From:</span>
                          {item.articleId && onOpenArticleById ? (
                            <button
                              onClick={() => {
                                onOpenArticleById(item.articleId!);
                                onClose();
                              }}
                              className="underline hover:text-[#9333EA] text-left truncate max-w-[210px] cursor-pointer inline-flex items-center gap-0.5"
                            >
                              <span>{item.articleTitle}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </button>
                          ) : (
                            <span className="truncate max-w-[210px]">{item.articleTitle}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Delete Item from Wishlist */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 rounded-xl bg-pink-50 hover:bg-rose-100 text-stone-400 hover:text-rose-600 border border-pink-200 transition-colors shrink-0 cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Plastic Bag Bottom Fold & Checkout Summary */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-5 bg-white/85 border-t-2 border-pink-300 space-y-3 shrink-0 relative">
              {/* Star Border Accent */}
              <div className="flex items-center justify-between text-xs text-pink-400 font-mono tracking-widest overflow-hidden select-none">
                <span>★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★</span>
              </div>

              {/* Estimated Damage Total */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-stone-500 font-body">
                    Estimated Haul Total:
                  </span>
                  <div className="font-bubbly text-xl font-bold text-[#FF1493]">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-stone-500 font-bold">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in bag
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleCopyWishlist}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#FEF08A] hover:bg-yellow-200 text-[#854D0E] font-bubbly text-xs font-bold border-2 border-yellow-400 shadow-sticker-sm hover:scale-102 transition-transform cursor-pointer"
                  title="Copy your dream makeup list to clipboard"
                >
                  {copiedList ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Haul! 💕</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Stash 📋</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClearWishlist}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-bubbly text-xs font-bold border-2 border-rose-300 shadow-xs hover:scale-102 transition-transform cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Bag 🗑️</span>
                </button>
              </div>

              {/* Retro Grocery Barcode Graphic */}
              <div className="pt-2 text-center select-none opacity-85">
                <div className="font-mono text-xs tracking-[5px] text-stone-800 scale-y-125 font-bold">
                  ||||| ||| ||||| || |||| ||| |||||
                </div>
                <div className="font-mono text-[9px] text-stone-500 tracking-wider">
                  0 2000 2026 💖 GLAM-BAG-VALID
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
