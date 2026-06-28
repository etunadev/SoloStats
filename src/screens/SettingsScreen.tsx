import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';

export default function SettingsScreen() {
  const themeColors = useTheme();
  const router = useRouter();
  
  // Zustand entegrasyonları
  const logout = useAuthStore((state) => state.logout);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);

  // Çıkış yapmadan önce onay alan modal mekanizması
  const confirmLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan çıkış yapmak istediğinize emin misiniz?",
      [
        {
          text: "Hayır",
          style: "cancel"
        },
        { 
          text: "Evet", 
          style: "destructive",
          onPress: handleLogout 
        }
      ],
      { cancelable: true }
    );
  };

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      logout();
      router.replace('/login');
    } catch (e) {
      console.error("Çıkış hatası:", e);
      // Native modül bağlı değilse bile güvenli çıkış yapabilmesi için:
      logout();
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        
        {/* Geri Butonu ve Başlık */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={{ color: themeColors.text, fontSize: 18 }}>←</Text>
          </Pressable>
          <Text style={[styles.title, { color: themeColors.text }]}>Ayarlar</Text>
        </View>
        
        {/* Görünüm Modülü (Kayan Noktalı Switch Alanı) */}
        <View style={[styles.section, { backgroundColor: themeColors.backgroundElement || '#1e1e1e', borderColor: 'rgba(255,255,255,0.05)' }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textSecondary }]}>Görünüm</Text>
          <View style={styles.row}>
            <Text style={[styles.rowText, { color: themeColors.text }]}>Karanlık Mod</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#2196F3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>
        </View>

        {/* Hesap Modülü */}
        <View style={[styles.section, { backgroundColor: themeColors.backgroundElement || '#1e1e1e', borderColor: 'rgba(255,255,255,0.05)' }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textSecondary }]}>Hesap</Text>
          <Pressable style={styles.logoutButton} onPress={confirmLogout}>
            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.four },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.four },
  backButton: { marginRight: Spacing.three, padding: Spacing.one },
  title: { fontSize: 28, fontWeight: 'bold' },
  section: { marginBottom: Spacing.four, padding: Spacing.four, borderRadius: Spacing.three, borderWidth: 1 },
  sectionTitle: { marginBottom: Spacing.three, fontWeight: '600', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowText: { fontSize: 16, fontWeight: '500' },
  logoutButton: { padding: Spacing.three, backgroundColor: '#ff4444', borderRadius: Spacing.two, marginTop: Spacing.one },
  logoutButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});