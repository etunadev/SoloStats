import { create } from 'zustand';

interface AuthState {
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userToken: null, // Varsayılan olarak giriş yapılmamış (null)
  login: (token) => set({ userToken: token }),
  logout: () => set({ userToken: null }),
}));