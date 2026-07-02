import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('keralax-token'),
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Authentication failed. Double check credentials.");
      }

      const data = await response.json();
      localStorage.setItem('keralax-token', data.access_token);
      set({ token: data.access_token });
      
      // Load user profile
      await get().loadUser();
      set({ isLoading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  register: async (email, password, fullName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: fullName })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Registration failed. Email might already exist.");
      }

      // Automatically login after register
      set({ isLoading: false });
      return await get().login(email, password);
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('keralax-token');
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const token = get().token;
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data, isAuthenticated: true });
      } else {
        // Token expired/invalid
        localStorage.removeItem('keralax-token');
        set({ token: null, user: null, isAuthenticated: false });
      }
    } catch (e) {
      // Network issues - keep token but mark as loading done
    } finally {
      set({ isLoading: false });
    }
  }
}));
