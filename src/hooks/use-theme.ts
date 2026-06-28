/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useAuthStore } from '../store/authStore'; // Zustand store'umuzu dahil ettik

export function useTheme() {
  // 1. Cihazın sistem şeması yerine artık tamamen Zustand store'daki el ile seçilen state'i dinliyoruz
  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  // 2. isDarkMode true ise 'dark', false ise 'light' renk setini dönüyoruz
  const theme = isDarkMode ? 'dark' : 'light';

  return Colors[theme];
}