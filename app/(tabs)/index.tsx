import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
  const loadingTextOpacity = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Iniciar animações dos anéis
    Animated.loop(
      Animated.timing(logoRotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Fade in do texto
    Animated.timing(loadingTextOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Simular tempo de loading e depois fazer transição
    const timer = setTimeout(() => {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
        startMainAnimations();
      });
    }, 3000); // 3 segundos de loading

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    router.push('/Auth');
  };

  const rotateLogo = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Tela de Loading com anéis animados
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
          {/* Container dos anéis rotativos */}
          <View style={styles.ringContainer}>
            {/* Anel 1 - Rosa/Magenta */}
            <Animated.View
              style={[
                styles.ring,
                styles.ring1,
                {
                  transform: [
                    { rotateX: '50deg' },
                    { 
                      rotateZ: logoRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['110deg', '470deg'],
                      })
                    },
                  ],
                },
              ]}
            />
            
            {/* Anel 2 - Vermelho */}
            <Animated.View
              style={[
                styles.ring,
                styles.ring2,
                {
                  transform: [
                    { rotateX: '20deg' },
                    { rotateY: '50deg' },
                    { 
                      rotateZ: logoRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['20deg', '380deg'],
                      })
                    },
                  ],
                },
              ]}
            />
            
            {/* Anel 3 - Ciano */}
            <Animated.View
              style={[
                styles.ring,
                styles.ring3,
                {
                  transform: [
                    { rotateX: '40deg' },
                    { rotateY: '130deg' },
                    { 
                      rotateZ: logoRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['450deg', '90deg'],
                      })
                    },
                  ],
                },
              ]}
            />
            
            {/* Anel 4 - Laranja */}
            <Animated.View
              style={[
                styles.ring,
                styles.ring4,
                {
                  transform: [
                    { rotateX: '70deg' },
                    { 
                      rotateZ: logoRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['270deg', '630deg'],
                      })
                    },
                  ],
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
            Painel Kronos777 Esta carregando...
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
    >

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
            <Text style={styles.titleText}>KRONOS777</Text>
            <Animated.View
              style={[
                styles.logoInline,
                {
                  transform: [{ scale: scaleAnim }, { rotate: rotateLogo }],
                },
              ]}
            >
              <Text style={styles.logoInlineText}>K777</Text>
            </Animated.View>
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
          <View style={styles.footerLogo}>
            <Text style={styles.footerLogoText}>K777</Text>
          </View>
          <Text style={styles.footerText}>
            Copyright © kronos777 International.{'\n'}
            Trademarks belong to their respective owners. All rights Reserved.
          </Text>
        </View>
      </Animated.View>
    </View>
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


  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  // Container dos anéis
  ringContainer: {
    position: 'relative',
    width: 190,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  // Estilo base dos anéis
  ring: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 8,
    borderColor: 'transparent',
  },

  // Anel 1 - Roxo claro
  ring1: {
    borderBottomColor: '#895af6',
  },

  // Anel 2 - Roxo médio
  ring2: {
    borderBottomColor: '#7c3aed',
  },

  // Anel 3 - Roxo escuro
  ring3: {
    borderBottomColor: '#6d28d9',
  },

  // Anel 4 - Roxo muito escuro
  ring4: {
    borderBottomColor: '#5b21b6',
  },

  loadingText: {
    color: '#895af6',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'monospace',
    marginTop: 10,
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

  topLogoPlaceholder: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#895af6',
    borderRadius: 15,
  },

  topLogoText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
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
    borderColor: 'rgba(137, 90, 246, 0.4)',
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
    color: '#895af6',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#895af6',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  line: {
    width: 160,
    height: 2,
    backgroundColor: '#895af6',
    borderRadius: 1,
    shadowColor: '#895af6',
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  logoInline: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#895af6',
    backgroundColor: '#895af6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoInlineText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#895af6',
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
    backgroundColor: '#895af6',
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
    backgroundColor: '#895af6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerLogoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});