import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [showWelcome, setShowWelcome] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => setShowWelcome(true));
  }, [fadeAnim]);

  const handleEnter = () => {
    router.replace('/Auth');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.animatedText}>Bem-vindo ao Painel Garena</Text>
      </Animated.View>
      {showWelcome && (
        <View style={styles.welcomeBox}>
          <Image
            source={require('@/assets/images/logo-new.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>Bem-vindo!</Text>
          <TouchableOpacity style={styles.button} onPress={handleEnter}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  animatedText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  welcomeBox: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 24,
    width: width * 0.85,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 180,
    height: 120,
    marginBottom: 18,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#e94444',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
