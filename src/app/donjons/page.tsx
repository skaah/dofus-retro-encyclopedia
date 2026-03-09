'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Castle, MapPin, Users, Swords, ArrowUpDown, SlidersHorizontal, Search, X } from 'lucide-react';
import { dungeons } from '@/data/dungeons';
import { getDifficultyColor } from '@/lib/utils';

type SortOption = 'level-asc' | 'level-desc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'level-asc', label: 'Niveau croissant' },
  { value: 'level-desc', label: 'Niveau décroissant' },
];

const zones = ['all', ...Array.from(new Set(dungeons.map((d) => d.zone)))];
const difficulties = ['all', 'facile', 'moyen', 'difficile', 'très difficile'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
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

export default function DonjonsPage() {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('level-asc');

  const filteredDungeons = useMemo(() => {
    let items = [...dungeons];

    if (selectedZone !== 'all') {
      items = items.filter((d) => d.zone === selectedZone);
    }

    if (selectedDifficulty !== 'all') {
      items = items.filter((d) => d.strategy.difficulty === selectedDifficulty);
    }

    switch (sortBy) {
      case 'level-asc':
        items.sort((a, b) => a.level - b.level);
        break;
      case 'level-desc':
        items.sort((a, b) => b.level - a.level);
        break;
    }

    return items;
  }, [selectedZone, selectedDifficulty, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20">
              <Castle className="w-6 h-6 text-dofus-gold" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Donjons & Stratégies
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {dungeons.length} donjons disponibles
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
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Zone Filter */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Zone
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {zones.map((zone) => (
                    <button
                      key={zone}
                      onClick={() => setSelectedZone(zone)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                        selectedZone === zone
                          ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                      }`}
                    >
                      {zone === 'all' ? 'Toutes' : zone}
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

            {/* Difficulty Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Difficulté
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                      selectedDifficulty === diff
                        ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                    }`}
                  >
                    {diff === 'all' ? 'Toutes' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dungeons Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDungeons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Castle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucun donjon trouvé</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredDungeons.length} résultat{filteredDungeons.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedZone}-${selectedDifficulty}-${sortBy}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredDungeons.map((dungeon) => (
                  <motion.div key={dungeon.id} variants={cardVariants}>
                    <Link href={`/donjons/${dungeon.slug}`}>
                      <div className="group relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-glass hover:-translate-y-1 h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-200 group-hover:text-dofus-gold transition-colors duration-200 truncate">
                              {dungeon.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-[11px] text-gray-500 font-mono">
                                Niv. {dungeon.level}
                              </span>
                              <span className="text-gray-700">|</span>
                              <span className="flex items-center gap-1 text-[11px] text-gray-500">
                                <MapPin className="w-3 h-3" />
                                {dungeon.zone}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`shrink-0 ml-2 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getDifficultyColor(
                              dungeon.strategy.difficulty
                            )}`}
                          >
                            {dungeon.strategy.difficulty.charAt(0).toUpperCase() +
                              dungeon.strategy.difficulty.slice(1)}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2">
                            <Swords className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-xs text-gray-400">
                              Boss: <span className="text-gray-300 font-medium">{dungeon.boss.name}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs text-gray-400">
                              Équipe: <span className="text-gray-300 font-medium">{dungeon.strategy.recommendedTeamSize} joueurs</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Castle className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs text-gray-400">
                              Monstres: <span className="text-gray-300 font-medium">{dungeon.monsters.length} types</span>
                            </span>
                          </div>
                        </div>

                        {/* Footer arrow */}
                        <div className="flex items-center justify-end pt-2 border-t border-white/5">
                          <span className="text-[10px] text-gray-500 group-hover:text-dofus-gold transition-colors duration-200">
                            Voir détails →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
