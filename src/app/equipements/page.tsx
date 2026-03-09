'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, SlidersHorizontal, ArrowUpDown, X, ArrowLeftRight } from 'lucide-react';
import { equipment } from '@/data/equipment';
import { getStatLabel, getStatColor, getTypeLabel } from '@/lib/utils';
import ComparisonPanel from '@/components/equipment/ComparisonPanel';
import type { Equipment, EquipmentType } from '@/types';

const equipmentTypes: EquipmentType[] = [
  'amulette', 'anneau', 'bottes', 'cape', 'ceinture',
  'chapeau', 'bouclier', 'dofus', 'familier',
];

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

export default function EquipementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<EquipmentType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('level-asc');
  const [comparisonItems, setComparisonItems] = useState<Equipment[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredEquipment = useMemo(() => {
    let items = [...equipment];

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((item) =>
        item.name.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      items = items.filter((item) => item.type === selectedType);
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

  function toggleComparison(item: Equipment) {
    setComparisonItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      if (prev.length >= 2) {
        return [prev[1], item];
      }
      return [...prev, item];
    });
  }

  function isSelectedForComparison(itemId: string): boolean {
    return comparisonItems.some((i) => i.id === itemId);
  }

  function openComparison() {
    if (comparisonItems.length === 2) {
      setShowComparison(true);
    }
  }

  function clearComparison() {
    setComparisonItems([]);
    setShowComparison(false);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Equipements
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {equipment.length} equipements disponibles
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
                placeholder="Rechercher un equipement par nom..."
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
                    Type
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
                    Tous
                  </button>
                  {equipmentTypes.map((type) => (
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

      {/* Comparison Floating Bar */}
      <AnimatePresence>
        {comparisonItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl bg-white/10 border border-dofus-gold/30 shadow-glow-gold">
              <ArrowLeftRight className="w-5 h-5 text-dofus-gold" />
              <span className="text-sm font-medium text-gray-200">
                {comparisonItems.length}/2 selectionne{comparisonItems.length > 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2">
                {comparisonItems.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20 max-w-[120px] truncate"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <button
                onClick={openComparison}
                disabled={comparisonItems.length < 2}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  comparisonItems.length === 2
                    ? 'bg-dofus-gold text-black hover:bg-dofus-gold/90'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Comparer
              </button>
              <button
                onClick={clearComparison}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Equipment Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEquipment.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucun equipement trouve</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre ou terme de recherche
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredEquipment.length} resultat{filteredEquipment.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedType}-${sortBy}-${searchQuery}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredEquipment.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    item={item}
                    isComparing={isSelectedForComparison(item.id)}
                    onToggleCompare={() => toggleComparison(item)}
                  />
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && comparisonItems.length === 2 && (
          <ComparisonPanel
            items={comparisonItems as [Equipment, Equipment]}
            onClose={() => setShowComparison(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EquipmentCard({
  item,
  isComparing,
  onToggleCompare,
}: {
  item: Equipment;
  isComparing: boolean;
  onToggleCompare: () => void;
}) {
  const statEntries = Object.entries(item.stats).filter(
    ([, val]) => val !== undefined
  ) as [string, number][];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group rounded-2xl backdrop-blur-xl bg-white/5 border p-5 transition-all duration-300 hover:bg-white/[0.08] hover:shadow-glass ${
        isComparing
          ? 'border-dofus-gold/40 shadow-glow-gold'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Comparison Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleCompare();
        }}
        className={`absolute top-3 right-3 w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-200 ${
          isComparing
            ? 'bg-dofus-gold border-dofus-gold text-black'
            : 'bg-white/5 border-white/20 text-transparent hover:border-dofus-gold/50 group-hover:text-gray-500'
        }`}
        title="Selectionner pour comparer"
      >
        {isComparing && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-bold text-gray-200 group-hover:text-dofus-gold transition-colors duration-200 pr-8 truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
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
    </motion.div>
  );
}
