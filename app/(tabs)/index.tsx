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

  // Animações da tela de loading melhoradas
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const loadingScale = useRef(new Animated.Value(0.8)).current;
  const loadingTextOpacity = useRef(new Animated.Value(0)).current;
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const logoGlow = useRef(new Animated.Value(0.5)).current;
  const dotsAnimation = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const particlesAnim = useRef(new Animated.Value(0)).current;
  const scanlineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startLoadingAnimations();
    simulateLoading();
  }, []);

  const simulateLoading = () => {
    // Progresso mais realista e suave
    const progressSteps = [15, 32, 48, 67, 84, 95, 100];
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        const targetProgress = progressSteps[currentStep];
        setLoadingProgress(targetProgress);
        
        // Animar barra de progresso com easing
        Animated.timing(progressBarWidth, {
          toValue: targetProgress,
          duration: 400, // Mais rápido
          useNativeDriver: false,
        }).start();

        if (targetProgress === 100) {
          setIsCompleted(true);
          setTimeout(() => {
            finishLoading();
          }, 600); // Reduzido de 1000ms para 600ms
        }
        
        currentStep++;
      } else {
        clearInterval(progressInterval);
      }
    }, 650); // Reduzido de 1000ms para 650ms
  };

  const startLoadingAnimations = () => {
    // Animação de entrada da logo com múltiplos efeitos
    Animated.sequence([
      Animated.spring(loadingScale, {
        toValue: 1,
        friction: 3,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(loadingTextOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotação contínua da logo
    Animated.loop(
      Animated.timing(logoRotation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Pulsação da logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação de glow da logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoGlow, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(logoGlow, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação dos pontos de loading
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(dotsAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação de partículas flutuantes
    Animated.loop(
      Animated.timing(particlesAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Efeito de scanline
    Animated.loop(
      Animated.timing(scanlineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  const finishLoading = () => {
    // Fade out mais rápido da tela de loading
    Animated.timing(loadingOpacity, {
      toValue: 0,
      duration: 500, // Reduzido de 800ms
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false);
      startMainAnimations();
    });
  };

  const startMainAnimations = () => {
    // Animações mais rápidas e suaves
    Animated.sequence([
      // Logo do topo aparece primeiro
      Animated.parallel([
        Animated.timing(topLogoOpacity, {
          toValue: 1,
          duration: 300, // Reduzido de 500ms
          useNativeDriver: true,
        }),
        Animated.timing(topLogoTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      // Elementos decorativos
      Animated.parallel([
        Animated.timing(decoOpacity, {
          toValue: 0.07,
          duration: 400, // Reduzido de 600ms
          useNativeDriver: true,
        }),
        Animated.timing(decoTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),

      // Painel principal aparece
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500, // Reduzido de 800ms
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(glassOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Escala do painel
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),

      // Terminal e botão aparecem juntos
      Animated.parallel([
        Animated.timing(terminalOpacity, {
          toValue: 0.08,
          duration: 600, // Reduzido de 1000ms
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),

      // Footer aparece por último
      Animated.parallel([
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 400, // Reduzido de 600ms
          useNativeDriver: true,
        }),
        Animated.timing(footerTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => startButtonPulse());

    // Rotação da logo inline
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000, // Reduzido de 1500ms
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

  // Interpolações para animações de loading
  const logoGlowOpacity = logoGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.9],
  });

  const logoRotate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const particle1Y = particlesAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const particle2Y = particlesAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  const particle3Y = particlesAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const scanlineY = scanlineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const dot1Opacity = dotsAnimation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0.3, 1, 0.3, 0.3],
  });

  const dot2Opacity = dotsAnimation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0.3, 0.3, 1, 0.3],
  });

  const dot3Opacity = dotsAnimation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0.3, 0.3, 0.3, 1],
  });

  // Tela de Loading melhorada
  if (isLoading) {
    return (
      <View style={styles.loadingBackground}>
        {/* Efeito de partículas flutuantes */}
        <Animated.View
          style={[
            styles.particle,
            styles.particle1,
            {
              transform: [
                { translateY: particle1Y },
                { translateX: particlesAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }) },
              ],
              opacity: particlesAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 0.3, 0.8],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.particle,
            styles.particle2,
            {
              transform: [
                { translateY: particle2Y },
                { translateX: particlesAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }) },
              ],
              opacity: particlesAnim.interpolate({
                inputRange: [0, 0.3, 0.7, 1],
                outputRange: [0.6, 0.9, 0.2, 0.6],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.particle,
            styles.particle3,
            {
              transform: [
                { translateY: particle3Y },
                { translateX: particlesAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 15],
                }) },
              ],
              opacity: particlesAnim.interpolate({
                inputRange: [0, 0.4, 0.8, 1],
                outputRange: [0.7, 0.2, 0.8, 0.7],
              }),
            },
          ]}
        />

        {/* Efeito de scanline */}
        <Animated.View
          style={[
            styles.scanline,
            {
              transform: [{ translateY: scanlineY }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: loadingOpacity,
            },
          ]}
        >
          {/* Container da logo com múltiplos efeitos */}
          <View style={styles.logoWrapper}>
            <Animated.View
              style={[
                styles.loadingLogoContainer,
                {
                  transform: [
                    { scale: Animated.multiply(loadingScale, pulseAnimation) },
                    { rotate: logoRotate },
                  ],
                  shadowOpacity: logoGlowOpacity,
                },
              ]}
            >
              <Image
                source={require('@/assets/images/logo_small_foot.jpg')}
                style={styles.loadingLogo}
                resizeMode="contain"
              />
              
              {/* Círculos orbitais */}
              <Animated.View
                style={[
                  styles.orbitalRing,
                  styles.ring1,
                  {
                    transform: [{ rotate: logoRotate }],
                    opacity: logoGlowOpacity,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.orbitalRing,
                  styles.ring2,
                  {
                    transform: [{ 
                      rotate: logoRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-360deg'],
                      })
                    }],
                    opacity: logoGlow.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 0.2],
                    }),
                  },
                ]}
              />
            </Animated.View>

            {/* Hexágono decorativo */}
            <Animated.View
              style={[
                styles.hexagon,
                {
                  transform: [{ 
                    rotate: logoRotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    })
                  }],
                  opacity: logoGlow.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 0.3],
                  }),
                },
              ]}
            />
          </View>

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

          {/* Sistema de loading mais elaborado */}
          <Animated.View
            style={[
              styles.loadingSystem,
              {
                opacity: loadingTextOpacity,
              },
            ]}
          >
            {/* Status do sistema */}
            <View style={styles.systemStatus}>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: isCompleted ? '#00ff00' : '#ff6b00' }]} />
                <Text style={styles.statusText}>SISTEMA: {isCompleted ? 'ONLINE' : 'CARREGANDO'}</Text>
              </View>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: loadingProgress > 50 ? '#00ff00' : '#ff6b00' }]} />
                <Text style={styles.statusText}>MÓDULOS: {loadingProgress > 50 ? 'ATIVOS' : 'INICIANDO'}</Text>
              </View>
            </View>

            {/* Barra de Progresso futurística */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: progressBarWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                      backgroundColor: isCompleted ? '#00ff00' : '#ff0000ff',
                    },
                  ]}
                />
                {/* Efeito de brilho na barra */}
                <Animated.View
                  style={[
                    styles.progressGlow,
                    {
                      opacity: isCompleted ? 0.8 : 0.5,
                    },
                  ]}
                />
                {/* Indicadores na barra */}
                {[25, 50, 75].map((mark, index) => (
                  <View
                    key={index}
                    style={[
                      styles.progressMark,
                      { left: `${mark}%` },
                    ]}
                  />
                ))}
              </View>
              <Text style={[
                styles.progressText,
                { color: isCompleted ? '#00ff00' : '#ff0000ff' }
              ]}>
                {isCompleted ? 'SISTEMA PRONTO!' : `PROGRESSO: ${loadingProgress}%`}
              </Text>
            </View>
          </Animated.View>

          {/* Dots de loading mais elaborados */}
          <Animated.View
            style={[
              styles.loadingDotsContainer,
              {
                opacity: loadingTextOpacity,
              },
            ]}
          >
            <View style={styles.loadingDots}>
              <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
              <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
              <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
            </View>
            <Text style={styles.loadingSubtext}>Inicializando componentes...</Text>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  // Tela Principal (sem alterações)
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
  
  // Estilos da tela de loading super melhorados
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    position: 'relative',
  },
  
  // Partículas flutuantes
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#ffd700',
    borderRadius: 2,
  },
  particle1: {
    top: '20%',
    left: '15%',
  },
  particle2: {
    top: '70%',
    right: '20%',
  },
  particle3: {
    top: '40%',
    right: '10%',
  },

  // Efeito scanline
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ffff',
    opacity: 0.3,
    shadowColor: '#00ffff',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  // Container da logo com efeitos
  logoWrapper: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingLogoContainer: {
    shadowColor: '#ffd700',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 30,
    position: 'relative',
  },
  loadingLogo: {
    width: 80, // Reduzido de 120 para 80
    height: 80, // Reduzido de 120 para 80
    borderRadius: 40,
  },

  // Anéis orbitais
  orbitalRing: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 999,
    borderColor: '#ffd700',
  },
  ring1: {
    width: 120,
    height: 120,
    top: -20,
    left: -20,
    borderStyle: 'dashed',
  },
  ring2: {
    width: 140,
    height: 140,
    top: -30,
    left: -30,
    borderStyle: 'dotted',
  },

  // Hexágono decorativo
  hexagon: {
    position: 'absolute',
    width: 160,
    height: 160,
    top: -40,
    left: -40,
    borderWidth: 1,
    borderColor: '#00ffff',
    transform: [{ rotate: '0deg' }],
  },

  loadingText: {
    color: '#fbff00ff',
    fontSize: 16, // Reduzido de 18
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
    textShadowColor: '#eff313ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
    marginBottom: 30,
    letterSpacing: 1,
  },

  // Sistema de loading elaborado
  loadingSystem: {
    width: '85%',
    alignItems: 'center',
    marginBottom: 20,
  },

  systemStatus: {
    width: '100%',
    marginBottom: 20,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },

  statusText: {
    color: '#00ff88',
    fontSize: 12,
    fontFamily: 'monospace',
    textShadowColor: 'rgba(0, 255, 136, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  loadingDotsContainer: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffd700',
    shadowColor: '#ffd700',
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  loadingSubtext: {
    color: '#888',
    fontSize: 11,
    fontFamily: 'monospace',
    fontStyle: 'italic',
  },

  // (Removido o segundo progressContainer duplicado)

  progressText: {
    fontSize: 14, // Reduzido de 16
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'monospace',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  progressBar: {
    width: '100%',
    height: 16, // Aumentado de 14 para 16
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#ffd700',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    position: 'relative',
  },
  progressGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffd700',
    borderRadius: 6,
  },
  progressMark: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#333',
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