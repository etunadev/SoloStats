import { Spacing } from '@/constants/theme'; // Şablonun spacing değerleri
import { useColorScheme } from '@/hooks/use-color-scheme'; // Aktif modu (dark/light) öğrenmek için[cite: 14]
import { useTheme } from '@/hooks/use-theme'; // Şablonun tema hook'u[cite: 14]
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../components/StatCard';

const Dashboard: React.FC = () => {
  const themeColors = useTheme(); // Aktif temanın renk paletini çeker[cite: 14, 15]
  const colorScheme = useColorScheme(); // 'dark' veya 'light' döner

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} nativeID="safe-area-dashboard">
      {/* 
        StatusBar barStyle'ı dinamik yaptık: 
        Karanlık moddaysa beyaz yazılar (light-content), aydınlık moddaysa siyah yazılar (dark-content)[cite: 14]
      */}
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={themeColors.background} 
      />
      
      <View style={styles.content} nativeID="view-dashboard-content">
        <Text style={[styles.title, { color: themeColors.text }]} nativeID="text-solostats-title">
          SoloStats
        </Text>
        <View style={styles.cardsContainer} nativeID="view-stat-cards-container">
          <StatCard title="Bugünkü İndirme" value="145" trend="+12%" />
          <StatCard title="Aktif Kullanıcı" value="850" trend="+5%" />
          <StatCard title="Günlük Gelir" value="$14.50" trend="-3%" />
          <StatCard title="Yeni Kayıtlar" value="25" trend="+8%" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.three, // 16px[cite: 15]
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: Spacing.four, // 24px[cite: 15]
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Dashboard;