import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Sparkles, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const { login, register, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password.trim()) {
      setLocalError("Please fill out all login fields.");
      return;
    }
    if (tab === 'register' && !fullName.trim()) {
      setLocalError("Please provide your full name.");
      return;
    }

    let success = false;
    if (tab === 'login') {
      success = await login(email, password);
    } else {
      success = await register(email, password, fullName);
    }

    if (success) {
      // Clear inputs
      setEmail('');
      setPassword('');
      setFullName('');
      onClose();
    }
  };

  const handleTabSwitch = (t: 'login' | 'register') => {
    setTab(t);
    setLocalError(null);
    clearError();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl p-6 z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Kerala Smartly</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {tab === 'login'
                  ? 'Sign in to access your saved AI itineraries'
                  : 'Join us to save plans and get customized routes'}
              </p>
            </div>

            {/* Tab selector */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 mb-6">
              <button
                type="button"
                onClick={() => handleTabSwitch('login')}
                className={`flex-1 pb-2.5 text-sm font-semibold transition-all ${
                  tab === 'login'
                    ? 'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch('register')}
                className={`flex-1 pb-2.5 text-sm font-semibold transition-all ${
                  tab === 'register'
                    ? 'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Register
              </button>
            </div>

            {/* Errors */}
            {(localError || error) && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{localError || error}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  icon={<User className="w-4 h-4" />}
                />
              )}

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
              />

              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                className="mt-6"
              >
                {tab === 'login' ? 'Sign In' : 'Get Started'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
