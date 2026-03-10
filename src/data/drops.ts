import { DropZone } from '@/types';

export const dropZones: DropZone[] = [
  {
    id: 'plaines-cania',
    name: 'Plaines de Cania',
    slug: 'plaines-de-cania',
    subArea: 'Astrub',
    levelRange: '10-30',
    monsters: [
      {
        name: 'Bouftou',
        level: 20,
        drops: [
          { itemName: 'Laine de Bouftou', dropRate: 30 },
          { itemName: 'Cuir de Bouftou', dropRate: 20 },
          { itemName: 'Corne de Bouftou', dropRate: 10 },
          { itemName: 'Viande de Bouftou', dropRate: 50 },
          { itemName: 'Os de Bouftou', dropRate: 15 },
        ],
      },
      {
        name: 'Bouftou Noir',
        level: 24,
        drops: [
          { itemName: 'Laine de Bouftou Noir', dropRate: 25 },
          { itemName: 'Cuir de Bouftou Noir', dropRate: 15 },
          { itemName: 'Corne de Bouftou Noir', dropRate: 8 },
        ],
      },
      {
        name: 'Chef de Guerre Bouftou',
        level: 30,
        drops: [
          { itemName: 'Casque du Chef Bouftou', dropRate: 3 },
          { itemName: 'Laine du Chef Bouftou', dropRate: 20 },
          { itemName: 'Étoffe du Chef Bouftou', dropRate: 5 },
        ],
      },
      {
        name: 'Prespic',
        level: 18,
        drops: [
          { itemName: 'Piquant de Prespic', dropRate: 40 },
          { itemName: 'Cuir de Prespic', dropRate: 25 },
          { itemName: 'Poil de Prespic', dropRate: 15 },
        ],
      },
    ],
    resources: [
      { name: 'Blé', type: 'Céréale', profession: 'Paysan' },
      { name: 'Châtaignier', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Ortie', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[-5,-5] à [-1,-1]',
  },
  {
    id: 'foret-incarnam',
    name: 'Forêt d\'Incarnam',
    slug: 'foret-dincartnam',
    subArea: 'Incarnam',
    levelRange: '1-10',
    monsters: [
      {
        name: 'Tofu',
        level: 8,
        drops: [
          { itemName: 'Plume de Tofu', dropRate: 50 },
          { itemName: 'Bec de Tofu', dropRate: 20 },
          { itemName: 'Œuf de Tofu', dropRate: 5 },
        ],
      },
      {
        name: 'Tofu Malade',
        level: 10,
        drops: [
          { itemName: 'Plume de Tofu Malade', dropRate: 40 },
          { itemName: 'Bec de Tofu Malade', dropRate: 15 },
          { itemName: 'Poison de Tofu', dropRate: 8 },
        ],
      },
      {
        name: 'Larve Bleue',
        level: 6,
        drops: [
          { itemName: 'Gelée Bleue', dropRate: 60 },
          { itemName: 'Peau de Larve Bleue', dropRate: 30 },
        ],
      },
    ],
    resources: [
      { name: 'Frêne', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Trèfle à 5 feuilles', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[2,-6] à [6,-3]',
  },
  {
    id: 'foret-abraknydes',
    name: 'Forêt des Abraknydes',
    slug: 'foret-des-abraknydes',
    subArea: 'Bonta',
    levelRange: '40-60',
    monsters: [
      {
        name: 'Abraknyde',
        level: 45,
        drops: [
          { itemName: 'Bois d\'Abraknyde', dropRate: 25 },
          { itemName: 'Racine d\'Abraknyde', dropRate: 15 },
          { itemName: 'Écorce d\'Abraknyde', dropRate: 20 },
          { itemName: 'Bourgeon d\'Abraknyde', dropRate: 10 },
        ],
      },
      {
        name: 'Abraknyde Sombre',
        level: 50,
        drops: [
          { itemName: 'Bois d\'Abraknyde Sombre', dropRate: 20 },
          { itemName: 'Racine d\'Abraknyde Sombre', dropRate: 10 },
          { itemName: 'Sève d\'Abraknyde Sombre', dropRate: 5 },
        ],
      },
      {
        name: 'Tronknyde',
        level: 55,
        drops: [
          { itemName: 'Écorce de Tronknyde', dropRate: 15 },
          { itemName: 'Racine de Tronknyde', dropRate: 8 },
          { itemName: 'Ambre de Tronknyde', dropRate: 3 },
        ],
      },
    ],
    resources: [
      { name: 'Chêne', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Noyer', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Orchidée', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[10,-5] à [15,0]',
  },
  {
    id: 'champ-scarafeuilles',
    name: 'Champ des Scarafeuilles',
    slug: 'champ-des-scarafeuilles',
    subArea: 'Astrub',
    levelRange: '25-40',
    monsters: [
      {
        name: 'Scarafeuille Blanc',
        level: 28,
        drops: [
          { itemName: 'Aile de Scarafeuille Blanc', dropRate: 30 },
          { itemName: 'Antenne de Scarafeuille', dropRate: 15 },
          { itemName: 'Carapace Blanche', dropRate: 10 },
        ],
      },
      {
        name: 'Scarafeuille Rouge',
        level: 30,
        drops: [
          { itemName: 'Aile de Scarafeuille Rouge', dropRate: 28 },
          { itemName: 'Élixe Rouge', dropRate: 5 },
          { itemName: 'Carapace Rouge', dropRate: 8 },
        ],
      },
      {
        name: 'Scarafeuille Bleu',
        level: 32,
        drops: [
          { itemName: 'Aile de Scarafeuille Bleu', dropRate: 25 },
          { itemName: 'Carapace Bleue', dropRate: 8 },
          { itemName: 'Mandibule Bleue', dropRate: 3 },
        ],
      },
      {
        name: 'Scarafeuille Vert',
        level: 26,
        drops: [
          { itemName: 'Aile de Scarafeuille Vert', dropRate: 35 },
          { itemName: 'Carapace Verte', dropRate: 12 },
          { itemName: 'Suc de Scarafeuille', dropRate: 8 },
        ],
      },
    ],
    resources: [
      { name: 'Blé', type: 'Céréale', profession: 'Paysan' },
      { name: 'Houblon', type: 'Céréale', profession: 'Paysan' },
    ],
    coordinates: '[-3,-8] à [0,-5]',
  },
  {
    id: 'prairie-blops',
    name: 'Prairie des Blops',
    slug: 'prairie-des-blops',
    subArea: 'Plaines de Cania',
    levelRange: '30-45',
    monsters: [
      {
        name: 'Blop Griotte',
        level: 35,
        drops: [
          { itemName: 'Gelée de Griotte', dropRate: 30 },
          { itemName: 'Pétale de Griotte', dropRate: 15 },
          { itemName: 'Graine de Griotte', dropRate: 5 },
        ],
      },
      {
        name: 'Blop Coco',
        level: 35,
        drops: [
          { itemName: 'Gelée de Coco', dropRate: 30 },
          { itemName: 'Pétale de Coco', dropRate: 15 },
          { itemName: 'Graine de Coco', dropRate: 5 },
        ],
      },
      {
        name: 'Blop Reinette',
        level: 35,
        drops: [
          { itemName: 'Gelée de Reinette', dropRate: 30 },
          { itemName: 'Pétale de Reinette', dropRate: 15 },
          { itemName: 'Graine de Reinette', dropRate: 5 },
        ],
      },
      {
        name: 'Blop Indigo',
        level: 35,
        drops: [
          { itemName: 'Gelée d\'Indigo', dropRate: 30 },
          { itemName: 'Pétale d\'Indigo', dropRate: 15 },
          { itemName: 'Graine d\'Indigo', dropRate: 5 },
        ],
      },
    ],
    resources: [
      { name: 'Sauge', type: 'Plante', profession: 'Alchimiste' },
      { name: 'Orge', type: 'Céréale', profession: 'Paysan' },
    ],
    coordinates: '[-8,-12] à [-5,-9]',
  },
  {
    id: 'montagne-craqueleurs',
    name: 'Montagne des Craqueleurs',
    slug: 'montagne-des-craqueleurs',
    subArea: 'Pics de Cania',
    levelRange: '55-80',
    monsters: [
      {
        name: 'Craqueleur',
        level: 55,
        drops: [
          { itemName: 'Pierre de Craqueleur', dropRate: 20 },
          { itemName: 'Granite de Craqueleur', dropRate: 12 },
          { itemName: 'Cristal de Craqueleur', dropRate: 3 },
        ],
      },
      {
        name: 'Craqueleur des Plaines',
        level: 60,
        drops: [
          { itemName: 'Pierre de Craqueleur', dropRate: 25 },
          { itemName: 'Silex de Craqueleur', dropRate: 10 },
          { itemName: 'Obsidienne', dropRate: 2 },
        ],
      },
    ],
    resources: [
      { name: 'Kobalte', type: 'Minerai', profession: 'Mineur' },
      { name: 'Bauxite', type: 'Minerai', profession: 'Mineur' },
      { name: 'Edelweiss', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[5,-15] à [10,-10]',
  },
  {
    id: 'village-eleveurs',
    name: 'Village des Éleveurs',
    slug: 'village-des-eleveurs',
    subArea: 'Bonta',
    levelRange: '70-100',
    monsters: [
      {
        name: 'Cochon de Lait',
        level: 70,
        drops: [
          { itemName: 'Cuir de Cochon de Lait', dropRate: 25 },
          { itemName: 'Groin de Cochon', dropRate: 15 },
          { itemName: 'Queue de Cochon', dropRate: 10 },
        ],
      },
      {
        name: 'Truie',
        level: 75,
        drops: [
          { itemName: 'Cuir de Truie', dropRate: 20 },
          { itemName: 'Lard de Truie', dropRate: 12 },
          { itemName: 'Défense de Truie', dropRate: 5 },
        ],
      },
    ],
    resources: [
      { name: 'Avoine', type: 'Céréale', profession: 'Paysan' },
      { name: 'Bombu', type: 'Bois', profession: 'Bûcheron' },
    ],
    coordinates: '[12,5] à [18,10]',
  },
  {
    id: 'foret-astrub',
    name: 'Forêt d\'Astrub',
    slug: 'foret-dastrub',
    subArea: 'Astrub',
    levelRange: '5-20',
    monsters: [
      { name: 'Tofu', level: 8, drops: [{ itemName: 'Plume de Tofu', dropRate: 50 }, { itemName: 'Oeil de Tofu', dropRate: 15 }, { itemName: 'Cuisse de Tofu', dropRate: 30 }] },
      { name: 'Tofu Sauvage', level: 12, drops: [{ itemName: 'Plume de Tofu Sauvage', dropRate: 40 }, { itemName: 'Oeil de Tofu Sauvage', dropRate: 10 }] },
      { name: 'Larve Bleue', level: 10, drops: [{ itemName: 'Aile de Larve Bleue', dropRate: 60 }, { itemName: 'Glande de Larve', dropRate: 20 }] },
      { name: 'Larve Verte', level: 14, drops: [{ itemName: 'Aile de Larve Verte', dropRate: 55 }, { itemName: 'Glande Verte', dropRate: 18 }] },
      { name: 'Moskito', level: 16, drops: [{ itemName: 'Aile de Moskito', dropRate: 45 }, { itemName: 'Trompe de Moskito', dropRate: 15 }] },
    ],
    resources: [
      { name: 'Frêne', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Ortie', type: 'Plante', profession: 'Herboriste' },
      { name: 'Fer', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[3,-3] à [10,-8]',
  },
  {
    id: 'ile-otomai',
    name: 'Île d\'Otomaï',
    slug: 'ile-dotomai',
    subArea: 'Île d\'Otomaï',
    levelRange: '50-75',
    monsters: [
      { name: 'Koalak Femelle', level: 50, drops: [{ itemName: 'Dent de Koalak', dropRate: 35 }, { itemName: 'Corne de Koalak', dropRate: 20 }, { itemName: 'Bottes du Koalak', dropRate: 1.5 }] },
      { name: 'Koalak Mâle', level: 55, drops: [{ itemName: 'Griffes de Koalak', dropRate: 30 }, { itemName: 'Poil de Koalak', dropRate: 40 }] },
      { name: 'Pandikaze', level: 60, drops: [{ itemName: 'Poil de Pandikaze', dropRate: 45 }, { itemName: 'Tambour de Pandikaze', dropRate: 8 }] },
      { name: 'Koalak Guerrier', level: 62, drops: [{ itemName: 'Écu de Koalak', dropRate: 15 }, { itemName: 'Ceinture du Koalak', dropRate: 1.2 }] },
    ],
    resources: [
      { name: 'Bambou', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Orchidée', type: 'Plante', profession: 'Herboriste' },
      { name: 'Mithril', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[0,-50] à [15,-65]',
  },
  {
    id: 'pandala',
    name: 'Pandala',
    slug: 'pandala',
    subArea: 'Île de Pandala',
    levelRange: '55-85',
    monsters: [
      { name: 'Gelée Pandala', level: 65, drops: [{ itemName: 'Levure de Gelée', dropRate: 30 }, { itemName: 'Essence de Gelée', dropRate: 15 }] },
      { name: 'Panda Ignis', level: 70, drops: [{ itemName: 'Fourrure de Panda', dropRate: 40 }, { itemName: 'Cristal de Feu', dropRate: 10 }] },
      { name: 'Panda Aqua', level: 70, drops: [{ itemName: 'Fourrure de Panda Aqua', dropRate: 38 }, { itemName: 'Cristal d\'Eau', dropRate: 10 }] },
      { name: 'Grozalle', level: 65, drops: [{ itemName: 'Venin de Grozalle', dropRate: 25 }, { itemName: 'Écaille de Grozalle', dropRate: 20 }] },
    ],
    resources: [
      { name: 'Bambou Sacrée', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Orchidée Noire', type: 'Plante', profession: 'Herboriste' },
      { name: 'Obsidienne', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[15,-10] à [25,-20]',
  },
  {
    id: 'ile-moon',
    name: 'Île de Moon',
    slug: 'ile-de-moon',
    subArea: 'Île de Moon',
    levelRange: '70-100',
    monsters: [
      { name: 'Rasboul', level: 78, drops: [{ itemName: 'Corne de Rasboul', dropRate: 30 }, { itemName: 'Peau de Rasboul', dropRate: 25 }] },
      { name: 'Rasboul Majeur', level: 85, drops: [{ itemName: 'Corne Géante de Rasboul', dropRate: 20 }, { itemName: 'Larme de Moon', dropRate: 5 }] },
      { name: 'Firefoux', level: 65, drops: [{ itemName: 'Huile de Firefoux', dropRate: 30 }, { itemName: 'Flamme de Firefoux', dropRate: 15 }] },
      { name: 'Rat Spectral', level: 95, drops: [{ itemName: 'Os de Rat Spectral', dropRate: 60 }, { itemName: 'Ectoplasme de Rat', dropRate: 20 }] },
    ],
    resources: [
      { name: 'Chanvre', type: 'Plante', profession: 'Paysan' },
      { name: 'Chêne', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Cuivre', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[-30,-80] à [-15,-65]',
  },
  {
    id: 'brakmar',
    name: 'Brâkmar et environs',
    slug: 'brakmar',
    subArea: 'Brâkmar',
    levelRange: '75-110',
    monsters: [
      { name: 'Abraknyde', level: 82, drops: [{ itemName: 'Toile d\'Araignée', dropRate: 40 }, { itemName: 'Venin d\'Abraknyde', dropRate: 20 }] },
      { name: 'Bwork Mage', level: 88, drops: [{ itemName: 'Bague Bwork', dropRate: 15 }, { itemName: 'Grimoire Bwork', dropRate: 10 }] },
      { name: 'Abraknyde Royal', level: 92, drops: [{ itemName: 'Soie d\'Abraknyde', dropRate: 20 }, { itemName: 'Venin Royal', dropRate: 8 }] },
    ],
    resources: [
      { name: 'Éphémère', type: 'Plante', profession: 'Herboriste' },
      { name: 'Dark Bambou', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Cobalt', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[-25,-35] à [-35,-50]',
  },
  {
    id: 'cimetiere-ouest',
    name: 'Cimetière de l\'Ouest',
    slug: 'cimetiere-ouest',
    subArea: 'Amakna',
    levelRange: '35-55',
    monsters: [
      { name: 'Chafer', level: 38, drops: [{ itemName: 'Os de Chafer', dropRate: 45 }, { itemName: 'Lance de Chafer', dropRate: 20 }] },
      { name: 'Chafer Lancier', level: 42, drops: [{ itemName: 'Lance Pointue de Chafer', dropRate: 30 }, { itemName: 'Armure de Chafer', dropRate: 10 }] },
      { name: 'Chafer Invisible', level: 45, drops: [{ itemName: 'Cœur de Chafer', dropRate: 15 }, { itemName: 'Cape Chafer', dropRate: 1.5 }] },
    ],
    resources: [
      { name: 'If', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Sauge Macabre', type: 'Plante', profession: 'Herboriste' },
    ],
    coordinates: '[-75,30] à [-85,40]',
  },
  {
    id: 'desert-sauvage',
    name: 'Désert Sauvage',
    slug: 'desert-sauvage',
    subArea: 'Amakna Désert',
    levelRange: '30-50',
    monsters: [
      { name: 'Scarabée', level: 32, drops: [{ itemName: 'Carapace de Scarabée', dropRate: 40 }, { itemName: 'Aile de Scarabée', dropRate: 25 }] },
      { name: 'Grand Skarab', level: 40, drops: [{ itemName: 'Scarabée d\'Or', dropRate: 2 }, { itemName: 'Dard de Skarab', dropRate: 20 }] },
      { name: 'Skarab Puissant', level: 45, drops: [{ itemName: 'Cuirasse de Skarab', dropRate: 15 }, { itemName: 'Antenne de Skarab', dropRate: 30 }] },
    ],
    resources: [
      { name: 'Cactus', type: 'Plante', profession: 'Herboriste' },
      { name: 'Sable Doré', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[8,12] à [15,20]',
  },
];
