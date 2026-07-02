import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrendingDestinations } from '@/components/landing/TrendingDestinations';
import { ExperiencesSection } from '@/components/landing/ExperiencesSection';
import { SeasonalSection } from '@/components/landing/SeasonalSection';
import { KeralaMap } from '@/components/landing/KeralaMap';
import { AIPlannerCTA } from '@/components/landing/AIPlannerCTA';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { BlogSection } from '@/components/landing/BlogSection';
import { destinations, experiences, seasons, testimonials, blogPosts } from '@/data/kerala';

/**
 * Landing page — the cinematic home page for KeralaX AI.
 * Assembles all landing page sections in a carefully ordered flow.
 */
export function HomePage() {
  return (
    <main>
      {/* 1. Cinematic hero with search widget */}
      <HeroSection />

      {/* 2. Trending destinations grid */}
      <TrendingDestinations destinations={destinations} />

      {/* 3. Experiences / categories */}
      <ExperiencesSection experiences={experiences} />

      {/* 4. Seasonal recommendations */}
      <SeasonalSection seasons={seasons} />

      {/* 5. Interactive Kerala map */}
      <KeralaMap />

      {/* 6. AI Trip Planner CTA */}
      <AIPlannerCTA />

      {/* 7. Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 8. Blog highlights */}
      <BlogSection posts={blogPosts} />
    </main>
  );
}
