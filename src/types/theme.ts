export type ColorTheme = 'strawberry' | 'blueberry' | 'grape';

export interface ThemeOption {
  id: ColorTheme;
  name: string;
  flavor: string;
  emoji: string;
  primaryColor: string;
  secondaryColor: string;
  bgDotColor: string;
  activeBadge: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'strawberry',
    name: 'Strawberry Pink',
    flavor: 'Sweet & Juicy Y2K 🍓',
    emoji: '🍓',
    primaryColor: '#FF2A85',
    secondaryColor: '#FF69B4',
    bgDotColor: '#FFB6D9',
    activeBadge: 'bg-[#FF2A85] text-white',
  },
  {
    id: 'blueberry',
    name: 'Blueberry Blue',
    flavor: 'Icy Baby Blue Vibes 🫐',
    emoji: '🫐',
    primaryColor: '#0284C7',
    secondaryColor: '#38BDF8',
    bgDotColor: '#BAE6FD',
    activeBadge: 'bg-[#0284C7] text-white',
  },
  {
    id: 'grape',
    name: 'Grape Purple',
    flavor: 'Electric Velvet Shimmer 🍇',
    emoji: '🍇',
    primaryColor: '#9333EA',
    secondaryColor: '#C084FC',
    bgDotColor: '#E9D5FF',
    activeBadge: 'bg-[#9333EA] text-white',
  },
];
