import { CardStickerItem, CardStickerId } from '../types/cardStickers';

export const Y2K_CARD_STICKERS: CardStickerItem[] = [
  {
    id: 'flip-phone',
    name: 'Bedazzled Flip Phone',
    emoji: '📱',
    image: '/src/assets/images/y2k_flip_phone_1791997840149.jpg',
    tagline: 'Hot pink rhinestones & beaded charms',
  },
  {
    id: 'butterfly',
    name: 'Holographic Butterfly',
    emoji: '🦋',
    image: '/src/assets/images/y2k_butterfly_sticker_1791997858670.jpg',
    tagline: 'Iridescent baby blue & lavender sheen',
  },
  {
    id: 'glitter-heart',
    name: 'Glitter Gem Heart',
    emoji: '💖',
    image: '/src/assets/images/y2k_glitter_heart_1791997877815.jpg',
    tagline: 'Puffy bubblegum resin & diamonds',
  },
  {
    id: 'chrome-star',
    name: 'Cyber Chrome Star',
    emoji: '⭐',
    image: '/src/assets/images/y2k_chrome_star_1791997903984.jpg',
    tagline: 'Holographic millennium starburst',
  },
];

export const DEFAULT_DEMO_DECORATIONS: Record<string, { stickerId: CardStickerId; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; rotation: number }[]> = {
  'top-5-glossy-lip-oils': [
    { stickerId: 'glitter-heart', position: 'top-right', rotation: 12 },
    { stickerId: 'flip-phone', position: 'bottom-left', rotation: -10 },
  ],
  'strawberry-girl-blush-routine': [
    { stickerId: 'butterfly', position: 'top-right', rotation: -14 },
  ],
  'drugstore-vs-high-end-blush': [
    { stickerId: 'chrome-star', position: 'top-left', rotation: 15 },
  ],
  'frosted-baby-blue-eyeshadow-y2k': [
    { stickerId: 'butterfly', position: 'bottom-right', rotation: 8 },
    { stickerId: 'chrome-star', position: 'top-left', rotation: -12 },
  ],
  '90s-brown-lip-combo': [
    { stickerId: 'flip-phone', position: 'top-right', rotation: 14 },
  ],
};
