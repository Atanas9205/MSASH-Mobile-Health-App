import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/(tabs)');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['#1B5E20', '#2E7D32', '#4CAF50']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.treeContainer}>
            <Text style={styles.tree}>🌳</Text>
          </View>

          <Text style={styles.appName}>MSASH</Text>
          <Text style={styles.subtitle}>Multiple Sclerosis</Text>
          <Text style={styles.subtitle}>Atanas Shopov Health</Text>

          <View style={styles.footer}>
            <Text style={styles.tapText}>Докоснете екрана за начало</Text>
            <Text style={styles.tapIcon}>👆</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  treeContainer: {
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  tree: {
    fontSize: 120,
    textAlign: 'center',
  },
  appName: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    letterSpacing: 1,
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  tapText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
    opacity: 0.9,
  },
  tapIcon: {
    fontSize: 32,
  },
});
