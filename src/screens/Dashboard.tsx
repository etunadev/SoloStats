import { Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../components/StatCard';
import { fetchAdMobDailyReport } from '../services/admobService';
import { AdMobReportResponse } from '../types/admob';

const Dashboard: React.FC = () => {
  const themeColors = useTheme();
  const colorScheme = useColorScheme();

  // State tanımlamaları
  const [loading, setLoading] = useState<boolean>(true);
  const [reportData, setReportData] = useState<AdMobReportResponse | null>(null);

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

  // // API'den gelen ham verileri ayıklıyoruz

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
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={themeColors.background}
      />

      <View style={styles.content} nativeID="view-dashboard-content">
        <Text style={[styles.title, { color: themeColors.text }]} nativeID="text-solostats-title">
          SoloStats
        </Text>
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
  content: {
    padding: Spacing.three,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: Spacing.four,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Dashboard;