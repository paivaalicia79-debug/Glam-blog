import React, { useState } from 'react';
import { MY_FAVES } from '../data/blogData';
import { Heart, Star, Sparkles, Tag, ShoppingBag } from 'lucide-react';

interface Y2KMyFavesProps {
  isInWishlist?: (name: string, brand: string) => boolean;
  onToggleWishlist?: (
    product: {
      name: string;
      brand: string;
      price: string;
      verdict: string;
      articleTitle?: string;
    },
    e?: React.MouseEvent
  ) => void;
}

export const Y2KMyFaves: React.FC<Y2KMyFavesProps> = ({
  isInWishlist,
  onToggleWishlist,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filtered = filterCategory === 'All'
    ? MY_FAVES
    : MY_FAVES.filter((p) => p.category === filterCategory);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-10 xl:px-16 w-full max-w-[1720px] mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9D5FF] text-[#6B21A8] font-bubbly text-xs font-bold border-2 border-purple-400 shadow-sticker-sm">
          <span>💖 100% UNFILTERED REVIEWS</span>
        </div>
        <h2 className="font-bubbly text-3xl sm:text-4xl font-bold text-[#FF1493]">
          My Current Holy Grails & Faves 💄
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-body max-w-xl mx-auto">
          The exact products that have survived multiple tote bag clean-outs, gym classes, and 12-hour school days. Zero sponsored fluff!
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['All', 'Lips', 'Cheeks', 'Eyes', 'Base'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bubbly font-bold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#FF2A85] text-white shadow-sticker-sm scale-105'
                  : 'bg-white text-stone-700 hover:bg-pink-100 border border-pink-200'
              }`}
            >
              {cat === 'All' ? 'All Faves 🛍️' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl border-3 border-[#FF2A85] p-5 shadow-sticker hover:translate-y-[-3px] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Visual */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50 border-2 border-pink-200 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />

                {/* Badge Sticker */}
                <div className="absolute top-2.5 left-2.5 bg-[#FF2A85] text-white text-[11px] font-bubbly font-bold px-3 py-1 rounded-full shadow-sm">
                  {item.badge}
                </div>

                {/* Heart Wishlist Button */}
                {onToggleWishlist && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(
                        {
                          name: item.name,
                          brand: item.brand,
                          price: item.price,
                          verdict: item.description,
                          articleTitle: 'Holy Grail Stash',
                        },
                        e
                      );
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer shadow-xs ${
                      isInWishlist && isInWishlist(item.name, item.brand)
                        ? 'bg-[#FF2A85] text-white border-white'
                        : 'bg-white/90 text-stone-700 border-pink-200 hover:text-[#FF1493]'
                    }`}
                    title={
                      isInWishlist && isInWishlist(item.name, item.brand)
                        ? 'In your Glam Bag! Click to remove'
                        : 'Add to Glam Wishlist 💖'
                    }
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isInWishlist && isInWishlist(item.name, item.brand)
                          ? 'fill-white text-white'
                          : 'text-[#FF2A85]'
                      }`}
                    />
                  </button>
                )}

                {/* Price Pill */}
                <div className="absolute bottom-2.5 right-2.5 bg-white text-[#2D1226] text-xs font-bold px-2.5 py-1 rounded-full border border-pink-300 shadow-sm">
                  {item.price}
                </div>
              </div>

              {/* Title & Brand */}
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block font-body">
                {item.brand}
              </span>
              <h3 className="font-bubbly text-lg font-bold text-[#2D1226] mt-0.5 leading-snug">
                {item.name}
              </h3>

              {/* Heart Rating */}
              <div className="flex items-center gap-1 my-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 fill-[#FF2A85] text-[#FF2A85]" />
                ))}
                <span className="text-xs font-bold text-stone-500 ml-1">
                  ({item.rating}/5 Hearts)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 font-body leading-relaxed mt-2">
                {item.description}
              </p>

              {/* Why I love it */}
              <div className="bg-[#FFF0F5] border border-pink-200 rounded-2xl p-3 mt-3 text-xs text-[#FF1493] font-body leading-relaxed">
                <strong>Why Allie’s Obsessed:</strong> {item.whyILoveIt}
              </div>

              {/* Dupe Alert if exists */}
              {item.dupeAlert && (
                <div className="bg-[#FEF08A]/70 border border-yellow-400 rounded-2xl p-2.5 mt-2 text-[11px] font-bold text-[#854D0E] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{item.dupeAlert}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-body">Tested for 6+ months</span>
              <span className="text-[#FF2A85] font-bubbly font-bold flex items-center gap-1">
                <span>Must Have 💋</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
