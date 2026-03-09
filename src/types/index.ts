// ===== EQUIPMENT & ITEMS =====
export interface ItemStats {
  vitalite?: number;
  pa?: number;
  pm?: number;
  force?: number;
  intelligence?: number;
  chance?: number;
  agilite?: number;
  sagesse?: number;
  puissance?: number;
  dommages?: number;
  dommagesTousCritiques?: number;
  soins?: number;
  invocations?: number;
  prospection?: number;
  pods?: number;
  initiative?: number;
  esquivePA?: number;
  esquivePM?: number;
  retraitPA?: number;
  retraitPM?: number;
  resistanceNeutre?: number;
  resistanceTerre?: number;
  resistanceFeu?: number;
  resistanceEau?: number;
  resistanceAir?: number;
  resistanceNeutrePercent?: number;
  resistanceTerrePercent?: number;
  resistanceFeuPercent?: number;
  resistanceEauPercent?: number;
  resistanceAirPercent?: number;
  portee?: number;
  critiques?: number;
  [key: string]: number | undefined;
}

export interface Equipment {
  id: string;
  name: string;
  slug: string;
  level: number;
  type: EquipmentType;
  category: 'equipment' | 'weapon';
  description?: string;
  imageUrl?: string;
  stats: ItemStats;
  conditions?: string;
  setId?: string;
  setName?: string;
  recipe?: CraftIngredient[];
  dropMonsters?: DropSource[];
}

export type EquipmentType =
  | 'amulette' | 'anneau' | 'bottes' | 'cape' | 'ceinture'
  | 'chapeau' | 'bouclier' | 'dofus' | 'familier' | 'sac-a-dos';

export type WeaponType =
  | 'arc' | 'baguette' | 'baton' | 'dague' | 'epee'
  | 'faux' | 'hache' | 'marteau' | 'pelle' | 'pioche';

export interface CraftIngredient {
  itemId: string;
  itemName: string;
  quantity: number;
}

export interface DropSource {
  monsterId: string;
  monsterName: string;
  zone: string;
  dropRate: number;
}

// ===== DUNGEONS =====
export interface Dungeon {
  id: string;
  name: string;
  slug: string;
  level: number;
  zone: string;
  subZone: string;
  imageUrl?: string;
  description: string;
  boss: Monster;
  monsters: Monster[];
  strategy: DungeonStrategy;
  rewards: string[];
}

export interface Monster {
  id: string;
  name: string;
  level: number;
  hp: number;
  pa: number;
  pm: number;
  resistances?: {
    neutre: number;
    terre: number;
    feu: number;
    eau: number;
    air: number;
  };
  spells?: string[];
  imageUrl?: string;
}

export interface DungeonStrategy {
  recommendedLevel: number;
  recommendedTeamSize: number;
  composition: string;
  steps: string[];
  tips: string[];
  difficulty: 'facile' | 'moyen' | 'difficile' | 'très difficile';
}

// ===== QUESTS =====
export interface Quest {
  id: string;
  name: string;
  slug: string;
  level: number;
  category: QuestCategory;
  zone?: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  prerequisites?: string[];
  guide?: QuestGuide;
}

export type QuestCategory = 'principale' | 'secondaire' | 'classe' | 'alignement' | 'temporis';

export interface QuestObjective {
  description: string;
  type: 'kill' | 'collect' | 'talk' | 'explore' | 'craft';
  target?: string;
  quantity?: number;
  location?: string;
}

export interface QuestReward {
  xp?: number;
  kamas?: number;
  items?: string[];
  emotes?: string[];
  spells?: string[];
}

export interface QuestGuide {
  steps: GuideStep[];
  tips: string[];
  estimatedTime?: string;
}

export interface GuideStep {
  order: number;
  description: string;
  location?: string;
  npc?: string;
  coordinates?: { x: number; y: number };
  imageUrl?: string;
}

// ===== ACHIEVEMENTS =====
export interface Achievement {
  id: string;
  name: string;
  slug: string;
  category: AchievementCategory;
  description: string;
  objectives: string[];
  reward: AchievementReward;
  points: number;
  guide?: AchievementGuide;
  releaseDate: string;
}

export type AchievementCategory =
  | 'exploration' | 'combat' | 'quete' | 'donjon'
  | 'metier' | 'collection' | 'social' | 'divers';

export interface AchievementReward {
  title?: string;
  ornament?: string;
  kamas?: number;
  items?: string[];
}

export interface AchievementGuide {
  difficulty: 'facile' | 'moyen' | 'difficile' | 'très difficile';
  estimatedTime: string;
  steps: string[];
  tips: string[];
}

// ===== PROFESSIONS =====
export interface Profession {
  id: string;
  name: string;
  slug: string;
  type: ProfessionType;
  description: string;
  imageUrl?: string;
  workshops: string[];
  levelingGuide: LevelingGuide;
  recipes: ProfessionRecipe[];
}

export type ProfessionType =
  | 'recolte' | 'artisanat';

export interface LevelingGuide {
  sections: LevelingSection[];
  tips: string[];
  estimatedTime: string;
}

export interface LevelingSection {
  levelRange: string;
  title: string;
  description: string;
  recipes: string[];
  location?: string;
}

export interface ProfessionRecipe {
  name: string;
  level: number;
  ingredients: CraftIngredient[];
  result: string;
  xpGain: number;
}

// ===== CLASSES =====
export interface GameClass {
  id: string;
  name: string;
  slug: string;
  description: string;
  role: ClassRole[];
  element: string[];
  imageUrl?: string;
  spells: ClassSpell[];
  characteristics: ClassCharacteristics;
  guide?: ClassGuide;
}

export type ClassRole = 'dps' | 'tank' | 'support' | 'heal' | 'placement' | 'entrave';

export interface ClassSpell {
  name: string;
  level: number;
  description: string;
  element: string;
  damage?: string;
  range?: string;
  pa: number;
  cooldown?: number;
  imageUrl?: string;
}

export interface ClassCharacteristics {
  hp: string;
  mainStats: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface ClassGuide {
  overview: string;
  statDistribution: string;
  spellOrder: string[];
  equipment: string[];
  playstyle: string;
}

// ===== DROPS =====
export interface DropZone {
  id: string;
  name: string;
  slug: string;
  subArea: string;
  levelRange: string;
  monsters: DropMonster[];
  resources: DropResource[];
  coordinates?: string;
}

export interface DropMonster {
  name: string;
  level: number;
  drops: DropItem[];
}

export interface DropItem {
  itemName: string;
  itemId?: string;
  dropRate: number;
  conditions?: string;
}

export interface DropResource {
  name: string;
  type: string;
  profession?: string;
}

// ===== SEARCH =====
export interface SearchResult {
  id: string;
  type: 'equipment' | 'weapon' | 'dungeon' | 'quest' | 'achievement' | 'profession' | 'class' | 'drop';
  name: string;
  slug: string;
  level?: number;
  description?: string;
  category?: string;
}
