export interface SkinPrepStep {
  id: string;
  stepNumber: number;
  title: string;
  durationSeconds: number; // Duration of this specific step in seconds
  category: 'cleanse' | 'tone' | 'serum' | 'moisturize' | 'protect';
  emoji: string;
  purpose: string;
  instructions: string;
  proTip: string;
  keyIngredient: string;
  recommendedProductType: string;
}

export type SkinType = 
  | 'Dewy/Normal' 
  | 'Combination' 
  | 'Rosy/Sensitive' 
  | 'Glass/Oily' 
  | 'Dry/Glazed';

export interface UserProfileData {
  displayName: string;
  handle: string;
  avatarEmoji: string;
  skinType: SkinType;
  glowGoal: string;
  enableGlowUpTimer: boolean;
  dockFloatingTimer: boolean;
  totalPrepSessionsCompleted: number;
  streakDays: number;
  lastCompletedDate?: string;
}
