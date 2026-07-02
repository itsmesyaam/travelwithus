import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('keralax-dark');
    return stored ? stored === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const { isAuthenticated, user, logout, loadUser } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Load user profile on startup if token exists
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('keralax-dark', String(dark));
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <Compass className="h-7 w-7 text-emerald-500 transition-transform duration-300 group-hover:rotate-45" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              KeralaX
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden items-center gap-2.5 md:flex">
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <User className="w-4 h-4 text-emerald-500" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-semibold flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-semibold transition-colors cursor-pointer md:inline-flex"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}

            <Link
              to="/planner"
              className="hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110 md:inline-flex"
            >
              Plan Your Trip
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden cursor-pointer"
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
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="border-t border-gray-100 bg-white/95 px-6 py-6 shadow-xl backdrop-blur-lg dark:border-gray-850 dark:bg-gray-900/95 md:hidden"
            >
              <ul className="flex flex-col gap-3">
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
                      className="block rounded-lg px-4 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
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
                        className="block rounded-lg px-4 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
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
                        className="w-full text-left block rounded-lg px-4 py-2.5 text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
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
                      className="w-full text-left block rounded-lg px-4 py-2.5 text-base font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors"
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
                    className="block rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-500/25"
                  >
                    Plan Your Trip
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
