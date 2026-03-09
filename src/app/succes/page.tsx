'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Star,
  Clock,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Target,
  Award,
  Coins,
  Gift,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { achievements } from '@/data/achievements';
import { getDifficultyColor } from '@/lib/utils';
import type { Achievement, AchievementCategory } from '@/types';

type SortOption = 'points-desc' | 'points-asc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'points-desc', label: 'Points (haut en bas)' },
  { value: 'points-asc', label: 'Points (bas en haut)' },
];

const categories: { value: AchievementCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'exploration', label: 'Exploration' },
  { value: 'combat', label: 'Combat' },
  { value: 'quete', label: 'Quete' },
  { value: 'donjon', label: 'Donjon' },
  { value: 'metier', label: 'Metier' },
  { value: 'collection', label: 'Collection' },
  { value: 'social', label: 'Social' },
  { value: 'divers', label: 'Divers' },
];

function getCategoryColor(category: AchievementCategory): string {
  switch (category) {
    case 'exploration':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    case 'combat':
      return 'text-red-400 bg-red-400/10 border-red-400/30';
    case 'quete':
      return 'text-green-400 bg-green-400/10 border-green-400/30';
    case 'donjon':
      return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
    case 'metier':
      return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    case 'collection':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    case 'social':
      return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
    case 'divers':
      return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
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

export default function SuccesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('points-desc');
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(null);

  const filteredAchievements = useMemo(() => {
    let items = [...achievements];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((a) => a.name.toLowerCase().includes(q));
    }

    if (selectedCategory !== 'all') {
      items = items.filter((a) => a.category === selectedCategory);
    }

    switch (sortBy) {
      case 'points-desc':
        items.sort((a, b) => b.points - a.points);
        break;
      case 'points-asc':
        items.sort((a, b) => a.points - b.points);
        break;
    }

    return items;
  }, [searchQuery, selectedCategory, sortBy]);

  function toggleExpand(achievementId: string) {
    setExpandedAchievement((prev) => (prev === achievementId ? null : achievementId));
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20">
              <Trophy className="w-6 h-6 text-dofus-gold" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Succes
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {achievements.length} succes disponibles
              </p>
            </div>
          </motion.div>

          {/* Announcement Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-dofus-gold/5 border border-dofus-gold/20 p-4 md:p-5">
              <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-r from-dofus-gold/0 via-dofus-gold/10 to-dofus-gold/0" />
              <div className="relative flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5 text-dofus-gold animate-pulse" />
                <p className="text-sm md:text-base font-bold text-dofus-gold text-center">
                  Les succes arrivent le 31 Mars 2026 !
                </p>
                <Sparkles className="w-5 h-5 text-dofus-gold animate-pulse" />
              </div>
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
                placeholder="Rechercher un succes par nom..."
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
                    Categorie
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

      {/* Achievements Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAchievements.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucun succes trouve</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre ou terme de recherche
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredAchievements.length} resultat{filteredAchievements.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedCategory}-${sortBy}-${searchQuery}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredAchievements.map((achievement) => (
                  <motion.div key={achievement.id} variants={cardVariants}>
                    <AchievementCard
                      achievement={achievement}
                      isExpanded={expandedAchievement === achievement.id}
                      onToggle={() => toggleExpand(achievement.id)}
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

function AchievementCard({
  achievement,
  isExpanded,
  onToggle,
}: {
  achievement: Achievement;
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
              {achievement.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="flex items-center gap-1 text-[11px] text-dofus-gold font-semibold">
                <Star className="w-3 h-3 fill-dofus-gold text-dofus-gold" />
                {achievement.points} pts
              </span>
            </div>
          </div>
          <span
            className={`shrink-0 ml-2 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getCategoryColor(
              achievement.category
            )}`}
          >
            {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
          {achievement.description}
        </p>

        {/* Objectives preview */}
        <div className="space-y-1 mb-3">
          {achievement.objectives.slice(0, 2).map((obj, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-gray-500 shrink-0 mt-0.5" />
              <span className="text-[11px] text-gray-500 line-clamp-1">{obj}</span>
            </div>
          ))}
          {achievement.objectives.length > 2 && (
            <span className="text-[10px] text-gray-600 pl-5">
              +{achievement.objectives.length - 2} autre{achievement.objectives.length - 2 > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Reward preview & guide indicator */}
        <div className="flex items-center gap-3 flex-wrap">
          {achievement.reward.title && (
            <span className="flex items-center gap-1 text-[10px] text-purple-400">
              <Award className="w-3 h-3" />
              Titre
            </span>
          )}
          {achievement.reward.ornament && (
            <span className="flex items-center gap-1 text-[10px] text-pink-400">
              <Sparkles className="w-3 h-3" />
              Ornement
            </span>
          )}
          {achievement.reward.kamas && (
            <span className="flex items-center gap-1 text-[10px] text-dofus-gold">
              <Coins className="w-3 h-3" />
              {achievement.reward.kamas.toLocaleString()} K
            </span>
          )}
          {achievement.reward.items && achievement.reward.items.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-cyan-400">
              <Gift className="w-3 h-3" />
              {achievement.reward.items.length} objet{achievement.reward.items.length > 1 ? 's' : ''}
            </span>
          )}
          {achievement.guide && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 ml-auto">
              <BookOpen className="w-3 h-3" />
              Guide disponible
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
              {/* Full Description */}
              <p className="text-sm text-gray-400 leading-relaxed">{achievement.description}</p>

              {/* All Objectives */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Objectifs
                </h4>
                <div className="space-y-1.5">
                  {achievement.objectives.map((obj, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-dofus-gold shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-300">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Recompenses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {achievement.reward.title && (
                    <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {achievement.reward.title}
                    </span>
                  )}
                  {achievement.reward.ornament && (
                    <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {achievement.reward.ornament}
                    </span>
                  )}
                  {achievement.reward.kamas && (
                    <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20 flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      {achievement.reward.kamas.toLocaleString()} Kamas
                    </span>
                  )}
                  {achievement.reward.items?.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1"
                    >
                      <Gift className="w-3 h-3" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guide */}
              {achievement.guide && (
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-gray-200">Guide</h4>

                    {/* Difficulty badge */}
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getDifficultyColor(
                        achievement.guide.difficulty
                      )}`}
                    >
                      {achievement.guide.difficulty.charAt(0).toUpperCase() +
                        achievement.guide.difficulty.slice(1)}
                    </span>

                    {/* Estimated time */}
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-gray-500">
                      <Clock className="w-3 h-3" />
                      {achievement.guide.estimatedTime}
                    </span>
                  </div>

                  {/* Guide Steps */}
                  <div className="space-y-2.5 mb-4">
                    {achievement.guide.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-dofus-gold/10 border border-dofus-gold/20 flex items-center justify-center text-[9px] font-bold text-dofus-gold mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-xs text-gray-300 flex-1">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Guide Tips */}
                  {achievement.guide.tips.length > 0 && (
                    <div>
                      <h5 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Conseils
                      </h5>
                      <div className="space-y-1.5">
                        {achievement.guide.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2">
                            {index % 2 === 0 ? (
                              <Lightbulb className="w-3 h-3 text-dofus-gold shrink-0 mt-0.5" />
                            ) : (
                              <Star className="w-3 h-3 text-dofus-gold shrink-0 mt-0.5" />
                            )}
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
