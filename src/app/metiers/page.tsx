'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hammer, Clock, MapPin, ChevronRight, Pickaxe, Wrench } from 'lucide-react';
import { professions } from '@/data/professions';

type ProfessionFilter = 'all' | 'recolte' | 'artisanat';

const filterOptions: { value: ProfessionFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'recolte', label: 'Récolte' },
  { value: 'artisanat', label: 'Artisanat' },
];

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

function getTypeColor(type: string): string {
  switch (type) {
    case 'recolte':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'artisanat':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'recolte':
      return 'Récolte';
    case 'artisanat':
      return 'Artisanat';
    default:
      return type;
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'recolte':
      return <Pickaxe className="w-3.5 h-3.5" />;
    case 'artisanat':
      return <Wrench className="w-3.5 h-3.5" />;
    default:
      return null;
  }
}

export default function MetiersPage() {
  const [selectedType, setSelectedType] = useState<ProfessionFilter>('all');

  const filteredProfessions = useMemo(() => {
    if (selectedType === 'all') return professions;
    return professions.filter((p) => p.type === selectedType);
  }, [selectedType]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20">
              <Hammer className="w-6 h-6 text-dofus-gold" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Métiers & Guides
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {professions.length} métiers disponibles
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
            className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-4 md:p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Hammer className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Type de métier
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedType(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    selectedType === option.value
                      ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professions Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProfessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Hammer className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucun métier trouvé</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredProfessions.length} résultat{filteredProfessions.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={selectedType}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredProfessions.map((profession) => (
                  <motion.div key={profession.id} variants={cardVariants}>
                    <Link href={`/metiers/${profession.slug}`}>
                      <div className="group relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-glass hover:-translate-y-1 h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-200 group-hover:text-dofus-gold transition-colors duration-200 truncate">
                              {profession.name}
                            </h3>
                          </div>
                          <span
                            className={`shrink-0 ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getTypeColor(
                              profession.type
                            )}`}
                          >
                            {getTypeIcon(profession.type)}
                            {getTypeLabel(profession.type)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                          {profession.description}
                        </p>

                        {/* Info */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs text-gray-400">
                              Ateliers: <span className="text-gray-300 font-medium">{profession.workshops.length}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs text-gray-400">
                              Temps estimé: <span className="text-gray-300 font-medium">{profession.levelingGuide.estimatedTime}</span>
                            </span>
                          </div>
                        </div>

                        {/* Footer arrow */}
                        <div className="flex items-center justify-end pt-2 border-t border-white/5">
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-dofus-gold transition-colors duration-200">
                            Voir le guide
                            <ChevronRight className="w-3 h-3" />
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
