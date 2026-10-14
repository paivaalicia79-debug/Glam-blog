export type RoutineType = 'makeup' | 'skincare' | 'both';

export interface BeautyDayLog {
  date: string; // 'YYYY-MM-DD'
  routineType: RoutineType;
  lookName: string;
  emoji: string;
  rating: number; // 1-5 hearts
  notes?: string;
  productsUsed?: string[];
  loggedAt: string;
}

export type BeautyLogsMap = Record<string, BeautyDayLog>;

export interface LookPreset {
  id: string;
  name: string;
  emoji: string;
  type: RoutineType;
  vibe: string;
  badgeColor: string;
}
