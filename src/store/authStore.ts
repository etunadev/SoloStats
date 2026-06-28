import { create } from 'zustand';

interface AuthState {
  userToken: string | null;
  isDarkMode: boolean; // Tema durumu eklendi
  login: (idToken: string | null, accessToken: string | null) => void;
  logout: () => void;
  toggleTheme: () => void; // Temayı değiştirecek fonksiyon
}

export const useAuthStore = create<AuthState>((set) => ({
  userToken: null,
  isDarkMode: true, // Varsayılan olarak karanlık mod açık başlasın
  login: (idToken, accessToken) => set({ userToken: idToken || accessToken }),
  logout: () => set({ userToken: null }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));