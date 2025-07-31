import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CreditsScreen() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const decoOpacity = useRef(new Animated.Value(0)).current;
  const decoTranslateY = useRef(new Animated.Value(30)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(decoOpacity, {
        toValue: 0.07,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(decoTranslateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
          easing: t => t, 
        })
      ),
    ]).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleBack = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require('@/assets/images/mobile-bg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.Image
        source={require('@/assets/images/caca.png')}
        style={[
          styles.bgImage,
          styles.topLeft,
          {
            opacity: decoOpacity,
            transform: [{ translateY: decoTranslateY }, { rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.Image
        source={require('@/assets/images/caca.png')}
        style={[
          styles.bgImage,
          styles.topRight,
          {
            opacity: decoOpacity,
            transform: [{ translateY: decoTranslateY }, { rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.Image
        source={require('@/assets/images/caca.png')}
        style={[
          styles.bgImage,
          styles.bottomLeft,
          {
            opacity: decoOpacity,
            transform: [{ translateY: decoTranslateY }, { rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.Image
        source={require('@/assets/images/caca.png')}
        style={[
          styles.bgImage,
          styles.bottomRight,
          {
            opacity: decoOpacity,
            transform: [{ translateY: decoTranslateY }, { rotate: rotateInterpolate }],
          },
        ]}
      />

      <Animated.View style={[styles.contentBox, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Créditos</Text>
        <View style={styles.line} />
        <Text style={styles.creditName}>duxs</Text>
        <Text style={styles.creditName}>gobs</Text>

        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>VOLTAR</Text>
          <View style={styles.buttonGlow} />
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    position: 'absolute',
    width: 60,
    height: 60,
    opacity: 0.07,
  },
  topLeft: {
    top: height * 0.1,
    left: width * 0.05,
  },
  topRight: {
    top: height * 0.15,
    right: width * 0.1,
  },
  bottomLeft: {
    bottom: height * 0.15,
    left: width * 0.12,
  },
  bottomRight: {
    bottom: height * 0.1,
    right: width * 0.05,
  },
  contentBox: {
    alignItems: 'center',
    backgroundColor: '#111a',
    padding: 30,
    borderRadius: 20,
    width: '90%',
  },
  title: {
    color: '#fbff00ff',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: '#eff313ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    marginBottom: 12,
  },
  line: {
    width: 180,
    height: 3,
    backgroundColor: '#fffb01ff',
    borderRadius: 1,
    marginBottom: 20,
    shadowColor: '#ffe601ff',
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  creditName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 15,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#f1cf0eff',
    paddingVertical: 16,
    paddingHorizontal: 70,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fcd601ff',
    shadowColor: '#ffee00ff',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    position: 'relative',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
    textShadowColor: '#000000aa',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonGlow: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    backgroundColor: '#ffc400ff',
    borderRadius: 36,
    opacity: 0.25,
    zIndex: -1,
  },
});
