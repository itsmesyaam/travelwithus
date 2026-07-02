import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { QuickLinksSection } from '@/components/landing/QuickLinksSection';
import { ExperiencesSection } from '@/components/landing/ExperiencesSection';
import { FeaturedCarousel } from '@/components/landing/FeaturedCarousel';
import { TourPackagesSection } from '@/components/landing/TourPackagesSection';
import { BookingStepsSection } from '@/components/landing/BookingStepsSection';
import { KeralaMap } from '@/components/landing/KeralaMap';
import { BlogSection } from '@/components/landing/BlogSection';
import { blogPosts } from '@/data/kerala';

/**
 * Landing page — the cinematic home page for TravelWithUs AI.
 * Assembles all landing page sections in a carefully ordered flow matching the WANDER concept.
 */
export function HomePage() {
  return (
    <main className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* 1. Full-viewport Hero */}
      <HeroSection />

      {/* 2. Circular quick links (Mezenc concept) */}
      <QuickLinksSection />

      {/* 3. Editorial magazine spotlights */}
      <ExperiencesSection />

      {/* 4. Top Destinations portrait slider */}
      <FeaturedCarousel />

      {/* 5. Tour Packages bento grid */}
      <TourPackagesSection />

      {/* 6. Interactive Kerala map by region (Epic concept) */}
      <KeralaMap />

      {/* 7. Booking made easy 1-2-3 steps (MNTN concept) */}
      <BookingStepsSection />

      {/* 8. Blog highlights */}
      <BlogSection posts={blogPosts} />
    </main>
  );
}


