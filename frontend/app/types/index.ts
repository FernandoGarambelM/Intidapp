// Tipos para el usuario
export interface User {
  walletAddress: string;
  shortAddress: string;
  totalPoints: number;
  completedMissions: string[];
  purchasedRewards: string[];
  createdAt: Date;
  lastActivity: Date;
}

// Tipos para las misiones
export interface Mission {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  points: number;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  estimatedTime: number; // en minutos
  prerequisites: string[]; // IDs de misiones requeridas
  isCompleted: boolean;
  isLocked: boolean;
  steps: MissionStep[];
  rewards: MissionReward[];
}

export interface MissionStep {
  id: string;
  title: string;
  description: string;
  type: StepType;
  isCompleted: boolean;
  order: number;
}

export interface MissionReward {
  type: 'points' | 'nft' | 'badge' | 'unlock';
  value: number | string;
  description: string;
}

export enum MissionCategory {
  BASICS = 'basics',
  DEFI = 'defi',
  NFTS = 'nfts',
  SECURITY = 'security',
  ADVANCED = 'advanced',
  STARKNET = 'starknet'
}

export enum MissionDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum StepType {
  READ = 'read',
  WATCH = 'watch',
  INTERACT = 'interact',
  QUIZ = 'quiz',
  TRANSACTION = 'transaction'
}

// Tipos para la tienda
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number; // en puntos
  category: ShopCategory;
  rarity: ItemRarity;
  isAvailable: boolean;
  isPurchased: boolean;
  requirements: ItemRequirement[];
  image?: string;
  metadata?: Record<string, any>;
}

export interface ItemRequirement {
  type: 'points' | 'missions' | 'level';
  value: number | string[];
  description: string;
}

export enum ShopCategory {
  CERTIFICATES = 'certificates',
  NFTS = 'nfts',
  AVATARS = 'avatars',
  PREMIUM = 'premium',
  COLLECTIBLES = 'collectibles'
}

export enum ItemRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

// Tipos para estadísticas
export interface UserStats {
  totalMissions: number;
  completedMissions: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: MissionCategory;
  completionRate: number;
  averageSessionTime: number;
}

// Tipos para respuestas de API (preparado para backend)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}