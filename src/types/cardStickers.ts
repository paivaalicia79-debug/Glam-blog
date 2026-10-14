export type CardStickerId = 'flip-phone' | 'butterfly' | 'glitter-heart' | 'chrome-star';

export type StickerCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface CardStickerItem {
  id: CardStickerId;
  name: string;
  emoji: string;
  image: string;
  tagline: string;
}

export interface PlacedSticker {
  stickerId: CardStickerId;
  position: StickerCorner;
  rotation?: number; // deg
}

export type ArticleDecorationsMap = Record<string, PlacedSticker[]>; // articleId -> array of placed stickers
