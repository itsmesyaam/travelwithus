import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import type { BlogPost } from '@/data/kerala';

interface BlogSectionProps {
  posts: BlogPost[];
}

/**
 * Blog highlights section for the landing page.
 * Shows featured blog posts in a responsive grid.
 */
export function BlogSection({ posts }: BlogSectionProps) {
  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="py-24">
      <div className="container">
        <SectionHeader
          badge="Travel Journal"
          title="Stories & Travel Guides"
          description="Expert insights, hidden gems, and travel tips from our Kerala exploration team."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured post (large) */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg shadow-black/5 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 cursor-pointer row-span-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-emerald-200 to-teal-300 dark:from-emerald-800 dark:to-teal-900 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${featured.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="emerald">{featured.category}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Secondary posts */}
          <div className="flex flex-col gap-6">
            {rest.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1] as any,
                }}
                whileHover={{ y: -2, x: 4 }}
                className="group flex gap-4 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-md shadow-black/5 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 cursor-pointer"
              >
                <div className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden">
                  <div
                    className="w-full h-full bg-gradient-to-br from-emerald-200 to-teal-300 dark:from-emerald-800 dark:to-teal-900 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${post.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <Badge variant="outline" size="sm" className="mb-2">
                      {post.category}
                    </Badge>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* View all CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Read All Articles
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
