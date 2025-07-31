import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Animações da tela principal
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const translateYAnim = useRef(new Animated.Value(-100)).current;
  const terminalOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const decoOpacity = useRef(new Animated.Value(0)).current;
  const decoTranslateY = useRef(new Animated.Value(30)).current;
  const topLogoOpacity = useRef(new Animated.Value(0)).current;
  const topLogoTranslateY = useRef(new Animated.Value(-30)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerTranslateY = useRef(new Animated.Value(30)).current;
  const glassOpacity = useRef(new Animated.Value(0)).current;

  // Animações da tela de loading
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const loadingRotation = useRef(new Animated.Value(0)).current;
  const loadingScale = useRef(new Animated.Value(0.8)).current;
  const loadingTextOpacity = useRef(new Animated.Value(0)).current;
  const loadingPulse = useRef(new Animated.Value(1)).current;
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startLoadingAnimations();
    simulateLoading();
  }, []);

  const simulateLoading = () => {
    const progressSteps = [10, 25, 37, 58, 79, 88, 99, 100];
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        const targetProgress = progressSteps[currentStep];
        setLoadingProgress(targetProgress);
        
        // Animar barra de progresso
        Animated.timing(progressBarWidth, {
          toValue: targetProgress,
          duration: 500,
          useNativeDriver: false,
        }).start();

        if (targetProgress === 100) {
          setIsCompleted(true);
          setTimeout(() => {
            finishLoading();
          }, 1000); // Espera 1 segundo após 100%
        }
        
        currentStep++;
      } else {
        clearInterval(progressInterval);
      }
    }, 1000); // Muda a cada 1 segundo
  };

  const startLoadingAnimations = () => {
    // Rotação contínua da logo
    Animated.loop(
      Animated.timing(loadingRotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Pulsação da logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingPulse, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(loadingPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação de entrada da logo
    Animated.sequence([
      Animated.spring(loadingScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(loadingTextOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const finishLoading = () => {
    // Fade out da tela de loading
    Animated.timing(loadingOpacity, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false);
      startMainAnimations();
    });
  };

  const startMainAnimations = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(topLogoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(topLogoTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(decoOpacity, {
          toValue: 0.07,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(decoTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),

      Animated.timing(terminalOpacity, {
        toValue: 0.08,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(glassOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(footerTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => startButtonPulse());

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const startButtonPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleEnter = () => {
    router.replace('/Auth');
  };

  const rotateLogo = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const loadingRotate = loadingRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Tela de Loading
  if (isLoading) {
    return (
      <View style={styles.loadingBackground}>
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: loadingOpacity,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.loadingLogoContainer,
              {
                transform: [
                  { scale: Animated.multiply(loadingScale, loadingPulse) },
                  { rotate: loadingRotate },
                ],
              },
            ]}
          >
            <Image
              source={require('@/assets/images/logo-small-bg.png')}
              style={styles.loadingLogo}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.Text
            style={[
              styles.loadingText,
              {
                opacity: loadingTextOpacity,
              },
            ]}
          >
            AGUARDE O PAINEL GARENA CARREGAR...
          </Animated.Text>

          {/* Barra de Progresso */}
          <Animated.View
            style={[
              styles.progressContainer,
              {
                opacity: loadingTextOpacity,
              },
            ]}
          >
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressBarWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: isCompleted ? '#00ff00' : '#ffd700',
                  },
                ]}
              />
            </View>
            <Text style={[
              styles.progressText,
              { color: isCompleted ? '#00ff00' : '#ffd700' }
            ]}>
              {isCompleted ? 'CONCLUÍDO!' : `${loadingProgress}%`}
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.loadingDotsContainer,
              {
                opacity: loadingTextOpacity,
              },
            ]}
          >
            <View style={styles.loadingDots}>
              <Animated.View style={[styles.dot, styles.dot1]} />
              <Animated.View style={[styles.dot, styles.dot2]} />
              <Animated.View style={[styles.dot, styles.dot3]} />
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  // Tela Principal
  return (
    <ImageBackground
      source={require('@/assets/images/mobile-bg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          styles.topLogoBox,
          {
            opacity: topLogoOpacity,
            transform: [{ translateY: topLogoTranslateY }],
          },
        ]}
      >
        <Image
          source={require('@/assets/images/logo-new.png')}
          style={styles.topLogo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.Image
        source={require('@/assets/images/caca.png')}
        style={[
          styles.bgImage,
          styles.topLeft,
          {
            opacity: decoOpacity,
            transform: [{ translateY: decoTranslateY }],
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
            transform: [{ translateY: decoTranslateY }],
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
            transform: [{ translateY: decoTranslateY }],
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
            transform: [{ translateY: decoTranslateY }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.unifiedGlassContainer,
          {
            opacity: glassOpacity,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.headerBox,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
            },
          ]}
        >
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>PAINEL GARENA v3</Text>
            <Animated.Image
              source={require('@/assets/images/logo_small_foot.jpg')}
              style={[
                styles.logoInline,
                {
                  transform: [{ scale: scaleAnim }, { rotate: rotateLogo }],
                },
              ]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.line} />
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ scale: Animated.multiply(buttonScale, buttonPulse) }],
            },
          ]}
        >
          <TouchableOpacity style={styles.button} onPress={handleEnter}>
            <Text style={styles.buttonText}>ACESSAR PAINEL</Text>
            <View style={styles.buttonGlow} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.footer,
          {
            opacity: footerOpacity,
            transform: [{ translateY: footerTranslateY }],
          },
        ]}
      >
        <View style={styles.footerContent}>
          <Image
            source={require('@/assets/images/logo_small_foot.jpg')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Text style={styles.footerText}>
            Copyright © Garena International.{'\n'}
            Trademarks belong to their respective owners. All rights Reserved.
          </Text>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loadingBackground: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  progressContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  // Estilos da tela de loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loadingLogoContainer: {
    marginBottom: 50,
    shadowColor: '#ffd700',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  loadingLogo: {
    width: 120,
    height: 120,
  },
  loadingText: {
    color: '#fbff00ff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
    textShadowColor: '#eff313ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
    marginBottom: 30,
  },
  loadingDotsContainer: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffd700',
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },

  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#222',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },

  // Estilos da tela principal (mantidos iguais)
  topLogoBox: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 1,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topLogo: {
    width: 260,
    height: 100,
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
  unifiedGlassContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 204, 0, 0.4)',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 25,
    alignItems: 'center',
    backdropFilter: 'blur(12px)',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 35,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  titleText: {
    color: '#fbff00ff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#eff313ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  line: {
    width: 160,
    height: 2,
    backgroundColor: '#fffb01ff',
    borderRadius: 1,
    shadowColor: '#ffe601ff',
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  logoInline: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffe600ff',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fcd601ff',
    position: 'relative',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonGlow: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    backgroundColor: '#ffc400ff',
    borderRadius: 36,
    opacity: 0.15,
    zIndex: -1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'nowrap',
  },
  footerTextBox: {
    flexDirection: 'column',
    flexShrink: 1,
    flex: 1,
    marginLeft: 10,
  },
  footerText: {
    color: '#ccc',
    fontSize: 12,
    fontFamily: 'monospace',
    flexShrink: 1,
    lineHeight: 16,
  },
  footerLogo: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
});