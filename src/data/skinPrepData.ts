import { SkinPrepStep, UserProfileData } from '../types/skinPrep';

export const SKIN_PREP_STEPS: SkinPrepStep[] = [
  {
    id: 'step-1-cleanse',
    stepNumber: 1,
    title: 'Gentle Cloud Splash & Micellar Purify',
    durationSeconds: 60, // 1 min (0:00 - 1:00)
    category: 'cleanse',
    emoji: '☁️',
    purpose: 'Clear away overnight sebum, pillow dust, and dead surface cells so base makeup glides on without clinging to dry patches.',
    instructions: 'Rinse with lukewarm water or swipe a saturated cotton round of hydrating micellar water across cheeks, nose bridge, and forehead.',
    proTip: 'Never rub roughly with a rough towel! Gently press a clean microfiber face cloth to leave skin 10% damp for your toner.',
    keyIngredient: 'Rosewater & Micellar Micelles',
    recommendedProductType: 'No-rinse Hydrating Cleansing Water',
  },
  {
    id: 'step-2-toner-roller',
    stepNumber: 2,
    title: 'Hydrating Milky Essence & Ice Roller De-puff',
    durationSeconds: 120, // 2 mins (1:00 - 3:00)
    category: 'tone',
    emoji: '🧊',
    purpose: 'Rebalance skin pH, flood thirsty stratum corneum, and soothe early morning facial puffiness around the eyes and jawline.',
    instructions: 'Pat 2 generous splashes of milky toner into skin using your fingertips. Grab your chilled stainless steel roller and glide upwards along jaw and under cheekbones.',
    proTip: 'Keep your face roller in the mini fridge for 10 minutes before doing your skincare—the cold instantly shrinks under-eye baggage.',
    keyIngredient: 'Oat Milk & Ceramide NP',
    recommendedProductType: 'Milky Alcohol-Free Toner Essence',
  },
  {
    id: 'step-3-serum-drench',
    stepNumber: 3,
    title: 'Hyaluronic Water Bounce & Glow Serum',
    durationSeconds: 150, // 2.5 mins (3:00 - 5:30)
    category: 'serum',
    emoji: '💧',
    purpose: 'Deliver multi-molecular weight moisture deep into skin layers for bouncy, glass-skin plumpness.',
    instructions: 'Apply 3 drops across forehead and cheeks. Gently press with warm palms. Allow the full 2.5 minutes for the serum to settle completely so foundation will never peel or pill.',
    proTip: 'If your serum stays tacky, wait the full countdown! Applying foundation over wet serum is the #1 cause of patchy makeup separation.',
    keyIngredient: 'Multi-Weight Hyaluronic Acid & Niacinamide',
    recommendedProductType: 'Plumping Water-Glow Serum',
  },
  {
    id: 'step-4-barrier-cream',
    stepNumber: 4,
    title: 'Ceramide Jelly Glaze & Lymphatic Sculpt',
    durationSeconds: 180, // 3 mins (5:30 - 8:30)
    category: 'moisturize',
    emoji: '🍓',
    purpose: 'Lock in active hydration with a flexible lipid barrier that mimics the natural dewy sheen of healthy teen skin.',
    instructions: 'Smooth a nickel-sized amount of lightweight gel-cream over face and neck. Use gentle upward knuckles to massage cheek apples and sculpt eyebrows.',
    proTip: 'Target the dry creases around the nose wings and smile lines—this prevents powder and concealer from settling into fine lines later.',
    keyIngredient: 'Strawberry Seed Oil & Ceramides 1, 3, 6-II',
    recommendedProductType: 'Bouncy Gel-Cream Cloud Moisturizer',
  },
  {
    id: 'step-5-spf-lip-seal',
    stepNumber: 5,
    title: 'Dewy Invisible SPF 50 & Vanilla Lip Butter',
    durationSeconds: 90, // 1.5 mins (8:30 - 10:00)
    category: 'protect',
    emoji: '☀️',
    purpose: 'Protect youthful collagen from UV rays without white cast, and prep lips with a thick peptide mask for juicy gloss application.',
    instructions: 'Blend a two-finger ribbon of broad-spectrum SPF 50 down face, ears, and neck. Slather a rich coating of lip peptide butter to soak in while you do eye makeup.',
    proTip: 'Let your sunscreen form its protective film for the full 90 seconds before touching primer or foundation brush to face. Your base will stay 10x longer!',
    keyIngredient: 'Invisible Chemical Filters & Shea Peptide Butter',
    recommendedProductType: 'Clear Watery Sun Serum + Peptide Lip Treatment',
  },
];

export const TOTAL_SKIN_PREP_SECONDS = SKIN_PREP_STEPS.reduce(
  (acc, step) => acc + step.durationSeconds,
  0
); // Exactly 600 seconds = 10 minutes

export const DEFAULT_USER_PROFILE: UserProfileData = {
  displayName: 'Glow Bestie Allie',
  handle: '@glamvanity',
  avatarEmoji: '💖',
  skinType: 'Dewy/Normal',
  glowGoal: 'Juicy Glazed Donut Skin',
  enableGlowUpTimer: true,
  dockFloatingTimer: false,
  totalPrepSessionsCompleted: 7,
  streakDays: 4,
  lastCompletedDate: '2026-10-13',
};
