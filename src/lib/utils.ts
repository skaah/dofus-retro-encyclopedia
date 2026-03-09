import { SearchResult } from '@/types';
import { equipment, weapons } from '@/data/equipment';
import { dungeons } from '@/data/dungeons';
import { quests } from '@/data/quests';
import { achievements } from '@/data/achievements';
import { professions } from '@/data/professions';
import { classes } from '@/data/classes';
import { dropZones } from '@/data/drops';

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  equipment.forEach(item => {
    if (item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)) {
      results.push({
        id: item.id,
        type: 'equipment',
        name: item.name,
        slug: item.slug,
        level: item.level,
        description: item.description,
        category: item.type,
      });
    }
  });

  weapons.forEach(item => {
    if (item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)) {
      results.push({
        id: item.id,
        type: 'weapon',
        name: item.name,
        slug: item.slug,
        level: item.level,
        description: item.description,
        category: item.type,
      });
    }
  });

  dungeons.forEach(d => {
    if (d.name.toLowerCase().includes(q) || d.zone.toLowerCase().includes(q)) {
      results.push({
        id: d.id,
        type: 'dungeon',
        name: d.name,
        slug: d.slug,
        level: d.level,
        description: d.description,
        category: d.zone,
      });
    }
  });

  quests.forEach(quest => {
    if (quest.name.toLowerCase().includes(q) || quest.category.toLowerCase().includes(q)) {
      results.push({
        id: quest.id,
        type: 'quest',
        name: quest.name,
        slug: quest.slug,
        level: quest.level,
        description: quest.description,
        category: quest.category,
      });
    }
  });

  achievements.forEach(a => {
    if (a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)) {
      results.push({
        id: a.id,
        type: 'achievement',
        name: a.name,
        slug: a.slug,
        description: a.description,
        category: a.category,
      });
    }
  });

  professions.forEach(p => {
    if (p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)) {
      results.push({
        id: p.id,
        type: 'profession',
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.type,
      });
    }
  });

  classes.forEach(c => {
    if (c.name.toLowerCase().includes(q) || c.role.some(r => r.includes(q))) {
      results.push({
        id: c.id,
        type: 'class',
        name: c.name,
        slug: c.slug,
        description: c.description,
        category: c.role.join(', '),
      });
    }
  });

  dropZones.forEach(dz => {
    if (dz.name.toLowerCase().includes(q) || dz.monsters.some(m => m.name.toLowerCase().includes(q))) {
      results.push({
        id: dz.id,
        type: 'drop',
        name: dz.name,
        slug: dz.slug,
        description: `Zone de farm niveau ${dz.levelRange}`,
        category: dz.subArea,
      });
    }
  });

  return results.slice(0, 20);
}

export function getStatLabel(key: string): string {
  const labels: Record<string, string> = {
    vitalite: 'Vitalité',
    pa: 'PA',
    pm: 'PM',
    force: 'Force',
    intelligence: 'Intelligence',
    chance: 'Chance',
    agilite: 'Agilité',
    sagesse: 'Sagesse',
    puissance: 'Puissance',
    dommages: 'Dommages',
    dommagesTousCritiques: 'Dommages Critiques',
    soins: 'Soins',
    invocations: 'Invocations',
    prospection: 'Prospection',
    pods: 'Pods',
    initiative: 'Initiative',
    esquivePA: 'Esquive PA',
    esquivePM: 'Esquive PM',
    retraitPA: 'Retrait PA',
    retraitPM: 'Retrait PM',
    resistanceNeutre: 'Résistance Neutre',
    resistanceTerre: 'Résistance Terre',
    resistanceFeu: 'Résistance Feu',
    resistanceEau: 'Résistance Eau',
    resistanceAir: 'Résistance Air',
    resistanceNeutrePercent: 'Résistance Neutre %',
    resistanceTerrePercent: 'Résistance Terre %',
    resistanceFeuPercent: 'Résistance Feu %',
    resistanceEauPercent: 'Résistance Eau %',
    resistanceAirPercent: 'Résistance Air %',
    portee: 'Portée',
    critiques: 'Critiques',
  };
  return labels[key] || key;
}

export function getStatColor(key: string): string {
  const colors: Record<string, string> = {
    vitalite: 'text-red-400',
    pa: 'text-blue-400',
    pm: 'text-green-400',
    force: 'text-amber-600',
    intelligence: 'text-red-500',
    chance: 'text-cyan-400',
    agilite: 'text-emerald-400',
    sagesse: 'text-blue-300',
    puissance: 'text-orange-400',
    dommages: 'text-yellow-400',
    soins: 'text-pink-400',
    prospection: 'text-yellow-300',
    pods: 'text-gray-400',
    initiative: 'text-purple-400',
    portee: 'text-teal-400',
    critiques: 'text-orange-500',
  };
  return colors[key] || 'text-gray-300';
}

export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    equipment: 'Équipement',
    weapon: 'Arme',
    dungeon: 'Donjon',
    quest: 'Quête',
    achievement: 'Succès',
    profession: 'Métier',
    class: 'Classe',
    drop: 'Zone de drop',
    amulette: 'Amulette',
    anneau: 'Anneau',
    bottes: 'Bottes',
    cape: 'Cape',
    ceinture: 'Ceinture',
    chapeau: 'Chapeau',
    bouclier: 'Bouclier',
    dofus: 'Dofus',
    familier: 'Familier',
    'sac-a-dos': 'Sac à dos',
    arc: 'Arc',
    baguette: 'Baguette',
    baton: 'Bâton',
    dague: 'Dague',
    epee: 'Épée',
    faux: 'Faux',
    hache: 'Hache',
    marteau: 'Marteau',
    pelle: 'Pelle',
    pioche: 'Pioche',
  };
  return labels[type] || type;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'facile': return 'text-green-400 bg-green-400/10 border-green-400/30';
    case 'moyen': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    case 'difficile': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    case 'très difficile': return 'text-red-400 bg-red-400/10 border-red-400/30';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  }
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    dps: 'DPS',
    tank: 'Tank',
    support: 'Support',
    heal: 'Heal',
    placement: 'Placement',
    entrave: 'Entrave',
  };
  return labels[role] || role;
}

export function getRoleColor(role: string): string {
  switch (role) {
    case 'dps': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'tank': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'support': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'heal': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'placement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'entrave': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}
