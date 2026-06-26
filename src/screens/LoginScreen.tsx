import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { Pressable, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const themeColors = useTheme();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleGoogleLogin = () => {
    login('mock-google-oauth-token');
    router.replace('/');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={themeColors.background} />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoIcon}>📊</Text>
          <Text style={[styles.title, { color: themeColors.text }]}>SoloStats</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            AdMob performansınızı ve uygulama gelirlerinizi anlık olarak takip edin.
          </Text>
        </View>

        <Pressable 
          style={({ pressed }) => [styles.loginButton, { backgroundColor: themeColors.backgroundElement, opacity: pressed ? 0.8 : 1 }]}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.buttonIcon}>🌐</Text>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Google ile Giriş Yap</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: Spacing.four, justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.four * 2 },
  headerContainer: { alignItems: 'center', marginTop: Spacing.four * 2, paddingHorizontal: Spacing.three },
  logoIcon: { fontSize: 64, marginBottom: Spacing.two },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: Spacing.one, textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 24 },
  loginButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: Spacing.three, borderRadius: Spacing.two, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  buttonIcon: { fontSize: 20, marginRight: Spacing.two },
  buttonText: { fontSize: 16, fontWeight: '600' },
});