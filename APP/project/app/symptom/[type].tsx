import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Save } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import type { SymptomType } from '@/types/symptom';

export default function SymptomTrackingScreen() {
  const params = useLocalSearchParams<{ type: SymptomType; title: string }>();
  const router = useRouter();
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Грешка', 'Моля, влезте в профила си');
        setSaving(false);
        return;
      }

      const { error } = await supabase.from('symptom_records').insert({
        user_id: user.id,
        symptom_type: params.type,
        severity,
        notes,
        recorded_at: new Date().toISOString(),
      });

      if (error) throw error;

      Alert.alert('Успешно', 'Симптомът е записан успешно', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error saving symptom:', error);
      Alert.alert('Грешка', 'Възникна проблем при записването');
    } finally {
      setSaving(false);
    }
  };

  const getSeverityColor = (value: number) => {
    if (value <= 3) return '#4CAF50';
    if (value <= 6) return '#FF9800';
    return '#F44336';
  };

  const getSeverityLabel = (value: number) => {
    if (value <= 3) return 'Леко';
    if (value <= 6) return 'Средно';
    return 'Силно';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#2E7D32', '#4CAF50']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.title}</Text>
        <Text style={styles.headerSubtitle}>Запишете текущото състояние</Text>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Интензитет</Text>
          <Text style={styles.sectionSubtitle}>Изберете от 1 (минимално) до 10 (максимално)</Text>

          <View style={styles.severityDisplay}>
            <Text style={[styles.severityNumber, { color: getSeverityColor(severity) }]}>
              {severity}
            </Text>
            <Text style={[styles.severityLabel, { color: getSeverityColor(severity) }]}>
              {getSeverityLabel(severity)}
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.sliderButton,
                  severity === value && {
                    backgroundColor: getSeverityColor(value),
                    transform: [{ scale: 1.2 }],
                  },
                ]}
                onPress={() => setSeverity(value)}
              >
                <Text
                  style={[
                    styles.sliderButtonText,
                    severity === value && styles.sliderButtonTextActive,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Бележки</Text>
          <Text style={styles.sectionSubtitle}>Допълнителна информация (по желание)</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="Опишете симптомите или обстоятелствата..."
            placeholderTextColor="#9E9E9E"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <LinearGradient
            colors={saving ? ['#9E9E9E', '#757575'] : ['#2E7D32', '#4CAF50']}
            style={styles.saveButtonGradient}
          >
            <Save size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>
              {saving ? 'Записване...' : 'Запази симптом'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E8F5E9',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  severityDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  severityNumber: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  severityLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  sliderButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sliderButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
  },
  sliderButtonTextActive: {
    color: '#FFFFFF',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#212121',
    minHeight: 120,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
