import React from 'react';
import { X, Trash2, ArrowRight, Bookmark, Sparkles } from 'lucide-react';
import { BlogArticle } from '../types/blog';
import { ArticleStampsMap } from '../types/stamps';
import { ArticleStampBadge } from './ArticleStampBadge';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: BlogArticle[];
  onRemove: (id: string) => void;
  onOpenArticle: (article: BlogArticle) => void;
  articleStamps?: ArticleStampsMap;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onRemove,
  onOpenArticle,
  articleStamps = {},
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF0F5] border-l-4 border-[#FF2A85] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b-2 border-pink-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👛</span>
              <div>
                <h3 className="font-bubbly text-xl font-bold text-[#FF1493]">
                  My Saved Posts ({savedArticles.length})
                </h3>
                <span className="text-[11px] font-body text-stone-500">
                  Your personal vanity stash
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-pink-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedArticles.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-4xl">🎀</div>
                <h4 className="font-bubbly text-lg text-stone-800">Your stash is empty!</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto font-body">
                  Tap the bookmark icon on any diary entry to save it to your beauty pouch!
                </p>
              </div>
            ) : (
              savedArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white border-2 border-pink-300 rounded-2xl p-3.5 flex gap-3 shadow-sticker-sm hover:scale-102 transition-transform"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-18 h-18 object-cover rounded-xl shrink-0 border border-pink-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-[#A855F7] block">
                          {art.category}
                        </span>
                        {articleStamps[art.id] && (
                          <ArticleStampBadge
                            stampId={articleStamps[art.id].stampId}
                            size="sm"
                          />
                        )}
                      </div>
                      <h4 
                        onClick={() => {
                          onOpenArticle(art);
                          onClose();
                        }}
                        className="font-bubbly text-xs font-bold text-[#2D1226] hover:text-[#FF1493] cursor-pointer line-clamp-2 mt-0.5"
                      >
                        {art.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          onOpenArticle(art);
                          onClose();
                        }}
                        className="text-[11px] font-bubbly font-bold text-[#FF1493] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open 💄</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onRemove(art.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
