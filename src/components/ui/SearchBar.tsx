'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { searchAll } from '@/lib/utils';
import type { SearchResult } from '@/types';

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    equipment: 'Equipement',
    weapon: 'Arme',
    dungeon: 'Donjon',
    quest: 'Quete',
    achievement: 'Succes',
    profession: 'Metier',
    class: 'Classe',
    drop: 'Zone de drop',
  };
  return labels[type] || type;
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    equipment: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    weapon: 'bg-red-500/20 text-red-400 border-red-500/30',
    dungeon: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    quest: 'bg-green-500/20 text-green-400 border-green-500/30',
    achievement: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    profession: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    class: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    drop: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };
  return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}

function getResultHref(result: SearchResult): string {
  const typeRoutes: Record<string, string> = {
    equipment: '/equipements',
    weapon: '/armes',
    dungeon: '/donjons',
    quest: '/quetes',
    achievement: '/succes',
    profession: '/metiers',
    class: '/classes',
    drop: '/drops',
  };
  const base = typeRoutes[result.type] || '/';
  return `${base}/${result.slug}`;
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({
  placeholder = 'Rechercher un equipement, donjon, quete...',
  className = '',
  size = 'md',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback((searchQuery: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      const searchResults = searchAll(searchQuery);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0 && searchQuery.trim().length > 0);
    }, 250);
  }, []);

  useEffect(() => {
    performSearch(query);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, performSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  const sizeClasses = {
    sm: 'py-2 pl-9 pr-9 text-sm',
    md: 'py-3 pl-11 pr-11 text-base',
    lg: 'py-4 pl-14 pr-14 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconPositions = {
    sm: 'left-3',
    md: 'left-3.5',
    lg: 'left-4',
  };

  const clearPositions = {
    sm: 'right-3',
    md: 'right-3.5',
    lg: 'right-4',
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input Container */}
      <div className="relative">
        <Search
          className={`absolute top-1/2 -translate-y-1/2 ${iconPositions[size]} ${iconSizes[size]} text-gray-400 transition-colors duration-200 ${
            isFocused ? 'text-dofus-gold' : ''
          }`}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (results.length > 0 && query.trim().length > 0) {
              setIsOpen(true);
            }
          }}
          className={`w-full ${sizeClasses[size]} rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dofus-gold/50 focus:border-dofus-gold/50 focus:bg-white/10 transition-all duration-300 ${
            isFocused ? 'shadow-glow-gold' : ''
          }`}
        />
        <AnimatePresence>
          {query.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              className={`absolute top-1/2 -translate-y-1/2 ${clearPositions[size]} p-0.5 rounded-full text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors duration-200`}
            >
              <X className={iconSizes[size]} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 w-full mt-2 rounded-xl backdrop-blur-2xl bg-black/80 border border-white/10 shadow-glass-lg overflow-hidden"
          >
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <motion.div
                  key={`${result.type}-${result.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                >
                  <Link
                    href={getResultHref(result)}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-200 border-b border-white/5 last:border-b-0 group"
                  >
                    {/* Type Badge */}
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getTypeColor(
                        result.type
                      )}`}
                    >
                      {getTypeLabel(result.type)}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200 group-hover:text-dofus-gold transition-colors duration-200 truncate">
                        {result.name}
                      </p>
                      {result.category && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {result.category}
                        </p>
                      )}
                    </div>

                    {/* Level */}
                    {result.level !== undefined && (
                      <span className="shrink-0 text-xs text-gray-500 font-mono">
                        Niv. {result.level}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/5 bg-white/[0.02]">
              <p className="text-xs text-gray-500 text-center">
                {results.length} resultat{results.length > 1 ? 's' : ''} trouv{results.length > 1 ? 'es' : 'e'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results state */}
      <AnimatePresence>
        {isFocused && query.trim().length > 1 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 rounded-xl backdrop-blur-2xl bg-black/80 border border-white/10 shadow-glass-lg"
          >
            <div className="px-4 py-6 text-center">
              <Search className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Aucun resultat pour &quot;{query}&quot;</p>
              <p className="text-xs text-gray-600 mt-1">Essayez un autre terme de recherche</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
