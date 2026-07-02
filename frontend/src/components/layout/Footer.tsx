import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass, MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube,
  Heart, ArrowRight, Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = {
  'Explore': [
    { name: 'Destinations', href: '/explore' },
    { name: 'AI Trip Planner', href: '/planner' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Hidden Gems', href: '/hidden-gems' },
    { name: 'Road Trips', href: '/road-trips' },
    { name: 'Weekend Getaways', href: '/weekend-getaways' },
  ],
  'Categories': [
    { name: 'Backwaters', href: '/explore?category=backwaters' },
    { name: 'Hill Stations', href: '/explore?category=hill-station' },
    { name: 'Beaches', href: '/explore?category=beach' },
    { name: 'Wildlife', href: '/explore?category=wildlife' },
    { name: 'Pilgrimage', href: '/explore?category=pilgrimage' },
    { name: 'Houseboats', href: '/houseboats' },
  ],
  'Company': [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

/**
 * Premium footer with newsletter signup, link columns, and social links.
 */
export function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

      {/* Newsletter section */}
      <div className="border-b border-gray-800">
        <div className="container py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Inspired
              </h3>
              <p className="text-gray-400">
                Get curated travel stories, exclusive deals, and insider tips for Kerala delivered to your inbox.
              </p>
            </div>
            <div className="w-full lg:w-auto flex gap-3">
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  aria-label="Email address for newsletter"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-shadow"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Kerala<span className="text-emerald-400">X</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              The smartest way to explore God's Own Country.
              AI-powered travel planning for unforgettable Kerala experiences.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TravelWithUs AI. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for God's Own Country
          </p>
        </div>
      </div>
    </footer>
  );
}
