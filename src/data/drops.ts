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
];
