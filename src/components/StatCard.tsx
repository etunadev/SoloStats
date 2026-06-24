import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend }) => {
  const themeColors = useTheme();
  const isPositive = trend.startsWith('+'); // Trendin yönüne göre renk seçimi

  return (
    <View style={[styles.card, { backgroundColor: themeColors.backgroundElement }]}>
      <Text style={[styles.title, { color: themeColors.textSecondary }]}>{title}</Text>
      <Text style={[styles.value, { color: themeColors.text }]}>{value}</Text>
      <Text style={[styles.trend, { color: isPositive ? '#4ade80' : '#f87171' }]}>
        {trend}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%', // İkişerli yan yana listelenmesi için
    padding: Spacing.three,
    borderRadius: Spacing.two,
    marginBottom: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android için gölge derinliği
  },
  title: {
    fontSize: 14,
    marginBottom: Spacing.one,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  trend: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default StatCard;