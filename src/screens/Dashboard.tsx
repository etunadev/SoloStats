import { Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router'; // 1. EKSİK: useRouter import edildi
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'; // 2. EKSİK: Pressable import edildi
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../components/StatCard';
import { fetchAdMobDailyReport } from '../services/admobService';
import { AdMobReportResponse } from '../types/admob';

const Dashboard: React.FC = () => {
  const themeColors = useTheme();
  const colorScheme = useColorScheme();
  const router = useRouter(); // 3. EKSİK: router nesnesi tanımlandı

  // State tanımlamaları
  const [loading, setLoading] = useState<boolean>(true);
  const [reportData, setReportData] = useState<AdMobReportResponse | null>(null);


  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  useEffect(() => {
    const loadAdMobData = async () => {
      try {
        setLoading(true);
        const data = await fetchAdMobDailyReport();
        setReportData(data);
      } catch (error) {
        console.error("AdMob veri yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdMobData();
  }, []);

  // Yükleniyor durumu (Loading)
  if (loading) {
    return (
      <SafeAreaView style={[styles.centerContainer, { backgroundColor: themeColors.background }]}>
        <ActivityIndicator size="large" color={themeColors.text} />
      </SafeAreaView>
    );
  }

  // API'den gelen ham verileri ayıklıyoruz
  const row = reportData?.rows?.[0];

  const estimatedEarnings = row?.metricValues?.ESTIMATED_EARNINGS?.microsValue
    ? `$${(parseFloat(row.metricValues.ESTIMATED_EARNINGS.microsValue) / 1000000).toFixed(2)}`
    : '$0.00';

  const pageRpm = row?.metricValues?.PAGE_RPM?.microsValue
    ? `$${(parseFloat(row.metricValues.PAGE_RPM.microsValue) / 1000000).toFixed(2)}`
    : '$0.00';

  const impressions = row?.metricValues?.IMPRESSIONS?.integerValue
    ? `${(row.metricValues.IMPRESSIONS.integerValue / 1000).toFixed(1)}K`
    : '0';

  const adRequests = row?.metricValues?.AD_REQUESTS?.integerValue
    ? `${(row.metricValues.AD_REQUESTS.integerValue / 1000).toFixed(1)}K`
    : '0';

  const clicks = row?.metricValues?.CLICKS?.integerValue?.toString() || '0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} nativeID="safe-area-dashboard">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={themeColors.background}
      />

      {/* Üst Bar: Başlık ve Ayarlar Butonu Hizalaması Düzenlendi */}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: themeColors.text }]} nativeID="text-solostats-title">
          SoloStats
        </Text>
        <Pressable
          onPress={() => router.push('/settings')}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.settingsButton]}
        >
          <Text style={{ fontSize: 26 }}>⚙️</Text>
        </Pressable>
      </View>

      {/* İçerik Alanı: Mükerrer Başlık Kaldırıldı */}
      <View style={styles.content} nativeID="view-dashboard-content">
        <View style={styles.cardsContainer} nativeID="view-stat-cards-container">
          <StatCard title="Tahmini Gelir" value={estimatedEarnings} trend="+15%" subText="Dün: $21.30" />
          <StatCard title="Sayfa BGBG" value={pageRpm} trend="+4%" subText={`Gösterim: ${impressions}`} />
          <StatCard title="Reklam İstekleri" value={adRequests} trend="-2%" subText="Eşleşme: %98.4" />
          <StatCard title="Tıklamalar (CTR)" value={clicks} trend="+8%" subText="TO: %2.39" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: Spacing.two,
    marginTop: Spacing.two,
  },
  settingsButton: {
    position: 'absolute',
    right: Spacing.four,
  },
  content: {
    padding: Spacing.three,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: Spacing.two,
  },
});

export default Dashboard;