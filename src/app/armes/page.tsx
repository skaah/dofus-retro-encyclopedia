'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { weapons } from '@/data/equipment';
import { getStatLabel, getStatColor, getTypeLabel } from '@/lib/utils';
import type { Equipment } from '@/types';

const weaponTypes = [
  'arc', 'baguette', 'baton', 'dague', 'epee',
  'faux', 'hache', 'marteau', 'pelle',
] as const;

type WeaponTypeFilter = (typeof weaponTypes)[number] | 'all';

type SortOption = 'level-asc' | 'level-desc' | 'name-asc' | 'name-desc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'level-asc', label: 'Niveau croissant' },
  { value: 'level-desc', label: 'Niveau decroissant' },
  { value: 'name-asc', label: 'Nom (A-Z)' },
  { value: 'name-desc', label: 'Nom (Z-A)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

export default function ArmesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<WeaponTypeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('level-asc');

  const filteredWeapons = useMemo(() => {
    let items = [...weapons];

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((item) =>
        item.name.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      items = items.filter((item) => (item.type as string) === selectedType);
    }

    // Sort
    switch (sortBy) {
      case 'level-asc':
        items.sort((a, b) => a.level - b.level);
        break;
      case 'level-desc':
        items.sort((a, b) => b.level - a.level);
        break;
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
        break;
      case 'name-desc':
        items.sort((a, b) => b.name.localeCompare(a.name, 'fr'));
        break;
    }

    return items;
  }, [searchQuery, selectedType, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20">
              <Sword className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Armes
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {weapons.length} armes disponibles
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-4 md:p-6 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une arme par nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dofus-gold/50 focus:border-dofus-gold/50 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Type Filters + Sort */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Type Filters */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type d&apos;arme
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                      selectedType === 'all'
                        ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                    }`}
                  >
                    Toutes
                  </button>
                  {weaponTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                        selectedType === type
                          ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                      }`}
                    >
                      {getTypeLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Trier
                  </span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-dofus-gold/50 focus:border-dofus-gold/50 transition-all duration-200 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#1a1a2e] text-gray-300">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weapons Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredWeapons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Sword className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucune arme trouvee</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre ou terme de recherche
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredWeapons.length} resultat{filteredWeapons.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedType}-${sortBy}-${searchQuery}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredWeapons.map((item) => (
                  <WeaponCard key={item.id} item={item} />
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function WeaponCard({ item }: { item: Equipment }) {
  const statEntries = Object.entries(item.stats).filter(
    ([, val]) => val !== undefined
  ) as [string, number][];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-glass"
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-bold text-gray-200 group-hover:text-dofus-gold transition-colors duration-200 truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/20">
            {getTypeLabel(item.type)}
          </span>
          <span className="text-[11px] text-gray-500 font-mono">
            Niv. {item.level}
          </span>
        </div>
      </div>

      {/* Set Name */}
      {item.setName && (
        <p className="text-[10px] text-dofus-gold/70 mb-2 truncate">
          {item.setName}
        </p>
      )}

      {/* Stats */}
      <div className="space-y-1">
        {statEntries.map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className={`text-xs ${getStatColor(key)}`}>
              {getStatLabel(key)}
            </span>
            <span className="text-xs font-semibold text-gray-300">
              {value > 0 ? `+${value}` : value}
            </span>
          </div>
        ))}
      </div>

      {/* Conditions */}
      {item.conditions && (
        <div className="mt-3 pt-2 border-t border-white/5">
          <p className="text-[10px] text-gray-500">
            {item.conditions}
          </p>
        </div>
      )}

      {/* Drop info hint */}
      {item.dropMonsters && item.dropMonsters.length > 0 && (
        <div className="mt-2 pt-2 border-t border-white/5">
          <p className="text-[10px] text-emerald-500/70">
            Drop: {item.dropMonsters.map((d) => d.monsterName).join(', ')}
          </p>
        </div>
      )}
    </motion.div>
  );
}
