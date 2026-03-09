'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  ChevronDown,
  ChevronUp,
  Sword,
  Pickaxe,
  Percent,
  Target,
  TreePine,
  Filter,
  X,
  ArrowUpDown,
} from 'lucide-react';
import { dropZones } from '@/data/drops';
import type { DropZone, DropMonster, DropResource } from '@/types';

type SortOption = 'level-asc' | 'level-desc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'level-asc', label: 'Niveau croissant' },
  { value: 'level-desc', label: 'Niveau décroissant' },
];

function parseLevelRange(range: string): { min: number; max: number } {
  const parts = range.split('-').map(Number);
  return { min: parts[0] ?? 0, max: parts[1] ?? parts[0] ?? 0 };
}

function getDropRateColor(rate: number): string {
  if (rate > 20) return 'bg-emerald-500';
  if (rate >= 5) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getDropRateTextColor(rate: number): string {
  if (rate > 20) return 'text-emerald-400';
  if (rate >= 5) return 'text-yellow-400';
  return 'text-red-400';
}

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

export default function DropsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubArea, setSelectedSubArea] = useState<string>('all');
  const [minLevel, setMinLevel] = useState('');
  const [maxLevel, setMaxLevel] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('level-asc');
  const [expandedZone, setExpandedZone] = useState<string | null>(null);

  const subAreas = useMemo(() => {
    const areas = Array.from(new Set(dropZones.map((z) => z.subArea)));
    areas.sort((a, b) => a.localeCompare(b, 'fr'));
    return ['all', ...areas];
  }, []);

  const filteredZones = useMemo(() => {
    let items = [...dropZones];

    // Search by zone name or monster name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (zone) =>
          zone.name.toLowerCase().includes(q) ||
          zone.monsters.some((m) => m.name.toLowerCase().includes(q))
      );
    }

    // Filter by sub-area
    if (selectedSubArea !== 'all') {
      items = items.filter((zone) => zone.subArea === selectedSubArea);
    }

    // Filter by level range
    const parsedMin = minLevel ? parseInt(minLevel, 10) : null;
    const parsedMax = maxLevel ? parseInt(maxLevel, 10) : null;

    if (parsedMin !== null && !isNaN(parsedMin)) {
      items = items.filter((zone) => {
        const range = parseLevelRange(zone.levelRange);
        return range.max >= parsedMin;
      });
    }

    if (parsedMax !== null && !isNaN(parsedMax)) {
      items = items.filter((zone) => {
        const range = parseLevelRange(zone.levelRange);
        return range.min <= parsedMax;
      });
    }

    // Sort by level range
    switch (sortBy) {
      case 'level-asc':
        items.sort(
          (a, b) =>
            parseLevelRange(a.levelRange).min - parseLevelRange(b.levelRange).min
        );
        break;
      case 'level-desc':
        items.sort(
          (a, b) =>
            parseLevelRange(b.levelRange).min - parseLevelRange(a.levelRange).min
        );
        break;
    }

    return items;
  }, [searchQuery, selectedSubArea, minLevel, maxLevel, sortBy]);

  function toggleExpand(zoneId: string) {
    setExpandedZone((prev) => (prev === zoneId ? null : zoneId));
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20">
              <MapPin className="w-6 h-6 text-dofus-gold" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Drops & Zones de Farm
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {dropZones.length} zones disponibles
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
                placeholder="Rechercher une zone ou un monstre..."
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

            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Sub-Area Filter */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Sous-zone
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => setSelectedSubArea(area)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                        selectedSubArea === area
                          ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                      }`}
                    >
                      {area === 'all' ? 'Toutes' : area}
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

            {/* Level Range Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Plage de niveau
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Min"
                  value={minLevel}
                  onChange={(e) => setMinLevel(e.target.value.replace(/\D/g, ''))}
                  className="w-24 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-dofus-gold/50 focus:border-dofus-gold/50 transition-all duration-200"
                />
                <span className="text-gray-600 text-xs">-</span>
                <input
                  type="text"
                  placeholder="Max"
                  value={maxLevel}
                  onChange={(e) => setMaxLevel(e.target.value.replace(/\D/g, ''))}
                  className="w-24 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-dofus-gold/50 focus:border-dofus-gold/50 transition-all duration-200"
                />
                {(minLevel || maxLevel) && (
                  <button
                    onClick={() => {
                      setMinLevel('');
                      setMaxLevel('');
                    }}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Zone Cards */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredZones.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucune zone trouvée</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre ou terme de recherche
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredZones.length} résultat{filteredZones.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedSubArea}-${sortBy}-${searchQuery}-${minLevel}-${maxLevel}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              >
                {filteredZones.map((zone) => (
                  <motion.div key={zone.id} variants={cardVariants}>
                    <DropZoneCard
                      zone={zone}
                      isExpanded={expandedZone === zone.id}
                      onToggle={() => toggleExpand(zone.id)}
                    />
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

function DropZoneCard({
  zone,
  isExpanded,
  onToggle,
}: {
  zone: DropZone;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl backdrop-blur-xl bg-white/5 border transition-all duration-300 overflow-hidden ${
        isExpanded
          ? 'border-dofus-gold/30 shadow-glow-gold'
          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-glass'
      }`}
    >
      {/* Card Header - clickable */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-200 group-hover:text-dofus-gold transition-colors duration-200">
              {zone.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/20">
                {zone.subArea}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                Niv. {zone.levelRange}
              </span>
              {zone.coordinates && (
                <span className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                  <MapPin className="w-3 h-3" />
                  [{zone.coordinates}]
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 ml-2 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Sword className="w-3.5 h-3.5" />
              {zone.monsters.length}
            </span>
            {zone.resources.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <TreePine className="w-3.5 h-3.5" />
                {zone.resources.length}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>
            {zone.monsters.reduce((acc, m) => acc + m.drops.length, 0)} drops
          </span>
          {zone.resources.length > 0 && (
            <span>{zone.resources.length} ressource{zone.resources.length > 1 ? 's' : ''}</span>
          )}
        </div>

        {/* Expand indicator */}
        <div className="flex items-center justify-end mt-2">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-dofus-gold transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5 border-t border-white/10 pt-4">
              {/* Monsters Subsection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sword className="w-4 h-4 text-red-400" />
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Monstres & Drops
                  </h4>
                </div>
                <div className="space-y-4">
                  {zone.monsters.map((monster, mIdx) => (
                    <MonsterDropTable key={mIdx} monster={monster} />
                  ))}
                </div>
              </div>

              {/* Resources Subsection */}
              {zone.resources.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Pickaxe className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Ressources
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {zone.resources.map((resource, rIdx) => (
                      <ResourceRow key={rIdx} resource={resource} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MonsterDropTable({ monster }: { monster: DropMonster }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
      {/* Monster Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Sword className="w-3.5 h-3.5 text-red-400" />
          <span className="text-xs font-bold text-gray-200">{monster.name}</span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">
          Niv. {monster.level}
        </span>
      </div>

      {/* Drop Table */}
      <div className="space-y-1.5">
        {monster.drops.map((drop, dIdx) => (
          <div key={dIdx} className="flex items-center gap-3">
            <span className="text-xs text-gray-400 flex-1 min-w-0 truncate">
              {drop.itemName}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {/* Percentage bar */}
              <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(drop.dropRate, 100)}%` }}
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getDropRateColor(drop.dropRate)}`}
                />
              </div>
              <span
                className={`text-[10px] font-semibold w-10 text-right ${getDropRateTextColor(
                  drop.dropRate
                )}`}
              >
                {drop.dropRate}%
              </span>
              <Percent className="w-2.5 h-2.5 text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourceRow({ resource }: { resource: DropResource }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5">
      <div className="flex items-center gap-2 min-w-0">
        <TreePine className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-xs text-gray-300 truncate">{resource.name}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {resource.type}
        </span>
        {resource.profession && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20">
            <Pickaxe className="w-2.5 h-2.5" />
            {resource.profession}
          </span>
        )}
      </div>
    </div>
  );
}
