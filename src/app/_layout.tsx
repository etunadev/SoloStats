import { DarkTheme, DefaultTheme, Slot, ThemeProvider, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { useAuthStore } from '../store/authStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  
  const userToken = useAuthStore((state) => state.userToken);
  const inLoginScreen = segments[0] === 'login';

  useEffect(() => {
    if (!userToken && !inLoginScreen) {
      router.replace('/login');
    } else if (userToken && inLoginScreen) {
      router.replace('/');
    }
  }, [userToken, inLoginScreen]);

  // Temayı sarmalayan ortak yapıyı bozmamak için içeriği dinamik seçiyoruz
  const renderContent = () => {
    if (!userToken) {
      // Giriş yapılmadıysa SADECE login sayfasını (Slot) çiz, sekmeleri (AppTabs) yükleme!
      return <Slot />;
    }
    // Giriş yapıldıysa sekmeli ana yapıyı yükle
    return <AppTabs />;
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {renderContent()}
    </ThemeProvider>
  );
}