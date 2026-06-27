import { create } from 'zustand';

interface AuthState {
  userToken: string | null;
  login: (idToken: string | null, accessToken: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userToken: null, // Varsayılan olarak giriş yapılmamış (null)
  login: (idToken, accessToken) => set({ userToken: idToken || accessToken }),
  logout: () => set({ userToken: null }),
}));