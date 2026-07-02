import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'glass' | 'solid' | 'elevated';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  glass:
    'backdrop-blur-xl bg-white/10 border border-white/20 dark:bg-white/5 dark:border-white/10',
  solid:
    'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
  elevated:
    'bg-white dark:bg-gray-900 shadow-xl shadow-black/5 dark:shadow-black/20 border border-gray-100 dark:border-gray-800',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Glassmorphism card component with hover animations.
 * Supports glass, solid, and elevated variants.
 */
export function Card({
  children,
  variant = 'elevated',
  hover = true,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } }
          : undefined
      }
      className={cn(
        'rounded-2xl overflow-hidden transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Sub-components ────────────────────────────────────────── */

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  aspectRatio?: 'video' | 'square' | 'portrait';
}

export function CardImage({
  src,
  alt,
  className,
  overlay = true,
  aspectRatio = 'video',
}: CardImageProps) {
  const aspectStyles = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div className={cn('relative overflow-hidden', aspectStyles[aspectRatio], className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardContentProps) {
  return (
    <div className={cn('px-5 pb-5 pt-0 flex items-center justify-between', className)}>
      {children}
    </div>
  );
}
