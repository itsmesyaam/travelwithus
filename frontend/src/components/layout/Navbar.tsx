import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Sun, Moon, LogIn, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { AuthModal } from '@/components/auth/AuthModal';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/planner', label: 'AI Planner' },
  { to: '/districts', label: 'Districts' },
  { to: '/seasons', label: 'Seasons' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('travelwithus-dark');
    return stored ? stored === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const { isAuthenticated, user, logout, loadUser } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('travelwithus-dark', String(dark));
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-sand-warm/80 dark:bg-gray-950/80 backdrop-blur-2xl border-b border-emerald-900/[0.05] dark:border-white/[0.03] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="relative">
              <Compass className="h-6 w-6 text-emerald-deep dark:text-emerald-400 transition-transform duration-500 group-hover:rotate-90" />
              <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/20 blur-md rounded-full -z-10 scale-155 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-serif text-2xl font-bold italic tracking-tight text-emerald-deep dark:text-sand-warm">
              TravelWithUs
            </span>
          </Link>

          {/* Desktop Navigation Links (Apple/Airbnb sliding capsule feel) */}
          <div className="hidden items-center gap-1 md:flex bg-mist/60 dark:bg-gray-900/50 p-1.5 rounded-full border border-emerald-950/[0.04] dark:border-white/[0.03] relative">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={cn(
                    "relative px-4.5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 rounded-full",
                    isActive
                      ? "text-white dark:text-emerald-deep bg-emerald-deep dark:bg-emerald-400"
                      : "text-emerald-deep/75 dark:text-sand-warm/75 hover:text-emerald-deep dark:hover:text-white"
                  )}
                >
                  {/* Sliding Underlay pill */}
                  {hoveredIdx === idx && !isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-emerald-800/5 dark:bg-white/5 rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-4.5">
            {/* Dark Mode toggle */}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="rounded-full p-2 text-emerald-deep/80 hover:text-emerald-deep hover:bg-emerald-900/5 dark:text-sand-warm/80 dark:hover:text-white dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Account Panel */}
            {isAuthenticated ? (
              <div className="hidden items-center gap-4 md:flex">
                <Link
                  to="/dashboard"
                  className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-emerald-deep/80 hover:text-emerald-deep dark:text-sand-warm/80 dark:hover:text-white"
                >
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden items-center gap-1.5 px-4.5 py-2.5 rounded-full border border-emerald-950/10 dark:border-white/10 hover:bg-emerald-950/5 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-emerald-deep dark:text-sand-warm transition-all cursor-pointer md:inline-flex"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}

            <Link
              to="/planner"
              className="hidden rounded-full bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep px-5.5 py-2.5 text-xs font-bold uppercase tracking-widest shadow-md shadow-emerald-950/10 transition-all hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
            >
              Plan Journey
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="rounded-full p-2 text-emerald-deep hover:bg-emerald-950/5 dark:text-sand-warm dark:hover:bg-white/5 md:hidden cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="border-t border-emerald-950/5 bg-sand-warm/95 px-6 py-6 shadow-xl backdrop-blur-lg dark:border-white/5 dark:bg-gray-950/95 md:hidden"
            >
              <ul className="flex flex-col gap-3.5">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider text-emerald-deep/80 hover:bg-emerald-900/5 hover:text-emerald-deep dark:text-sand-warm/80 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}

                {/* Mobile Auth options */}
                {isAuthenticated ? (
                  <>
                    <motion.li
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider text-emerald-deep/80 hover:bg-emerald-900/5 hover:text-emerald-deep dark:text-sand-warm/80 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                      >
                        User Dashboard
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (navLinks.length + 1) * 0.05, duration: 0.2 }}
                    >
                      <button
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        className="w-full text-left block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.li>
                  </>
                ) : (
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                  >
                    <button
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileOpen(false);
                      }}
                      className="w-full text-left block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider text-emerald-deep dark:text-emerald-400 hover:bg-emerald-900/5 dark:hover:bg-white/5 transition-colors"
                    >
                      Sign In
                    </button>
                  </motion.li>
                )}

                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navLinks.length + 2) * 0.05, duration: 0.2 }}
                  className="pt-2"
                >
                  <Link
                    to="/planner"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep py-3 text-center text-xs font-bold uppercase tracking-widest shadow-md"
                  >
                    Plan Journey
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Overlay */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
