import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';
import type { SymptomRecord } from '@/types/symptom';

export default function HistoryScreen() {
  const [records, setRecords] = useState<SymptomRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('symptom_records')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error loading records:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSymptomTitle = (type: string) => {
    const titles: Record<string, string> = {
      emotional_state: 'Емоционално състояние',
      pain_level: 'Ниво на болка',
      body_instability: 'Нестабилност',
      headache: 'Главоболие',
      vision_impairment: 'Зрение',
      other: 'Други',
    };
    return titles[type] || type;
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return '#4CAF50';
    if (severity <= 6) return '#FF9800';
    return '#F44336';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('bg-BG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#2E7D32', '#4CAF50']} style={styles.header}>
        <Text style={styles.headerTitle}>История</Text>
        <Text style={styles.headerSubtitle}>Преглед на записаните симптоми</Text>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
        </View>
      ) : records.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🌳</Text>
          <Text style={styles.emptyTitle}>Все още няма записи</Text>
          <Text style={styles.emptySubtitle}>
            Започнете да проследявате симптомите си от началния екран
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {records.map((record) => (
            <View key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordTitle}>{getSymptomTitle(record.symptom_type)}</Text>
                <View
                  style={[
                    styles.severityBadge,
                    { backgroundColor: getSeverityColor(record.severity) },
                  ]}
                >
                  <Text style={styles.severityText}>{record.severity}/10</Text>
                </View>
              </View>
              <Text style={styles.recordDate}>{formatDate(record.recorded_at)}</Text>
              {record.notes ? (
                <Text style={styles.recordNotes}>{record.notes}</Text>
              ) : null}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recordDate: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  recordNotes: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});
