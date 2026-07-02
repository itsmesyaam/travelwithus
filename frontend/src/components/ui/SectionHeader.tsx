import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  badge?: string;
  action?: React.ReactNode;
}

/**
 * Reusable animated section header with scroll-reveal effect.
 * Displays title, optional subtitle/badge/description, and an action slot.
 */
export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  badge,
  action,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase
                     bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 mb-4"
        >
          {badge}
        </motion.span>
      )}

      {subtitle && (
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
          {subtitle}
        </p>
      )}

      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold',
          'text-gray-900 dark:text-white',
          'leading-tight'
        )}
      >
        {title}
      </h2>

      {/* Animated underline accent */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: align === 'center' ? 80 : 60 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 mt-4',
          align === 'center' && 'mx-auto'
        )}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={cn(
            'mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed',
            align === 'center' && 'max-w-2xl mx-auto'
          )}
        >
          {description}
        </motion.p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
