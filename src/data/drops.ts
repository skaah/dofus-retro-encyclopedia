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
  {
    id: 'plages-incarnam',
    name: 'Plages d\'Incarnam',
    slug: 'plages-dincartnam',
    subArea: 'Incarnam',
    levelRange: '1-8',
    monsters: [
      {
        name: 'Tofu',
        level: 3,
        drops: [
          { itemName: 'Plume de Tofu', dropRate: 55 },
          { itemName: 'Bec de Tofu', dropRate: 25 },
          { itemName: 'Oeil de Tofu', dropRate: 15 },
        ],
      },
      {
        name: 'Tofu Malade',
        level: 6,
        drops: [
          { itemName: 'Plume de Tofu Malade', dropRate: 45 },
          { itemName: 'Bec de Tofu Malade', dropRate: 18 },
          { itemName: 'Poison de Tofu', dropRate: 10 },
        ],
      },
      {
        name: 'Larve Bleue',
        level: 4,
        drops: [
          { itemName: 'Gelée Bleue', dropRate: 60 },
          { itemName: 'Peau de Larve Bleue', dropRate: 35 },
        ],
      },
    ],
    resources: [
      { name: 'Blé', type: 'Céréale', profession: 'Paysan' },
      { name: 'Frêne', type: 'Bois', profession: 'Bûcheron' },
    ],
    coordinates: '[0,-4] à [4,-1]',
  },
  {
    id: 'donjon-larves',
    name: 'Donjon des Larves',
    slug: 'donjon-des-larves',
    subArea: 'Amakna',
    levelRange: '15-25',
    monsters: [
      {
        name: 'Larve Bleue',
        level: 15,
        drops: [
          { itemName: 'Gelée Bleue', dropRate: 55 },
          { itemName: 'Peau de Larve Bleue', dropRate: 30 },
          { itemName: 'Anneau de Larve', dropRate: 2 },
        ],
      },
      {
        name: 'Larve Verte',
        level: 18,
        drops: [
          { itemName: 'Gelée Verte', dropRate: 50 },
          { itemName: 'Peau de Larve Verte', dropRate: 28 },
          { itemName: 'Mandibule de Larve', dropRate: 12 },
        ],
      },
      {
        name: 'Larve Jaune',
        level: 20,
        drops: [
          { itemName: 'Gelée Jaune', dropRate: 45 },
          { itemName: 'Peau de Larve Jaune', dropRate: 25 },
          { itemName: 'Oeil de Larve', dropRate: 8 },
        ],
      },
      {
        name: 'Larve Noire',
        level: 25,
        drops: [
          { itemName: 'Gelée Noire', dropRate: 35 },
          { itemName: 'Peau de Larve Noire', dropRate: 20 },
          { itemName: 'Coiffe de Larve Noire', dropRate: 3 },
          { itemName: 'Amulette de Larve', dropRate: 1.5 },
        ],
      },
    ],
    resources: [],
    coordinates: '[1,-5]',
  },
  {
    id: 'champs-ble',
    name: 'Champs de Blé',
    slug: 'champs-de-ble',
    subArea: 'Astrub',
    levelRange: '10-20',
    monsters: [
      {
        name: 'Bouftou',
        level: 12,
        drops: [
          { itemName: 'Laine de Bouftou', dropRate: 35 },
          { itemName: 'Cuir de Bouftou', dropRate: 25 },
          { itemName: 'Corne de Bouftou', dropRate: 12 },
          { itemName: 'Viande de Bouftou', dropRate: 50 },
        ],
      },
      {
        name: 'Bouftou Royal',
        level: 20,
        drops: [
          { itemName: 'Laine de Bouftou Royal', dropRate: 25 },
          { itemName: 'Corne de Bouftou Royal', dropRate: 10 },
          { itemName: 'Cape de Bouftou Royal', dropRate: 2 },
          { itemName: 'Coiffe de Bouftou', dropRate: 3 },
        ],
      },
      {
        name: 'Prespic',
        level: 14,
        drops: [
          { itemName: 'Piquant de Prespic', dropRate: 40 },
          { itemName: 'Cuir de Prespic', dropRate: 28 },
          { itemName: 'Poil de Prespic', dropRate: 18 },
        ],
      },
    ],
    resources: [
      { name: 'Blé', type: 'Céréale', profession: 'Paysan' },
      { name: 'Avoine', type: 'Céréale', profession: 'Paysan' },
      { name: 'Ortie', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[-2,-1] à [2,3]',
  },
  {
    id: 'bois-lierre',
    name: 'Bois de Lierre',
    slug: 'bois-de-lierre',
    subArea: 'Amakna',
    levelRange: '20-35',
    monsters: [
      {
        name: 'Sanglier',
        level: 22,
        drops: [
          { itemName: 'Cuir de Sanglier', dropRate: 35 },
          { itemName: 'Défense de Sanglier', dropRate: 20 },
          { itemName: 'Viande de Sanglier', dropRate: 45 },
        ],
      },
      {
        name: 'Sanglier Sauvage',
        level: 28,
        drops: [
          { itemName: 'Cuir de Sanglier Sauvage', dropRate: 30 },
          { itemName: 'Défense de Sanglier Sauvage', dropRate: 15 },
          { itemName: 'Anneau du Sanglier', dropRate: 2.5 },
        ],
      },
      {
        name: 'Renard',
        level: 25,
        drops: [
          { itemName: 'Poil de Renard', dropRate: 40 },
          { itemName: 'Queue de Renard', dropRate: 22 },
          { itemName: 'Cape du Renard', dropRate: 1.5 },
        ],
      },
    ],
    resources: [
      { name: 'Châtaignier', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Noyer', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Sauge', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[-8,2] à [-4,6]',
  },
  {
    id: 'marecages',
    name: 'Marécages',
    slug: 'marecages',
    subArea: 'Amakna',
    levelRange: '25-40',
    monsters: [
      {
        name: 'Grenouille',
        level: 26,
        drops: [
          { itemName: 'Peau de Grenouille', dropRate: 40 },
          { itemName: 'Langue de Grenouille', dropRate: 22 },
          { itemName: 'Bave de Grenouille', dropRate: 30 },
        ],
      },
      {
        name: 'Crabe des Marais',
        level: 32,
        drops: [
          { itemName: 'Pince de Crabe', dropRate: 35 },
          { itemName: 'Carapace de Crabe', dropRate: 20 },
          { itemName: 'Oeil de Crabe', dropRate: 10 },
          { itemName: 'Anneau du Crabe', dropRate: 2 },
        ],
      },
      {
        name: 'Scarafeuille',
        level: 30,
        drops: [
          { itemName: 'Aile de Scarafeuille', dropRate: 38 },
          { itemName: 'Antenne de Scarafeuille', dropRate: 18 },
          { itemName: 'Carapace de Scarafeuille', dropRate: 12 },
        ],
      },
    ],
    resources: [
      { name: 'Lin', type: 'Plante', profession: 'Paysan' },
      { name: 'Trèfle à 5 feuilles', type: 'Plante', profession: 'Alchimiste' },
      { name: 'Étain', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[-12,5] à [-8,9]',
  },
  {
    id: 'mines-sidimote',
    name: 'Mines de Sidimote',
    slug: 'mines-de-sidimote',
    subArea: 'Amakna',
    levelRange: '35-55',
    monsters: [
      {
        name: 'Mineur Chafer',
        level: 38,
        drops: [
          { itemName: 'Os de Chafer', dropRate: 40 },
          { itemName: 'Parcelle d\'Âme', dropRate: 15 },
          { itemName: 'Pioche de Chafer', dropRate: 5 },
        ],
      },
      {
        name: 'Chafer Fantassin',
        level: 42,
        drops: [
          { itemName: 'Os de Chafer', dropRate: 45 },
          { itemName: 'Casque de Chafer', dropRate: 8 },
          { itemName: 'Cape Chafer', dropRate: 2 },
          { itemName: 'Épée de Chafer', dropRate: 3 },
        ],
      },
      {
        name: 'Chafer Archer',
        level: 48,
        drops: [
          { itemName: 'Os de Chafer', dropRate: 40 },
          { itemName: 'Arc de Chafer', dropRate: 5 },
          { itemName: 'Flèche Spectrale', dropRate: 12 },
          { itemName: 'Amulette de Chafer', dropRate: 1.5 },
        ],
      },
    ],
    resources: [
      { name: 'Fer', type: 'Minerai', profession: 'Mineur' },
      { name: 'Argent', type: 'Minerai', profession: 'Mineur' },
      { name: 'Or', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[-15,-10] à [-10,-6]',
  },
  {
    id: 'foret-abominations',
    name: 'Forêt des Abominations',
    slug: 'foret-des-abominations',
    subArea: 'Brakmar',
    levelRange: '45-65',
    monsters: [
      {
        name: 'Abraknyde',
        level: 48,
        drops: [
          { itemName: 'Dard d\'Abraknyde', dropRate: 45 },
          { itemName: 'Toile d\'Abraknyde', dropRate: 20 },
          { itemName: 'Bois d\'Abraknyde', dropRate: 30 },
          { itemName: 'Cape Abrakne', dropRate: 2 },
        ],
      },
      {
        name: 'Abraknyde Sombre',
        level: 55,
        drops: [
          { itemName: 'Dard d\'Abraknyde Sombre', dropRate: 35 },
          { itemName: 'Sève d\'Abraknyde Sombre', dropRate: 15 },
          { itemName: 'Racine Sombre', dropRate: 10 },
        ],
      },
      {
        name: 'Abrakne',
        level: 60,
        drops: [
          { itemName: 'Toile d\'Abrakne', dropRate: 30 },
          { itemName: 'Venin d\'Abrakne', dropRate: 18 },
          { itemName: 'Patte d\'Abrakne', dropRate: 12 },
          { itemName: 'Coiffe d\'Abrakne', dropRate: 1.5 },
        ],
      },
    ],
    resources: [
      { name: 'Orme', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Charme', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Belladone', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[-30,-15] à [-25,-10]',
  },
  {
    id: 'camp-bworks',
    name: 'Camp des Bworks',
    slug: 'camp-des-bworks',
    subArea: 'Sidimote',
    levelRange: '40-55',
    monsters: [
      {
        name: 'Bwork Magik',
        level: 42,
        drops: [
          { itemName: 'Baguette de Bwork', dropRate: 25 },
          { itemName: 'Grimoire Bwork', dropRate: 12 },
          { itemName: 'Bague Bwork Magik', dropRate: 3 },
        ],
      },
      {
        name: 'Bwork Archer',
        level: 45,
        drops: [
          { itemName: 'Arc de Bwork', dropRate: 20 },
          { itemName: 'Flèche de Bwork', dropRate: 35 },
          { itemName: 'Cape de Bwork', dropRate: 2.5 },
        ],
      },
      {
        name: 'Bwork Soldat',
        level: 48,
        drops: [
          { itemName: 'Épée de Bwork', dropRate: 18 },
          { itemName: 'Bouclier de Bwork', dropRate: 10 },
          { itemName: 'Casque de Bwork', dropRate: 5 },
          { itemName: 'Ceinture de Bwork', dropRate: 2 },
        ],
      },
    ],
    resources: [
      { name: 'If', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Kobalte', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[-18,-8] à [-14,-4]',
  },
  {
    id: 'montagne-craqueleurs-volcanique',
    name: 'Montagne des Craqueleurs Volcaniques',
    slug: 'montagne-des-craqueleurs-volcaniques',
    subArea: 'Pics de Cania',
    levelRange: '60-80',
    monsters: [
      {
        name: 'Craqueleur',
        level: 60,
        drops: [
          { itemName: 'Pierre de Craqueleur', dropRate: 35 },
          { itemName: 'Granite de Craqueleur', dropRate: 20 },
          { itemName: 'Cape Craqueleur', dropRate: 1.5 },
        ],
      },
      {
        name: 'Craqueleur Volcanique',
        level: 72,
        drops: [
          { itemName: 'Roche Volcanique', dropRate: 25 },
          { itemName: 'Magma de Craqueleur', dropRate: 15 },
          { itemName: 'Pierre de Lave', dropRate: 8 },
          { itemName: 'Amulette Volcanique', dropRate: 2 },
        ],
      },
      {
        name: 'Craqueleur Sombre',
        level: 78,
        drops: [
          { itemName: 'Pierre Sombre', dropRate: 28 },
          { itemName: 'Obsidienne de Craqueleur', dropRate: 12 },
          { itemName: 'Anneau du Craqueleur', dropRate: 1.8 },
          { itemName: 'Bouclier de Craqueleur', dropRate: 1 },
        ],
      },
    ],
    resources: [
      { name: 'Bauxite', type: 'Minerai', profession: 'Mineur' },
      { name: 'Kobalte', type: 'Minerai', profession: 'Mineur' },
      { name: 'Edelweiss', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[6,-18] à [12,-12]',
  },
  {
    id: 'plaines-kimbo',
    name: 'Plaines de Kimbo',
    slug: 'plaines-de-kimbo',
    subArea: 'Plaines de Cania',
    levelRange: '50-70',
    monsters: [
      {
        name: 'Canidé',
        level: 52,
        drops: [
          { itemName: 'Poil de Canidé', dropRate: 40 },
          { itemName: 'Griffe de Canidé', dropRate: 25 },
          { itemName: 'Cuir de Canidé', dropRate: 20 },
        ],
      },
      {
        name: 'Grand Canidé',
        level: 60,
        drops: [
          { itemName: 'Poil de Grand Canidé', dropRate: 32 },
          { itemName: 'Croc de Grand Canidé', dropRate: 18 },
          { itemName: 'Cape du Canidé', dropRate: 2 },
        ],
      },
      {
        name: 'Canidé des Plaines',
        level: 65,
        drops: [
          { itemName: 'Fourrure de Canidé', dropRate: 28 },
          { itemName: 'Griffe Acérée', dropRate: 15 },
          { itemName: 'Amulette du Canidé', dropRate: 2.5 },
          { itemName: 'Coiffe du Canidé', dropRate: 1.5 },
        ],
      },
    ],
    resources: [
      { name: 'Seigle', type: 'Céréale', profession: 'Paysan' },
      { name: 'Sauge', type: 'Plante', profession: 'Alchimiste' },
      { name: 'Fer', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[-10,-15] à [-5,-10]',
  },
  {
    id: 'bonta-champs',
    name: 'Bonta - Les Champs',
    slug: 'bonta-les-champs',
    subArea: 'Bonta',
    levelRange: '30-50',
    monsters: [
      {
        name: 'Wabbit',
        level: 32,
        drops: [
          { itemName: 'Poil de Wabbit', dropRate: 40 },
          { itemName: 'Oreille de Wabbit', dropRate: 25 },
          { itemName: 'Patte de Wabbit', dropRate: 18 },
        ],
      },
      {
        name: 'Wabbit Squelette',
        level: 38,
        drops: [
          { itemName: 'Os de Wabbit', dropRate: 35 },
          { itemName: 'Crâne de Wabbit', dropRate: 15 },
          { itemName: 'Cape du Wabbit', dropRate: 2.5 },
        ],
      },
      {
        name: 'Twinsion',
        level: 45,
        drops: [
          { itemName: 'Étoffe de Twinsion', dropRate: 22 },
          { itemName: 'Anneau de Twinsion', dropRate: 5 },
          { itemName: 'Coiffe de Twinsion', dropRate: 3 },
          { itemName: 'Baguette de Twinsion', dropRate: 1.5 },
        ],
      },
    ],
    resources: [
      { name: 'Blé', type: 'Céréale', profession: 'Paysan' },
      { name: 'Houblon', type: 'Céréale', profession: 'Paysan' },
      { name: 'Érable', type: 'Bois', profession: 'Bûcheron' },
    ],
    coordinates: '[-28,5] à [-22,10]',
  },
  {
    id: 'ile-moon-pirates',
    name: 'Île de Moon - Repaire des Pirates',
    slug: 'ile-de-moon-repaire-des-pirates',
    subArea: 'Île de Moon',
    levelRange: '80-100',
    monsters: [
      {
        name: 'Pirate',
        level: 82,
        drops: [
          { itemName: 'Pièce de Monnaie', dropRate: 30 },
          { itemName: 'Bandana de Pirate', dropRate: 20 },
          { itemName: 'Sabre de Pirate', dropRate: 3 },
        ],
      },
      {
        name: 'Fantôme Pirate',
        level: 88,
        drops: [
          { itemName: 'Ectoplasme de Pirate', dropRate: 25 },
          { itemName: 'Chaîne Fantomatique', dropRate: 12 },
          { itemName: 'Anneau du Pirate Fantôme', dropRate: 2 },
        ],
      },
      {
        name: 'Squelette Pirate',
        level: 92,
        drops: [
          { itemName: 'Os de Pirate', dropRate: 35 },
          { itemName: 'Épée Rouillée', dropRate: 18 },
          { itemName: 'Chapeau de Pirate', dropRate: 4 },
          { itemName: 'Amulette du Capitaine', dropRate: 1 },
        ],
      },
      {
        name: 'Marinière',
        level: 85,
        drops: [
          { itemName: 'Tissu de Marinière', dropRate: 28 },
          { itemName: 'Corde de Marine', dropRate: 20 },
          { itemName: 'Bottes de Marin', dropRate: 3 },
        ],
      },
    ],
    resources: [
      { name: 'Bambou', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Chanvre', type: 'Plante', profession: 'Paysan' },
      { name: 'Or', type: 'Minerai', profession: 'Mineur' },
    ],
    coordinates: '[-32,-75] à [-20,-68]',
  },
  {
    id: 'frigost-entree',
    name: 'Frigost - Entrée',
    slug: 'frigost-entree',
    subArea: 'Île de Frigost',
    levelRange: '100-120',
    monsters: [
      {
        name: 'Loup Glacial',
        level: 102,
        drops: [
          { itemName: 'Fourrure de Loup Glacial', dropRate: 30 },
          { itemName: 'Croc Glacé', dropRate: 18 },
          { itemName: 'Cape du Loup Glacial', dropRate: 2.5 },
        ],
      },
      {
        name: 'Ours Polaire',
        level: 110,
        drops: [
          { itemName: 'Fourrure d\'Ours Polaire', dropRate: 25 },
          { itemName: 'Griffe d\'Ours', dropRate: 15 },
          { itemName: 'Ceinture de l\'Ours', dropRate: 2 },
          { itemName: 'Coiffe de l\'Ours', dropRate: 1.5 },
        ],
      },
      {
        name: 'Pingouin Guerrier',
        level: 105,
        drops: [
          { itemName: 'Plume de Pingouin', dropRate: 35 },
          { itemName: 'Bec de Pingouin', dropRate: 20 },
          { itemName: 'Anneau du Pingouin', dropRate: 3 },
        ],
      },
    ],
    resources: [
      { name: 'Sapin', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Dolomite', type: 'Minerai', profession: 'Mineur' },
      { name: 'Ginseng', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[-60,-70] à [-50,-60]',
  },
  {
    id: 'pandala-village',
    name: 'Pandala - Village',
    slug: 'pandala-village',
    subArea: 'Île de Pandala',
    levelRange: '70-100',
    monsters: [
      {
        name: 'Panda Guerrier',
        level: 75,
        drops: [
          { itemName: 'Fourrure de Panda', dropRate: 35 },
          { itemName: 'Griffe de Panda', dropRate: 20 },
          { itemName: 'Ceinture du Panda', dropRate: 3 },
        ],
      },
      {
        name: 'Panda Mage',
        level: 82,
        drops: [
          { itemName: 'Fourrure Enchantée', dropRate: 28 },
          { itemName: 'Baguette de Panda', dropRate: 10 },
          { itemName: 'Amulette du Panda Mage', dropRate: 2 },
          { itemName: 'Cape du Panda', dropRate: 1.5 },
        ],
      },
      {
        name: 'Panda Ivre',
        level: 90,
        drops: [
          { itemName: 'Fourrure de Panda Ivre', dropRate: 22 },
          { itemName: 'Bouteille de Saké', dropRate: 15 },
          { itemName: 'Anneau du Panda Ivre', dropRate: 2.5 },
          { itemName: 'Coiffe du Panda', dropRate: 1 },
        ],
      },
    ],
    resources: [
      { name: 'Bambou Sacrée', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Bambou', type: 'Bois', profession: 'Bûcheron' },
      { name: 'Orchidée', type: 'Plante', profession: 'Alchimiste' },
    ],
    coordinates: '[18,-12] à [26,-18]',
  },
  {
    id: 'temple-kardorim',
    name: 'Temple Kardorim',
    slug: 'temple-kardorim',
    subArea: 'Brakmar',
    levelRange: '90-110',
    monsters: [
      {
        name: 'Kardorim',
        level: 95,
        drops: [
          { itemName: 'Essence de Kardorim', dropRate: 20 },
          { itemName: 'Pierre du Temple', dropRate: 15 },
          { itemName: 'Anneau de Kardorim', dropRate: 3 },
          { itemName: 'Épée de Kardorim', dropRate: 1.5 },
        ],
      },
      {
        name: 'Gardien du Temple',
        level: 100,
        drops: [
          { itemName: 'Clé du Temple', dropRate: 8 },
          { itemName: 'Bouclier du Gardien', dropRate: 5 },
          { itemName: 'Cape du Gardien', dropRate: 2 },
          { itemName: 'Amulette du Gardien', dropRate: 1.5 },
        ],
      },
      {
        name: 'Spectre Kardorim',
        level: 108,
        drops: [
          { itemName: 'Ectoplasme de Spectre', dropRate: 25 },
          { itemName: 'Cristal Spectral', dropRate: 10 },
          { itemName: 'Coiffe du Spectre', dropRate: 2 },
          { itemName: 'Baguette Spectrale', dropRate: 1 },
        ],
      },
    ],
    resources: [
      { name: 'Obsidienne', type: 'Minerai', profession: 'Mineur' },
      { name: 'Dark Bambou', type: 'Bois', profession: 'Bûcheron' },
    ],
    coordinates: '[-35,-40] à [-30,-35]',
  },
  {
    id: 'zaap-bonta-pvp',
    name: 'Zaap de Bonta / Zone PvP',
    slug: 'zaap-de-bonta-zone-pvp',
    subArea: 'Bonta',
    levelRange: '50-120',
    monsters: [
      {
        name: 'Goultard',
        level: 120,
        drops: [
          { itemName: 'Épée de Goultard', dropRate: 0.5 },
          { itemName: 'Cape de Goultard', dropRate: 1 },
          { itemName: 'Amulette de Goultard', dropRate: 0.8 },
          { itemName: 'Fragment de Puissance', dropRate: 5 },
        ],
      },
      {
        name: 'Milimilitard',
        level: 80,
        drops: [
          { itemName: 'Étoffe de Milimilitard', dropRate: 20 },
          { itemName: 'Bouclier de Milimilitard', dropRate: 8 },
          { itemName: 'Casque de Milimilitard', dropRate: 4 },
        ],
      },
    ],
    resources: [],
    coordinates: '[-25,8]',
  },
];
