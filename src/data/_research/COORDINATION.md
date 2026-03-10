# Coordination Multi-Agent - Dofus Retro Encyclopedia

## Objectif
Enrichir massivement les bases de données de l'encyclopédie Dofus Rétro 1.29.

## Sources prioritaires
- https://www.dotrofus.com/donjons — Donjons (guides détaillés)
- https://guidedofus.com/donjons/ — Donjons (stratégies)
- https://dofusretro.jeuxonline.info/article/14803/quetes-incarnam — Quêtes Incarnam
- https://www.gamosaurus.com/jeux/dofus-retro — Quêtes
- https://www.millenium.org/games/game-1023/guides — Guides généraux
- https://www.dofux.org/ — Craft, donjons, familiers
- retro.dofuscreator.com — Équipements

## Fichiers cibles
- equipment.ts → 300+ items (actuellement 164)
- dungeons.ts → 50+ donjons (actuellement 25)
- quests.ts → 100+ quêtes (actuellement 30)
- classes.ts → toutes les classes complètes (12)
- drops.ts → zones de farm détaillées
- achievements.ts → succès complets
- professions.ts → métiers complets

## TypeScript Types (à respecter)
```ts
// Equipment - importer depuis '@/types'
interface Equipment {
  id: string; name: string; slug: string; level: number;
  type: EquipmentType; category: 'equipment' | 'weapon';
  description?: string; imageUrl?: string; stats: ItemStats;
  conditions?: string; setId?: string; setName?: string;
  recipe?: CraftIngredient[]; dropMonsters?: DropSource[];
}
type EquipmentType = 'amulette'|'anneau'|'bottes'|'cape'|'ceinture'|'chapeau'|'bouclier'|'dofus'|'familier'|'sac-a-dos'
type WeaponType = 'arc'|'baguette'|'baton'|'dague'|'epee'|'faux'|'hache'|'marteau'|'pelle'|'pioche'
// Pour weapons, utiliser 'as EquipmentType' sur le type

// Dungeon
interface Dungeon {
  id: string; name: string; slug: string; level: number; zone: string; subZone: string;
  description: string; boss: Monster; monsters: Monster[];
  strategy: DungeonStrategy; rewards: string[];
}
interface DungeonStrategy {
  recommendedLevel: number; recommendedTeamSize: number; composition: string;
  steps: string[]; tips: string[];
  difficulty: 'facile'|'moyen'|'difficile'|'très difficile';
}

// Quest
interface Quest {
  id: string; name: string; slug: string; level: number;
  category: 'principale'|'secondaire'|'classe'|'alignement'|'temporis';
  zone?: string; description: string;
  objectives: QuestObjective[]; rewards: QuestReward;
  prerequisites?: string[]; guide?: QuestGuide;
}
```

## Statut des agents
- [ ] Agent Equipment (retro.dofuscreator.com + dofux.org)
- [ ] Agent Donjons (dotrofus.com + guidedofus.com)
- [ ] Agent Quêtes (jeuxonline.info + gamosaurus + millenium)
- [ ] Agent Classes/Drops/Succès/Métiers
