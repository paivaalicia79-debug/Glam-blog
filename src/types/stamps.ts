export type StampId =
  | 'slay_approved'
  | 'holy_grail'
  | 'juicy_kiss'
  | 'strawberry_crush'
  | 'coquette_cutie'
  | 'dupe_queen'
  | 'glazed_donut';

export interface StampDefinition {
  id: StampId;
  name: string;
  badgeText: string;
  emoji: string;
  tagline: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  shadowColor: string;
  inkColor: string;
  rotation: string;
}

export interface UserStamp {
  stampId: StampId;
  stampedAt: string;
}

export type ArticleStampsMap = Record<string, UserStamp>;

export const Y2K_STAMPS: StampDefinition[] = [
  {
    id: 'diva_approved',
    name: 'Div Approved',
    badgeText: 'DIVA ★ APPROVED',
    emoji: '💖',
    tagline: 'Allie’s ultimate 10/10 seal!',
    bgGradient: 'from-[#FF1493] via-[#FF2A85] to-[#FF69B4]',
    borderColor: '#9D174D',
    textColor: '#FFFFFF',
    shadowColor: '#831843',
    inkColor: '#FF2A85',
    rotation: '-6deg',
  },
  {
    id: 'holy_grail',
    name: 'Holy Grail',
    badgeText: 'HOLY ★ GRAIL',
    emoji: '⭐',
    tagline: 'Cannot live without this product!',
    bgGradient: 'from-[#F59E0B] via-[#FBBF24] to-[#FDE047]',
    borderColor: '#78350F',
    textColor: '#78350F',
    shadowColor: '#B45309',
    inkColor: '#F59E0B',
    rotation: '5deg',
  },
  {
    id: 'juicy_kiss',
    name: 'Juicy Kiss',
    badgeText: 'JUICY 💋 KISS',
    emoji: '💋',
    tagline: 'High shine, zero sticky vibes!',
    bgGradient: 'from-[#E11D48] via-[#F43F5E] to-[#FB7185]',
    borderColor: '#881337',
    textColor: '#FFFFFF',
    shadowColor: '#4C0519',
    inkColor: '#E11D48',
    rotation: '-4deg',
  },
  {
    id: 'strawberry_crush',
    name: 'Strawberry Blush',
    badgeText: 'STRAWBERRY 🍓 CRUSH',
    emoji: '🍓',
    tagline: 'Dewiest flush ever!',
    bgGradient: 'from-[#EC4899] via-[#F472B6] to-[#FBCFE8]',
    borderColor: '#831843',
    textColor: '#831843',
    shadowColor: '#9D174D',
    inkColor: '#EC4899',
    rotation: '6deg',
  },
  {
    id: 'coquette_cutie',
    name: 'Coquette Cutie',
    badgeText: 'COQUETTE 🎀 CUTIE',
    emoji: '🎀',
    tagline: 'Irresistibly adorable vanity staple!',
    bgGradient: 'from-[#C084FC] via-[#D8B4FE] to-[#F3E8FF]',
    borderColor: '#581C87',
    textColor: '#581C87',
    shadowColor: '#6B21A8',
    inkColor: '#9333EA',
    rotation: '-5deg',
  },
  {
    id: 'dupe_queen',
    name: 'Dupe Queen',
    badgeText: 'DUPE ★ OF THE YEAR',
    emoji: '👑',
    tagline: 'Saves bank while looking luxury!',
    bgGradient: 'from-[#06B6D4] via-[#22D3EE] to-[#67E8F9]',
    borderColor: '#164E63',
    textColor: '#164E63',
    shadowColor: '#0E7490',
    inkColor: '#0891B2',
    rotation: '7deg',
  },
  {
    id: 'glazed_donut',
    name: 'Glazed Donut',
    badgeText: 'GLAZED ✨ DEWY',
    emoji: '✨',
    tagline: 'Glass skin perfection achieved!',
    bgGradient: 'from-[#38BDF8] via-[#818CF8] to-[#C084FC]',
    borderColor: '#1E1B4B',
    textColor: '#FFFFFF',
    shadowColor: '#312E81',
    inkColor: '#6366F1',
    rotation: '-8deg',
  },
];
