'use client';

import { motion } from 'framer-motion';
import { X, ArrowLeftRight } from 'lucide-react';
import { Equipment } from '@/types';
import { getStatLabel, getStatColor, getTypeLabel } from '@/lib/utils';

interface ComparisonPanelProps {
  items: [Equipment, Equipment];
  onClose: () => void;
}

export default function ComparisonPanel({ items, onClose }: ComparisonPanelProps) {
  const [itemA, itemB] = items;

  // Collect all stat keys from both items
  const allStatKeys = new Set<string>();
  Object.keys(itemA.stats).forEach((key) => {
    if (itemA.stats[key] !== undefined) allStatKeys.add(key);
  });
  Object.keys(itemB.stats).forEach((key) => {
    if (itemB.stats[key] !== undefined) allStatKeys.add(key);
  });

  const statKeys = Array.from(allStatKeys);

  function getComparisonColor(valA: number | undefined, valB: number | undefined, side: 'a' | 'b'): string {
    const a = valA ?? 0;
    const b = valB ?? 0;
    if (a === b) return 'text-gray-300';
    if (side === 'a') {
      return a > b ? 'text-green-400' : 'text-red-400';
    }
    return b > a ? 'text-green-400' : 'text-red-400';
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-glass-lg"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-5 h-5 text-dofus-gold" />
            <h2 className="text-lg font-bold text-gray-200">
              Comparaison d&apos;objets
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Item Headers */}
        <div className="grid grid-cols-[1fr_1fr] gap-0 border-b border-white/10">
          {[itemA, itemB].map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 ${idx === 0 ? 'border-r border-white/10' : ''}`}
            >
              <h3 className="text-base font-bold text-dofus-gold mb-1 truncate">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20">
                  {getTypeLabel(item.type)}
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  Niv. {item.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Comparison */}
        <div className="divide-y divide-white/5">
          {statKeys.map((key, index) => {
            const valA = itemA.stats[key];
            const valB = itemB.stats[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="grid grid-cols-[1fr_auto_1fr] items-center hover:bg-white/[0.03] transition-colors duration-150"
              >
                {/* Item A value */}
                <div className="px-5 py-3 text-right">
                  <span className={`text-sm font-semibold ${getComparisonColor(valA, valB, 'a')}`}>
                    {valA !== undefined ? (valA > 0 ? `+${valA}` : valA) : '-'}
                  </span>
                </div>

                {/* Stat label */}
                <div className="px-4 py-3 text-center min-w-[140px]">
                  <span className={`text-xs font-medium ${getStatColor(key)}`}>
                    {getStatLabel(key)}
                  </span>
                </div>

                {/* Item B value */}
                <div className="px-5 py-3 text-left">
                  <span className={`text-sm font-semibold ${getComparisonColor(valA, valB, 'b')}`}>
                    {valB !== undefined ? (valB > 0 ? `+${valB}` : valB) : '-'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="grid grid-cols-2 gap-4">
            {[itemA, itemB].map((item) => {
              const totalStats = Object.values(item.stats).reduce<number>(
                (sum, val) => sum + (val ?? 0),
                0
              );
              return (
                <div key={item.id} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total des stats</p>
                  <p className="text-lg font-bold text-gray-200">{totalStats}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
