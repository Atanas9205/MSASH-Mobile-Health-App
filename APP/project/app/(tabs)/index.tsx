import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Zap, User, Eye, Brain, MoreHorizontal } from 'lucide-react-native';
import type { SymptomModule } from '@/types/symptom';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const symptomModules: SymptomModule[] = [
  {
    id: 'emotional_state',
    title: 'Emotional State',
    titleBg: 'Емоционално състояние',
    icon: 'heart',
    color: '#E91E63',
    description: 'Проследете настроението си',
  },
  {
    id: 'pain_level',
    title: 'Pain Level',
    titleBg: 'Ниво на болка',
    icon: 'zap',
    color: '#F44336',
    description: 'Запишете нивото на болка',
  },
  {
    id: 'body_instability',
    title: 'Body Instability',
    titleBg: 'Нестабилност на тялото',
    icon: 'user',
    color: '#FF9800',
    description: 'Оценете стабилността',
  },
  {
    id: 'headache',
    title: 'Headache',
    titleBg: 'Главоболие',
    icon: 'brain',
    color: '#9C27B0',
    description: 'Интензитет на главоболие',
  },
  {
    id: 'vision_impairment',
    title: 'Vision',
    titleBg: 'Влошено зрение',
    icon: 'eye',
    color: '#2196F3',
    description: 'Проследете зрението си',
  },
  {
    id: 'other',
    title: 'Other',
    titleBg: 'Други',
    icon: 'more',
    color: '#607D8B',
    description: 'Други симптоми',
  },
];

const getIcon = (iconName: string, color: string) => {
  const iconProps = { size: 40, color: '#FFFFFF', strokeWidth: 2.5 };

  switch (iconName) {
    case 'heart':
      return <Heart {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'user':
      return <User {...iconProps} />;
    case 'brain':
      return <Brain {...iconProps} />;
    case 'eye':
      return <Eye {...iconProps} />;
    case 'more':
      return <MoreHorizontal {...iconProps} />;
    default:
      return <Heart {...iconProps} />;
  }
};

export default function MainMenu() {
  const router = useRouter();

  const handleModulePress = (module: SymptomModule) => {
    router.push({
      pathname: '/symptom/[type]',
      params: { type: module.id, title: module.titleBg },
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>MSASH</Text>
        <Text style={styles.headerSubtitle}>Проследете симптомите си</Text>
        <View style={styles.treeEmoji}>
          <Text style={styles.treeText}>🌳</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {symptomModules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={styles.card}
              onPress={() => handleModulePress(module)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[module.color, `${module.color}DD`]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.iconContainer}>
                  {getIcon(module.icon, module.color)}
                </View>
                <Text style={styles.cardTitle}>{module.titleBg}</Text>
                <Text style={styles.cardDescription}>{module.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  treeEmoji: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
  treeText: {
    fontSize: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    height: 180,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});
