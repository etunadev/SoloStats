import { DarkTheme, DefaultTheme, Slot, ThemeProvider, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import '@/locales/i18n';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  
  // Zustand'dan hem token'ı hem de güncel tema durumunu çekiyoruz
  const userToken = useAuthStore((state) => state.userToken);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const inLoginScreen = segments[0] === 'login';

  useEffect(() => {
    if (!userToken && !inLoginScreen) {
      router.replace('/login');
    } else if (userToken && inLoginScreen) {
      router.replace('/');
    }
  }, [userToken, inLoginScreen]);

  return (
    // React Navigation temalarını Zustand'dan gelen değere göre dinamik besliyoruz
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Slot />
    </ThemeProvider>
  );
}