import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../components/StatCard';
import { fetchAdMobDailyReport } from '../services/admobService';
import { AdMobReportResponse } from '../types/admob';

const Dashboard: React.FC = () => {
  const themeColors = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reportData, setReportData] = useState<AdMobReportResponse | null>(null);

  useEffect(() => {
    const loadAdMobData = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const data = await fetchAdMobDailyReport();

        if (!data || !data.rows || data.rows.length === 0) {
          setReportData(null);
        } else {
          setReportData(data);
        }
      } catch (error: any) {
        console.error("AdMob veri yükleme hatası:", error);
        // Hata mesajını dil dosyasından çekiyoruz
        setErrorMsg(t('dashboard.errorDesc'));
      } finally {
        setLoading(false);
      }
    };

    loadAdMobData();
  }, [t]); // t fonksiyonunu dependency array'e eklemek best practice'tir

  // --- 1. Yükleniyor Ekranı ---
  if (loading) {
    return (
      <SafeAreaView style={[styles.centerContainer, { backgroundColor: themeColors.background }]}>
        <ActivityIndicator size="large" color={themeColors.text} />
        <Text style={[styles.infoText, { color: themeColors.textSecondary, marginTop: Spacing.two }]}>
          {t('common.loading')}
        </Text>
      </SafeAreaView>
    );
  }

  // --- 2. Hata veya Boş Veri Ekranı ---
  if (errorMsg || !reportData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={themeColors.background} />

        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: themeColors.text }]}>{t('dashboard.title')}</Text>
          <Pressable onPress={() => router.push('/settings')} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.settingsButton]}>
            <Text style={{ fontSize: 26 }}>⚙️</Text>
          </Pressable>
        </View>

        <View style={[styles.centerContainer, { paddingHorizontal: Spacing.four }]}>
          <Text style={styles.alertIcon}>{errorMsg ? '⚠️' : '📭'}</Text>
          <Text style={[styles.alertTitle, { color: themeColors.text }]}>
            {errorMsg ? t('dashboard.errorTitle') : t('dashboard.emptyTitle')}
          </Text>
          <Text style={[styles.alertDescription, { color: themeColors.textSecondary }]}>
            {errorMsg ? errorMsg : t('dashboard.emptyDesc')}
          </Text>

          <Pressable
            style={[styles.retryButton, { backgroundColor: isDarkMode ? '#2A2B36' : '#E5E5EA' }]}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
            }}
          >
            <Text style={[styles.retryButtonText, { color: themeColors.text }]}>{t('common.retry')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // --- 3. Başarılı Veri Ekranı ---
  const row = reportData.rows?.[0];
  const estimatedEarnings = row?.metricValues?.ESTIMATED_EARNINGS?.microsValue ? `$${(parseFloat(row.metricValues.ESTIMATED_EARNINGS.microsValue) / 1000000).toFixed(2)}` : '$0.00';
  const pageRpm = row?.metricValues?.PAGE_RPM?.microsValue ? `$${(parseFloat(row.metricValues.PAGE_RPM.microsValue) / 1000000).toFixed(2)}` : '$0.00';
  const impressions = row?.metricValues?.IMPRESSIONS?.integerValue ? `${(row.metricValues.IMPRESSIONS.integerValue / 1000).toFixed(1)}K` : '0';
  const adRequests = row?.metricValues?.AD_REQUESTS?.integerValue ? `${(row.metricValues.AD_REQUESTS.integerValue / 1000).toFixed(1)}K` : '0';
  const clicks = row?.metricValues?.CLICKS?.integerValue?.toString() || '0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} nativeID="safe-area-dashboard">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={themeColors.background} />

      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: themeColors.text }]} nativeID="text-solostats-title">
          {t('dashboard.title')}
        </Text>
        <Pressable onPress={() => router.push('/settings')} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.settingsButton]}>
          <Text style={{ fontSize: 26 }}>⚙️</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.cardsContainer}>
          <StatCard
            title={t('dashboard.estEarnings')}
            value={estimatedEarnings}
            trend="+15%"
            subText={`${t('dashboard.yesterday')}: $21.30`}
          />
          <StatCard
            title={t('dashboard.pageRpm')}
            value={pageRpm}
            trend="+4%"
            subText={`${t('dashboard.impressions')}: ${impressions}`}
          />
          <StatCard
            title={t('dashboard.adRequests')}
            value={adRequests}
            trend="-2%"
            subText={`${t('dashboard.matchRate')}: %98.4`}
          />
          <StatCard
            title={t('dashboard.clicks')}
            value={clicks}
            trend="+8%"
            subText={`${t('dashboard.ctr')}: %2.39`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', paddingVertical: Spacing.two, marginTop: Spacing.two },
  settingsButton: { position: 'absolute', right: Spacing.four },
  content: { padding: Spacing.three },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  cardsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: Spacing.two },

  infoText: { fontSize: 16, fontWeight: '500' },
  alertIcon: { fontSize: 64, marginBottom: Spacing.three },
  alertTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: Spacing.one, textAlign: 'center' },
  alertDescription: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.four },
  retryButton: { paddingVertical: Spacing.two, paddingHorizontal: Spacing.four, borderRadius: Spacing.two },
  retryButtonText: { fontSize: 16, fontWeight: '600' }
});

export default Dashboard;