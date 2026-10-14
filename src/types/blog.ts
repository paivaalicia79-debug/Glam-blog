export interface ProductFave {
  id: string;
  name: string;
  brand: string;
  category: 'Lips' | 'Cheeks' | 'Base' | 'Eyes' | 'Skincare';
  rating: number; // out of 5
  badge: 'OBSESSED 💖' | 'Holy Grail! ✨' | '10/10 Repurchase' | 'Budget Queen 💸';
  price: string;
  description: string;
  whyILoveIt: string;
  dupeAlert?: string;
  image: string;
}

export interface MakeupLook {
  id: string;
  title: string;
  vibe: string;
  tag: string;
  difficulty: 'Super Easy 🍰' | 'Medium 🎀' | 'Party Mode ✨';
  time: string;
  description: string;
  productsUsed: string[];
  image: string;
  stepGuide: string[];
}

export interface MakeupTip {
  id: string;
  category: 'Base' | 'Blush' | 'Eyes' | 'Lips';
  title: string;
  emoji: string;
  quickHack: string;
  fullTip: string;
  commonMistake: string;
}

export interface GRWMStep {
  stepNumber: number;
  title: string;
  time: string;
  product: string;
  instructions: string;
  allieComment: string;
  icon: string;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  likes: number;
  avatarEmoji?: string;
}

export type ArticleMood = 'Happy' | 'Dreamy' | 'Bold' | 'Chill';

export interface ProductMention {
  name: string;
  brand: string;
  verdict: string;
  price: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  verdict: string;
  articleId?: string;
  articleTitle?: string;
  addedAt?: string;
}

export interface ArticleInternalLink {
  title: string;
  slug: string;
  blurb: string;
}

export interface ArticleQuestionSection {
  questionH2: string;
  directAnswer: string;
  details?: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Lip Gossip' | 'Cheek Tint' | 'Base & Glow' | 'Viral Trends' | 'Makeup Bag' | 'Disasters & Care';
  mood: ArticleMood;
  readTime: string;
  publishedAt: string;
  image: string;
  imageAlt?: string;
  vibeTag: string;
  likesCount: number;
  comments: Comment[];
  allieRating?: string;
  worthTheHype?: '100% YES! 💖' | 'Save your money 🚫' | 'Cute but overpriced 💸';
  paragraphs: string[];
  productMentions: ProductMention[];
  quickTakeaway: string;
  // SEO Requirements
  seoTitle?: string;
  metaDescription?: string;
  mainKeyword?: string;
  relatedKeywords?: string[];
  sections?: ArticleQuestionSection[];
  internalLinks?: ArticleInternalLink[];
}

