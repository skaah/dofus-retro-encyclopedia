'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Swords, Shield, Heart, Zap, Star, ChevronRight } from 'lucide-react';
import { classes } from '@/data/classes';
import { getRoleLabel, getRoleColor } from '@/lib/utils';
import type { ClassRole } from '@/types';

const roles: ('all' | ClassRole)[] = ['all', 'dps', 'tank', 'support', 'heal', 'placement', 'entrave'];

function getElementBadgeColor(element: string): string {
  switch (element.toLowerCase()) {
    case 'terre':
    case 'force':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'feu':
    case 'intelligence':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'eau':
    case 'chance':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    case 'air':
    case 'agilité':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
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

export default function ClassesPage() {
  const [selectedRole, setSelectedRole] = useState<'all' | ClassRole>('all');

  const filteredClasses = useMemo(() => {
    if (selectedRole === 'all') return classes;
    return classes.filter((c) => c.role.includes(selectedRole));
  }, [selectedRole]);

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
              <Users className="w-6 h-6 text-dofus-gold" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                Classes du Jeu
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {classes.length} classes disponibles
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
              <Swords className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rôle
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    selectedRole === role
                      ? 'bg-dofus-gold/20 text-dofus-gold border-dofus-gold/30'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
                  }`}
                >
                  {role === 'all' ? 'Tous' : getRoleLabel(role)}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredClasses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucune classe trouvée</p>
              <p className="text-gray-600 text-sm mt-1">
                Essayez un autre filtre
              </p>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredClasses.length} résultat{filteredClasses.length > 1 ? 's' : ''}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={selectedRole}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredClasses.map((gameClass) => (
                  <motion.div key={gameClass.id} variants={cardVariants}>
                    <Link href={`/classes/${gameClass.slug}`}>
                      <div className="group relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-glass hover:-translate-y-1 h-full flex flex-col">
                        {/* Header */}
                        <div className="mb-3">
                          <h3 className="text-sm font-bold text-gray-200 group-hover:text-dofus-gold transition-colors duration-200">
                            {gameClass.name}
                          </h3>
                        </div>

                        {/* Role badges */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {gameClass.role.map((role) => (
                            <span
                              key={role}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getRoleColor(role)}`}
                            >
                              {getRoleLabel(role)}
                            </span>
                          ))}
                        </div>

                        {/* Element badges */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {gameClass.element.map((el) => (
                            <span
                              key={el}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${getElementBadgeColor(el)}`}
                            >
                              {el}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-3">
                          {gameClass.description}
                        </p>

                        {/* Footer arrow */}
                        <div className="flex items-center justify-end pt-2 border-t border-white/5">
                          <span className="flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-dofus-gold transition-colors duration-200">
                            Voir détails
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
