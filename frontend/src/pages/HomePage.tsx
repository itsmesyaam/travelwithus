import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { BrandValueSection } from '@/components/landing/BrandValueSection';
import { FeaturedCarousel } from '@/components/landing/FeaturedCarousel';
import { TourPackagesSection } from '@/components/landing/TourPackagesSection';
import { BookingStepsSection } from '@/components/landing/BookingStepsSection';
import { KeralaMap } from '@/components/landing/KeralaMap';
import { BlogSection } from '@/components/landing/BlogSection';
import { blogPosts } from '@/data/kerala';

/**
 * Landing page — the cinematic home page for KeralaX AI.
 * Assembles all landing page sections in a carefully ordered flow matching the WANDER concept.
 */
export function HomePage() {
  return (
    <main className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* 1. Bento floating hero */}
      <HeroSection />

      {/* 2. Split stats and value points */}
      <BrandValueSection />

      {/* 3. Top Destinations portrait slider */}
      <FeaturedCarousel />

      {/* 4. Tour Packages bento grid */}
      <TourPackagesSection />

      {/* 5. Interactive Kerala map by region */}
      <KeralaMap />

      {/* 6. Booking made easy 1-2-3 steps */}
      <BookingStepsSection />

      {/* 7. Blog highlights */}
      <BlogSection posts={blogPosts} />
    </main>
  );
}
