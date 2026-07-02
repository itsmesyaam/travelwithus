import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { blogPosts } from '@/data/kerala';

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

// ── BLOG LIST COMPONENT ──
export function BlogPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container px-4 mx-auto max-w-6xl">
        <SectionHeader
          badge="Journal"
          title="Kerala Travel Journal"
          description="Read stories, local secrets, itineraries advice, and spices recommendations from our editorial travel team."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 shadow-lg shadow-black/5 dark:shadow-black/20 cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="emerald" size="sm">{post.category}</Badge>
                </div>
              </Link>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-emerald-500 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="border-t border-gray-50 dark:border-gray-800 pt-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BLOG DETAIL COMPONENT ──
export function BlogPostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
        <p className="text-gray-650 mb-6">The requested journal article does not exist.</p>
        <Link to="/blog" className="text-emerald-600 font-semibold hover:underline">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container px-4 mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <Badge variant="emerald" size="sm">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>By {post.author}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>

        {/* Feature Image */}
        <div
          className="aspect-video w-full rounded-3xl bg-gray-100 dark:bg-gray-900 mb-10 overflow-hidden"
          style={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content */}
        <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {post.excerpt}
          </p>
          <p>
            Kerala, often called God's Own Country, has captivated explorers for centuries with its lush greenery, vibrant culture, and spice networks. In this article, we dive deep into how you can make the most out of your visit.
          </p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-2">Practical Travel Tips for Kerala</h3>
          <p>
            When traveling to Kerala, packing breathable light cotton clothing is essential, especially during the tropical coastal summers. For those heading to elevated hill stations like Munnar or Wayanad, a light wool layer is advised as temperatures can dip to 12°C in the evenings. Always carry insect repellent, keep cash handy for small rural eateries, and respect traditional attire customs when entering heritage sites.
          </p>
        </article>
      </div>
    </div>
  );
}
