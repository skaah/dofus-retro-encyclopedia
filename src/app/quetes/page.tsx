'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScrollText,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  MapPin,
  Target,
  BookOpen,
  Star,
  Clock,
  ChevronRight,
  Swords,
  Users,
} from 'lucide-react';
import { quests } from '@/data/quests';
import type { Quest, QuestCategory } from '@/types';

type SortOption = 'level-asc' | 'level-desc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'level-asc', label: 'Niveau croissant' },
  { value: 'level-desc', label: 'Niveau décroissant' },
];

const categories: { value: QuestCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'principale', label: 'Principale' },
  { value: 'secondaire', label: 'Secondaire' },
  { value: 'classe', label: 'Classe' },
  { value: 'alignement', label: 'Alignement' },
  { value: 'temporis', label: 'Temporis' },
];

function getCategoryColor(category: QuestCategory): string {
  switch (category) {
    case 'principale':
      return 'text-dofus-gold bg-dofus-gold/10 border-dofus-gold/30';
    case 'secondaire':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    case 'classe':
      return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
    case 'alignement':
      return 'text-red-400 bg-red-400/10 border-red-400/30';
    case 'temporis':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  }
}

function getObjectiveIcon(type: string) {
  switch (type) {
    case 'kill':
      return <Swords className="w-3 h-3 text-red-400" />;
    case 'collect':
      return <Target className="w-3 h-3 text-yellow-400" />;
    case 'talk':
      return <Users className="w-3 h-3 text-blue-400" />;
    case 'explore':
      return <MapPin className="w-3 h-3 text-green-400" />;
    case 'craft':
      return <Star className="w-3 h-3 text-purple-400" />;
    default:
      return <ChevronRight className="w-3 h-3 text-gray-400" />;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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

export default function QuetesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('level-asc');
  const [expandedQuest, setExpandedQuest] = useState<string | null>(null);

  const filteredQuests = useMemo(() => {
    let items = [...quests];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((quest) => quest.name.toLowerCase().includes(q));
    }

    if (selectedCategory !== 'all') {
      items = items.filter((quest) => quest.category === selectedCategory);
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
  }, [searchQuery, selectedCategory, sortBy]);

  function toggleExpand(questId: string) {
    setExpandedQuest((prev) => (prev === questId ? null : questId));
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20">
              <ScrollText className="w-6 h-6 text-dofus-gold" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Quêtes & Guides
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {quests.length} quêtes disponibles
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
                placeholder="Rechercher une quête par nom..."
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
              {/* Category Filter */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Catégorie
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                        selectedCategory === cat.value
                          ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                      }`}
                    >
                      {cat.label}
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

      {/* Quests Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredQuests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ScrollText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucune quête trouvée</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre ou terme de recherche
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredQuests.length} résultat{filteredQuests.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedCategory}-${sortBy}-${searchQuery}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredQuests.map((quest) => (
                  <motion.div key={quest.id} variants={cardVariants}>
                    <QuestCard
                      quest={quest}
                      isExpanded={expandedQuest === quest.id}
                      onToggle={() => toggleExpand(quest.id)}
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

function QuestCard({
  quest,
  isExpanded,
  onToggle,
}: {
  quest: Quest;
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
            <h3 className="text-sm font-bold text-gray-200 group-hover:text-dofus-gold transition-colors duration-200 truncate">
              {quest.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] text-gray-500 font-mono">
                Niv. {quest.level}
              </span>
              {quest.zone && (
                <>
                  <span className="text-gray-700">|</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {quest.zone}
                  </span>
                </>
              )}
            </div>
          </div>
          <span
            className={`shrink-0 ml-2 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getCategoryColor(
              quest.category
            )}`}
          >
            {quest.category.charAt(0).toUpperCase() + quest.category.slice(1)}
          </span>
        </div>

        {/* Summary info */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Target className="w-3 h-3" />
            {quest.objectives.length} objectif{quest.objectives.length > 1 ? 's' : ''}
          </span>
          {quest.guide && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <BookOpen className="w-3 h-3" />
              Guide
            </span>
          )}
        </div>

        {/* Expand indicator */}
        <div className="flex items-center justify-end mt-2">
          <ChevronRight
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
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
            <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">{quest.description}</p>

              {/* Objectives */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Objectifs
                </h4>
                <div className="space-y-1.5">
                  {quest.objectives.map((obj, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {getObjectiveIcon(obj.type)}
                      <span className="text-xs text-gray-300">
                        {obj.description}
                        {obj.quantity && obj.quantity > 1 && (
                          <span className="text-gray-500"> (x{obj.quantity})</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Récompenses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {quest.rewards.xp && (
                    <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {quest.rewards.xp.toLocaleString()} XP
                    </span>
                  )}
                  {quest.rewards.kamas && (
                    <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20">
                      {quest.rewards.kamas.toLocaleString()} Kamas
                    </span>
                  )}
                  {quest.rewards.items?.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      {item}
                    </span>
                  ))}
                  {quest.rewards.emotes?.map((emote) => (
                    <span
                      key={emote}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20"
                    >
                      {emote}
                    </span>
                  ))}
                  {quest.rewards.spells?.map((spell) => (
                    <span
                      key={spell}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    >
                      {spell}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {quest.prerequisites && quest.prerequisites.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Prérequis
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {quest.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="px-2 py-1 rounded-lg text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Guide */}
              {quest.guide && (
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-gray-200">Guide pas à pas</h4>
                    {quest.guide.estimatedTime && (
                      <span className="ml-auto flex items-center gap-1 text-[10px] text-gray-500">
                        <Clock className="w-3 h-3" />
                        {quest.guide.estimatedTime}
                      </span>
                    )}
                  </div>

                  {/* Guide Steps */}
                  <div className="space-y-2.5 mb-4">
                    {quest.guide.steps.map((step) => (
                      <div key={step.order} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[9px] font-bold text-emerald-400 mt-0.5">
                          {step.order}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-300">{step.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {step.location && (
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <MapPin className="w-2.5 h-2.5" />
                                {step.location}
                              </span>
                            )}
                            {step.npc && (
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <Users className="w-2.5 h-2.5" />
                                {step.npc}
                              </span>
                            )}
                            {step.coordinates && (
                              <span className="text-[10px] text-gray-600 font-mono">
                                [{step.coordinates.x}, {step.coordinates.y}]
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Guide Tips */}
                  {quest.guide.tips.length > 0 && (
                    <div>
                      <h5 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Conseils
                      </h5>
                      <div className="space-y-1.5">
                        {quest.guide.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Star className="w-3 h-3 text-dofus-gold shrink-0 mt-0.5" />
                            <p className="text-[11px] text-gray-400">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
