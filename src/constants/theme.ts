/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1C1C1E',             // Tam keskin olmayan yumuşak bir siyah
    background: '#F2F2F7',       // Apple standardı temiz açık gri arka plan
    backgroundElement: '#FFFFFF',// Kartlar saf beyaz, arka plandan ayrılsın
    backgroundSelected: '#E5E5EA',
    textSecondary: '#68686E',
  },
  dark: {
    text: '#F3F4F6',             // Gözü yormayan kırık beyaz yazı
    background: '#121214',       // BEST PRACTICE: Saf siyah yerine premium koyu antrasit
    backgroundElement: '#1E1E24',// Kartlar ve elementler için bir tık daha açık antrasit tonu (katman hissi)
    backgroundSelected: '#2A2B36',// Seçili alanlar için belirgin ton
    textSecondary: '#9CA3AF',    // İkincil yazılar için yumuşak gri
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
