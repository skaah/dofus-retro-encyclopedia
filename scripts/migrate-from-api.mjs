/**
 * Migration script: Retrofus API → Site data files
 * Fetches JSON from skaah/retrofus-API and generates TypeScript data files
 *
 * Usage: node scripts/migrate-from-api.mjs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../src/data');
const BASE_URL = 'https://raw.githubusercontent.com/skaah/retrofus-API/master/dofus-retro-api/data';
const TODAY = new Date().toISOString().split('T')[0];

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeStr(s) {
  if (!s) return '';
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '');
}

function normalizeStat(val) {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'number') return val;
  if (typeof val === 'object' && 'min' in val && 'max' in val)
    return Math.round((val.min + val.max) / 2);
  return undefined;
}

function transformStats(raw) {
  if (!raw) return {};
  const MAP = {
    vitalite: 'vitalite', vitality: 'vitalite',
    sagesse: 'sagesse', wisdom: 'sagesse',
    force: 'force', strength: 'force',
    intelligence: 'intelligence',
    chance: 'chance',
    agilite: 'agilite', agility: 'agilite',
    puissance: 'puissance',
    dommages: 'dommages',
    soins: 'soins',
    invocations: 'invocations',
    prospection: 'prospection',
    pods: 'pods',
    initiative: 'initiative',
    pa: 'pa', pm: 'pm',
    portee: 'portee',
    critiques: 'critiques',
    esquivePA: 'esquivePA', esquive_pa: 'esquivePA',
    esquivePM: 'esquivePM', esquive_pm: 'esquivePM',
    retraitPA: 'retraitPA', retrait_pa: 'retraitPA',
    retraitPM: 'retraitPM', retrait_pm: 'retraitPM',
    resistanceNeutre: 'resistanceNeutre', neutre: 'resistanceNeutre',
    resistanceTerre: 'resistanceTerre', terre: 'resistanceTerre',
    resistanceFeu: 'resistanceFeu', feu: 'resistanceFeu',
    resistanceEau: 'resistanceEau', eau: 'resistanceEau',
    resistanceAir: 'resistanceAir', air: 'resistanceAir',
    resistanceNeutrePercent: 'resistanceNeutrePercent',
    resistanceTerrePercent: 'resistanceTerrePercent',
    resistanceFeuPercent: 'resistanceFeuPercent',
    resistanceEauPercent: 'resistanceEauPercent',
    resistanceAirPercent: 'resistanceAirPercent',
  };
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    const sk = MAP[k];
    if (sk) { const n = normalizeStat(v); if (n !== undefined && n !== 0) out[sk] = n; }
  }
  return out;
}

function statsToTS(stats) {
  const entries = Object.entries(stats || {})
    .filter(([, v]) => v !== undefined && v !== 0)
    .map(([k, v]) => `${k}: ${v}`);
  return entries.length ? `{ ${entries.join(', ')} }` : '{}';
}

async function fetchJSON(filename, key) {
  const url = `${BASE_URL}/${filename}`;
  process.stdout.write(`  ↓ ${filename} ... `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const data = await res.json();
  let arr;
  if (key && Array.isArray(data[key])) arr = data[key];
  else if (Array.isArray(data)) arr = data;
  else arr = Object.values(data).find(v => Array.isArray(v)) || [];
  console.log(`${arr.length} items`);
  return arr;
}

// ─── Type inference from item name ──────────────────────────────────────────

const ITEM_TYPE_MAP = {
  Amulette: 'amulette', Anneau: 'anneau', Bottes: 'bottes',
  Cape: 'cape', Ceinture: 'ceinture', Chapeau: 'chapeau',
  Coiffe: 'chapeau', Bouclier: 'bouclier', Dofus: 'dofus',
  Familier: 'familier', 'Familier/Montilier': 'familier',
  'Sac à dos': 'sac-a-dos', Sac: 'sac-a-dos',
  amulette: 'amulette', anneau: 'anneau', bottes: 'bottes',
  cape: 'cape', ceinture: 'ceinture', chapeau: 'chapeau',
  bouclier: 'bouclier', dofus: 'dofus', familier: 'familier',
};

const WEAPON_TYPE_MAP = {
  'Épée': 'epee', épée: 'epee', Epee: 'epee',
  Hache: 'hache', Marteau: 'marteau',
  'Bâton': 'baton', Baton: 'baton', Bâton: 'baton',
  Baguette: 'baguette', Arc: 'arc',
  Poignard: 'dague', Dague: 'dague',
  Pelle: 'pelle', Faux: 'faux', Pioche: 'pioche',
};

function inferEquipmentTypeFromName(name) {
  const n = (name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (/\b(coiffe|casque|chapeau|heaume|couronne|bonnet|cagoule|capuche|couvre-chef|sombrero|calot|toque|couvrechef|helm)\b/.test(n)) return 'chapeau';
  if (/\b(cape|manteau|pelisse|poncho|houppelande|pelerine|mantelet)\b/.test(n)) return 'cape';
  if (/\b(bottes?|sandales?|souliers?|chaussures?|pantoufles?|mocassins?|sabots?|espadrilles?)\b/.test(n)) return 'bottes';
  if (/\b(amulette|broche|collier|pendentif|talisman|medaillon)\b/.test(n)) return 'amulette';
  if (/\b(anneau|bague|alliance)\b/.test(n)) return 'anneau';
  if (/\b(ceinture|baudrier|ceinturon|sangle)\b/.test(n)) return 'ceinture';
  if (/\b(bouclier|targe|egide)\b/.test(n)) return 'bouclier';
  if (/\bdofus\b/.test(n)) return 'dofus';
  if (/\b(sac|besace|gibeciere|sacoche)\b/.test(n)) return 'sac-a-dos';
  return null;
}

function resolveItemType(item) {
  // 1. Direct type map
  const direct = ITEM_TYPE_MAP[item.type];
  if (direct) return direct;
  // 2. For "Inconnu", infer from name
  if (item.type === 'Inconnu') return inferEquipmentTypeFromName(item.name);
  return null;
}

// ─── Equipment migration ─────────────────────────────────────────────────────

function transformItem(item, setsByItemName) {
  const type = resolveItemType(item);
  if (!type) return null;

  const id = slugify(item.name);
  if (!id) return null;

  const setInfo = setsByItemName[item.name];

  return {
    id,
    name: item.name,
    slug: id,
    level: item.level || 1,
    type,
    category: 'equipment',
    description: item.description || '',
    imageUrl: item.image_url || undefined,
    stats: transformStats(item.stats),
    setId: setInfo ? slugify(setInfo.name) : undefined,
    setName: setInfo ? setInfo.name : undefined,
  };
}

function transformWeapon(w) {
  const type = WEAPON_TYPE_MAP[w.type];
  if (!type) return null;
  const id = slugify(w.name);
  if (!id) return null;

  const stats = transformStats(w.stats);
  if (w.cc) {
    const parts = w.cc.split('/');
    if (parts.length === 2) {
      const rate = Math.round(100 / parseInt(parts[1]));
      if (rate > 0) stats.critiques = rate;
    }
  }
  return { id, name: w.name, slug: id, level: w.level || 1, type, category: 'weapon',
    description: w.description || '', imageUrl: w.image_url || undefined, stats };
}

function itemToTS(item) {
  const isWeapon = item.category === 'weapon';
  const typeStr = isWeapon ? `'${item.type}' as unknown as EquipmentType` : `'${item.type}'`;
  const lines = [
    `  {`,
    `    id: '${escapeStr(item.id)}',`,
    `    name: '${escapeStr(item.name)}',`,
    `    slug: '${escapeStr(item.slug)}',`,
    `    level: ${item.level},`,
    `    type: ${typeStr},`,
    `    category: '${item.category}',`,
  ];
  if (item.description) lines.push(`    description: '${escapeStr(item.description)}',`);
  if (item.imageUrl) lines.push(`    imageUrl: '${item.imageUrl}',`);
  lines.push(`    stats: ${statsToTS(item.stats)},`);
  if (item.setId) {
    lines.push(`    setId: '${escapeStr(item.setId)}',`);
    lines.push(`    setName: '${escapeStr(item.setName)}',`);
  }
  lines.push(`  },`);
  return lines.join('\n');
}

async function migrateEquipment() {
  console.log('\n📦 Migrating equipment & weapons...');

  const [itemsRaw, weaponsRaw, setsRaw] = await Promise.all([
    fetchJSON('items-enriched.json', 'items'),
    fetchJSON('weapons-enriched.json', 'weapons'),
    fetchJSON('sets-enriched.json', 'sets'),
  ]);

  // Build reverse map: item name → set
  const setsByItemName = {};
  for (const set of setsRaw) {
    if (!Array.isArray(set.items)) continue;
    for (const itemName of set.items) {
      setsByItemName[itemName] = set;
    }
  }

  // Stats for tracking
  const typeCounts = {};
  const skipped = [];

  const items = itemsRaw
    .map(raw => {
      const item = transformItem(raw, setsByItemName);
      if (!item) { skipped.push(raw.name); return null; }
      typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
      return item;
    })
    .filter(Boolean)
    .filter((item, idx, arr) => arr.findIndex(x => x.id === item.id) === idx)
    .sort((a, b) => a.level - b.level);

  const weapons = weaponsRaw
    .map(transformWeapon)
    .filter(Boolean)
    .filter((w, idx, arr) => arr.findIndex(x => x.id === w.id) === idx)
    .sort((a, b) => a.level - b.level);

  console.log(`  ✅ Items: ${items.length} | Weapons: ${weapons.length} | Skipped: ${skipped.length}`);
  console.log(`  📊 Types: ${Object.entries(typeCounts).map(([k,v])=>`${k}:${v}`).join(', ')}`);

  const ts = `import { Equipment, EquipmentType } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Source: items-enriched.json (${itemsRaw.length} raw → ${items.length} typed)
// Updated: ${TODAY}
// ============================================================

export const equipment: Equipment[] = [
${items.map(itemToTS).join('\n')}
];

// ============================================================
// ARMES — Source: weapons-enriched.json | Total: ${weapons.length}
// ============================================================

export const weapons: Equipment[] = [
${weapons.map(itemToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'equipment.ts'), ts, 'utf8');
  console.log(`  💾 Written: equipment.ts`);
}

// ─── Drops migration (monsters + resources) ──────────────────────────────────

function monsterToDropZoneEntry(m) {
  const drops = (m.drops || []).map(d =>
    `        { itemName: '${escapeStr(d.item)}', dropRate: ${d.rate} },`
  ).join('\n');

  return `      {
        name: '${escapeStr(m.name)}',
        level: ${Math.round((m.level_min + m.level_max) / 2) || m.level_min || 1},
        drops: [
${drops}
        ],
      },`;
}

async function migrateDrops() {
  console.log('\n🗺️  Migrating drops (monsters + resources)...');

  const [monstersRaw, resourcesRaw] = await Promise.all([
    fetchJSON('monsters-enriched.json', 'monsters'),
    fetchJSON('resources-enriched.json', 'resources'),
  ]);

  // Filter real resources (skip _comment entries)
  const resources = resourcesRaw.filter(r => r.name && !r._comment);

  // Group monsters by level range into zones
  const ZONES = [
    { id: 'incarnam',       name: "Incarnam",                   subArea: 'Incarnam',            min: 1,   max: 12  },
    { id: 'plaines-cania',  name: "Plaines de Cania",           subArea: 'Amakna',              min: 13,  max: 30  },
    { id: 'foret-amakna',   name: "Forêt d'Amakna",             subArea: 'Amakna',              min: 25,  max: 45  },
    { id: 'astrub',         name: "Environs d'Astrub",          subArea: 'Astrub',              min: 20,  max: 40  },
    { id: 'mines-sidimote', name: "Mines de Sidimote",          subArea: 'Sidimote',            min: 35,  max: 60  },
    { id: 'foret-sombre',   name: "Forêt des Abominations",     subArea: 'Forêt Sombre',        min: 45,  max: 70  },
    { id: 'bworks',         name: "Camp des Bworks",            subArea: 'Bworkeur',            min: 38,  max: 58  },
    { id: 'craqueleurs',    name: "Montagne des Craqueleurs",   subArea: 'Craqueleur',          min: 55,  max: 80  },
    { id: 'ile-moon',       name: "Île de Moon",                subArea: 'Moon',                min: 70,  max: 95  },
    { id: 'pandala',        name: "Pandala",                    subArea: 'Pandala',             min: 65,  max: 95  },
    { id: 'frigost',        name: "Frigost",                    subArea: 'Frigost',             min: 95,  max: 120 },
    { id: 'havre-sac',      name: "Zones Élites",               subArea: 'Zones Diverses',      min: 100, max: 200 },
  ];

  // Assign monsters to zones by average level
  for (const zone of ZONES) {
    zone.monsters = monstersRaw.filter(m => {
      const avg = (m.level_min + m.level_max) / 2;
      return avg >= zone.min && avg < zone.max;
    });
  }

  // Resource types for each zone
  const ZONE_RESOURCES = {
    'incarnam':       [{ name: 'Ortie', type: 'Plante', profession: 'Alchimiste' }, { name: 'Blé', type: 'Céréale', profession: 'Paysan' }],
    'plaines-cania':  [{ name: 'Blé', type: 'Céréale', profession: 'Paysan' }, { name: 'Châtaignier', type: 'Bois', profession: 'Bûcheron' }],
    'foret-amakna':   [{ name: 'Noyer', type: 'Bois', profession: 'Bûcheron' }, { name: 'Sauge', type: 'Plante', profession: 'Alchimiste' }],
    'astrub':         [{ name: 'Avoine', type: 'Céréale', profession: 'Paysan' }, { name: 'Frêne', type: 'Bois', profession: 'Bûcheron' }],
    'mines-sidimote': [{ name: 'Fer', type: 'Minerai', profession: 'Mineur' }, { name: 'Cuivre', type: 'Minerai', profession: 'Mineur' }],
    'foret-sombre':   [{ name: 'Chêne', type: 'Bois', profession: 'Bûcheron' }, { name: 'Trèfle', type: 'Plante', profession: 'Alchimiste' }],
    'bworks':         [{ name: 'Obsidienne', type: 'Minerai', profession: 'Mineur' }, { name: 'Ortie Piquante', type: 'Plante', profession: 'Alchimiste' }],
    'craqueleurs':    [{ name: 'Bronze', type: 'Minerai', profession: 'Mineur' }, { name: 'Pierre Volcanique', type: 'Ressource', profession: '' }],
    'ile-moon':       [{ name: 'Bois de Bambou', type: 'Bois', profession: 'Bûcheron' }, { name: 'Poisson Exotique', type: 'Poisson', profession: 'Pêcheur' }],
    'pandala':        [{ name: 'Riz', type: 'Céréale', profession: 'Paysan' }, { name: 'Bambou', type: 'Bois', profession: 'Bûcheron' }],
    'frigost':        [{ name: 'Edelweiss', type: 'Plante', profession: 'Alchimiste' }, { name: 'Cristal de Glace', type: 'Ressource', profession: '' }],
    'havre-sac':      [{ name: 'Bois de Chêne Ancien', type: 'Bois', profession: 'Bûcheron' }],
  };

  function zoneToTS(zone) {
    const monsters = zone.monsters || [];
    const monsterEntries = monsters.slice(0, 8).map(m => monsterToDropZoneEntry(m)).join('\n');
    const zoneResources = ZONE_RESOURCES[zone.id] || [];
    const resourceEntries = zoneResources.map(r =>
      `      { name: '${escapeStr(r.name)}', type: '${escapeStr(r.type)}'${r.profession ? `, profession: '${escapeStr(r.profession)}'` : ''} },`
    ).join('\n');
    const avgMin = monsters.length ? Math.min(...monsters.map(m => m.level_min)) : zone.min;
    const avgMax = monsters.length ? Math.max(...monsters.map(m => m.level_max)) : zone.max;

    return `  {
    id: '${zone.id}',
    name: '${escapeStr(zone.name)}',
    slug: '${zone.id}',
    subArea: '${escapeStr(zone.subArea)}',
    levelRange: '${avgMin}-${avgMax}',
    monsters: [
${monsterEntries}
    ],
    resources: [
${resourceEntries}
    ],
  },`;
  }

  const ts = `import { DropZone } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Sources: monsters-enriched.json (${monstersRaw.length}) + resources-enriched.json (${resources.length})
// Updated: ${TODAY}
// ============================================================

export const dropZones: DropZone[] = [
${ZONES.map(zoneToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'drops.ts'), ts, 'utf8');
  console.log(`  ✅ Zones: ${ZONES.length} | Monsters: ${monstersRaw.length} | Resources: ${resources.length}`);
  console.log(`  💾 Written: drops.ts`);
}

// ─── Dungeons migration ──────────────────────────────────────────────────────

function dungeonToTS(d) {
  const id = slugify(d.name);
  const loc = String(d.location || '');
  const boss = d.boss || 'Boss';
  const bossLevel = Math.round((d.level || 20) * 1.3);
  const monsters = (d.monsters || []).filter(m => m !== boss);
  const rewards = d.rewards || {};
  const rewardItems = (rewards.items || []).map(r => `'${escapeStr(r)}'`).join(', ');
  const difficulty = { easy: 'facile', medium: 'moyen', hard: 'difficile', 'very hard': 'très difficile' }[d.difficulty?.toLowerCase()] || 'moyen';
  const strategy = escapeStr((d.strategy || '').split('.')[0]);

  const monsterEntries = monsters.slice(0, 6).map(m => {
    const lvl = Math.max(1, (d.level || 20) - 3);
    return `      { id: '${slugify(m)}', name: '${escapeStr(m)}', level: ${lvl}, hp: ${lvl * 22}, pa: 6, pm: 3 },`;
  }).join('\n');

  return `  {
    id: '${id}',
    name: '${escapeStr(d.name)}',
    slug: '${id}',
    level: ${d.level || 20},
    zone: '${escapeStr(loc)}',
    subZone: '${escapeStr(loc)}',
    description: '${escapeStr(d.name)} — niveau ${d.level || 20}. Clef : ${escapeStr(d.key || 'Clef du donjon')}. ${d.rooms || 3} salles.',
    boss: {
      id: '${slugify(boss)}',
      name: '${escapeStr(boss)}',
      level: ${bossLevel},
      hp: ${bossLevel * 40},
      pa: 8,
      pm: 4,
    },
    monsters: [
${monsterEntries}
    ],
    strategy: {
      recommendedLevel: ${(d.level || 20) + 5},
      recommendedTeamSize: ${d.level > 100 ? 8 : d.level > 60 ? 6 : 4},
      composition: 'Soigneur + Tank + DPS recommandés',
      steps: [
        '${strategy || 'Préparez votre équipe'}.',
        'Éliminez les monstres avant d\\'attaquer le boss.',
        'Méfiez-vous des invocations de ${escapeStr(boss)}.',
      ],
      tips: [
        'Clef requise : ${escapeStr(d.key || 'Clef du donjon')}',
        'XP : ${rewards.xp || 0} points',
      ],
      difficulty: '${difficulty}',
    },
    rewards: [${rewardItems}],
  },`;
}

async function migrateDungeons() {
  console.log('\n🏰 Migrating dungeons...');
  const raw = await fetchJSON('dungeons-enriched.json', 'dungeons');

  const ts = `import { Dungeon } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Source: dungeons-enriched.json | Dungeons: ${raw.length} | Updated: ${TODAY}
// ============================================================

export const dungeons: Dungeon[] = [
${raw.map(dungeonToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'dungeons.ts'), ts, 'utf8');
  console.log(`  ✅ Dungeons: ${raw.length}`);
  console.log(`  💾 Written: dungeons.ts`);
}

// ─── Quests migration ────────────────────────────────────────────────────────

function questToTS(q) {
  const id = slugify(q.name);
  const steps = Array.isArray(q.steps) ? q.steps : [];
  const rewards = q.rewards || {};
  const rewardItems = (rewards.items || []).map(r => `'${escapeStr(r)}'`).join(', ');
  const catMap = {
    dofus: 'principale', dungeon: 'secondaire', class: 'classe',
    alignment: 'alignement', profession: 'secondaire', island: 'secondaire', event: 'secondaire',
  };
  const category = catMap[q.category?.toLowerCase()] || 'secondaire';

  const objectives = steps.length
    ? steps.slice(0, 4).map(s => `      { description: '${escapeStr(s.description || s.objective || 'Étape')}', type: 'talk' },`)
    : [`      { description: 'Parler à ${escapeStr(q.starting_npc || 'PNJ')}', type: 'talk', location: '${escapeStr(q.zone || '')}' },`];

  return `  {
    id: '${id}',
    name: '${escapeStr(q.name)}',
    slug: '${id}',
    level: ${q.level || 1},
    category: '${category}',
    zone: '${escapeStr(q.zone || '')}',
    description: '${escapeStr(q.description || q.name)}',
    objectives: [
${objectives.join('\n')}
    ],
    rewards: {
      xp: ${rewards.xp || 0},
      kamas: ${rewards.kamas || 0},${rewardItems ? `\n      items: [${rewardItems}],` : ''}
    },
    guide: {
      steps: [
        { order: 1, description: 'Parler à ${escapeStr(q.starting_npc || 'le PNJ de départ')}', location: '${escapeStr(q.zone || '')}', npc: '${escapeStr(q.starting_npc || '')}' },
      ],
      tips: ['Voir le guide complet sur Retrofus'],
      estimatedTime: '30 minutes',
    },
  },`;
}

async function migrateQuests() {
  console.log('\n📜 Migrating quests...');
  const raw = await fetchJSON('quests-enriched.json', 'quests');

  const ts = `import { Quest } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Source: quests-enriched.json | Quests: ${raw.length} | Updated: ${TODAY}
// ============================================================

export const quests: Quest[] = [
${raw.map(questToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'quests.ts'), ts, 'utf8');
  console.log(`  ✅ Quests: ${raw.length}`);
  console.log(`  💾 Written: quests.ts`);
}

// ─── Classes + Spells migration ──────────────────────────────────────────────

async function migrateClasses() {
  console.log('\n⚔️  Migrating classes + spells...');
  const [classesRaw, spellsRaw] = await Promise.all([
    fetchJSON('classes-enriched.json', 'classes'),
    fetchJSON('spells-enriched.json', 'spells'),
  ]);

  const spellsByClass = {};
  for (const s of spellsRaw) {
    const cls = s.class || s.classe || 'Unknown';
    if (!spellsByClass[cls]) spellsByClass[cls] = [];
    spellsByClass[cls].push(s);
  }

  const ROLES = {
    Feca: ['tank', 'support'], Osamodas: ['support', 'dps'], Enutrof: ['support'],
    Sram: ['dps', 'entrave'], Xelor: ['dps', 'entrave'], Ecaflip: ['dps'],
    Eniripsa: ['heal', 'support'], Iop: ['dps', 'tank'], 'Crâ': ['dps'],
    Sacrieur: ['dps', 'tank', 'placement'], Sadida: ['support', 'dps', 'entrave'],
    Pandawa: ['support', 'placement'],
  };

  const MAIN_STATS = {
    Feca: ['Intelligence', 'Sagesse'], Osamodas: ['Intelligence', 'Invocations'],
    Enutrof: ['Chance', 'Prospection'], Sram: ['Agilité', 'Force'],
    Xelor: ['Intelligence', 'Sagesse'], Ecaflip: ['Chance', 'Agilité'],
    Eniripsa: ['Intelligence', 'Sagesse'], Iop: ['Force', 'Vitalité'],
    'Crâ': ['Agilité', 'Force'], Sacrieur: ['Vitalité', 'Force'],
    Sadida: ['Intelligence', 'Chance'], Pandawa: ['Force', 'Intelligence'],
  };

  function spellToTS(s) {
    const damage = s.damage ? `'${s.damage.min}-${s.damage.max}'` : undefined;
    const po = s.po != null ? (typeof s.po === 'object' ? `'${s.po.min}-${s.po.max}'` : `'${s.po}'`) : "'1'";
    const elem = s.damage_type || 'Neutre';
    return `      {
        name: '${escapeStr(s.name)}',
        level: ${s.level || 1},
        description: '${escapeStr(s.description || s.effects || '')}',
        element: '${escapeStr(elem)}',
        pa: ${s.pa || 4},
        range: ${po},${damage ? `\n        damage: ${damage},` : ''}
      },`;
  }

  function classToTS(cls) {
    const id = slugify(cls.name);
    const roles = ROLES[cls.name] || ['dps'];
    const mainStats = MAIN_STATS[cls.name] || ['Force', 'Intelligence'];
    const spells = (spellsByClass[cls.name] || []).slice(0, 20);
    const hp = cls.base_stats?.vitalite || 55;

    return `  {
    id: '${id}',
    name: '${escapeStr(cls.name)}',
    slug: '${id}',
    description: '${escapeStr(cls.description || '')}',
    role: [${roles.map(r => `'${r}'`).join(', ')}],
    element: [${mainStats.map(s => `'${s}'`).join(', ')}],
    spells: [
${spells.map(spellToTS).join('\n')}
    ],
    characteristics: {
      hp: '${hp} HP de base (+5 par point de Vitalité)',
      mainStats: [${mainStats.map(s => `'${s}'`).join(', ')}],
      strengths: ['${escapeStr(cls.description?.split('.')[0] || 'Classe polyvalente')}'],
      weaknesses: ['Nécessite une bonne maîtrise des sorts'],
    },
  },`;
  }

  const ts = `import { GameClass } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Sources: classes-enriched.json (${classesRaw.length}) + spells-enriched.json (${spellsRaw.length})
// Updated: ${TODAY}
// ============================================================

export const classes: GameClass[] = [
${classesRaw.map(classToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'classes.ts'), ts, 'utf8');
  console.log(`  ✅ Classes: ${classesRaw.length} | Spells: ${spellsRaw.length} (≤20/classe)`);
  console.log(`  💾 Written: classes.ts`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Retrofus API → Site migration (full)');
  console.log('=========================================');

  try {
    await migrateEquipment();
    await migrateDrops();
    await migrateDungeons();
    await migrateQuests();
    await migrateClasses();

    console.log('\n✅ Migration complète !');
    console.log('   Lancer: node_modules/.bin/tsc --noEmit  (vérif TypeScript)');
  } catch (err) {
    console.error('\n❌ Migration échouée:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
