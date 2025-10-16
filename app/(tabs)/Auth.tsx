import React, { useRef, useState } from 'react';
import { ActivityIndicator, Animated, Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const logos = [
  require('../../assets/produtos/image.png'),
  require('../../assets/produtos/naruto.png'),
  require('../../assets/produtos/kakashi.png'),
  require('../../assets/produtos/image3.png'),
  require('../../assets/produtos/image4.png'),
  require('../../assets/produtos/image5.png'),
  require('../../assets/produtos/orochimaru.png'),
  require('../../assets/produtos/image2.png'),
  require('../../assets/produtos/image1.png'),
  require('../../assets/produtos/skinLaranja.png'),
  require('../../assets/produtos/blue.png'),
  require('../../assets/produtos/cabelobranco.png'),
  require('../../assets/produtos/coelha.png'),
  require('../../assets/produtos/coelhao.png'),
  require('../../assets/produtos/punho.png'),
  require('../../assets/produtos/dragao.png'),
  require('../../assets/produtos/calca.png'),
  require('../../assets/produtos/calca-azul.png'),
  require('../../assets/produtos/IMG-20250626-WA0008.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0009.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0011.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0012.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0013.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0014.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0015.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0016.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0017.jpg'),
  require('../../assets/produtos/IMG-20250626-WA0018.jpg'),
];

export default function Auth() {
  const [uid, setUid] = useState('');
  const { data, loading, error, fetchInfo } = useAuth();
  const [selectedLogos, setSelectedLogos] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState<number | null>(null);
  const [showWonModal, setShowWonModal] = useState(false);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  const handleSubmit = () => {
    if (uid.trim()) {
      fetchInfo(uid.trim());
    }
  };

  React.useEffect(() => {
    if (!loading && uid.trim()) {
      if (error) {
        setModalTitle('Erro');
        setModalDesc('User não encontrado');
        setModalVisible(true);
      } else if (data && data.basicInfo && data.basicInfo.nickname) {
        setModalTitle(`Parabéns! ${data.basicInfo.nickname}`);
        setModalDesc(`Parabéns! Voce acaba de ganhar seus presentes, a recompensa será enviada á sua conta em 74h.`);
        setModalVisible(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data]);

  const handleLogoPress = (idx: number) => {
    setSelectedLogos((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    spinAnimation.setValue(0);

    // Escolher item aleatório
    const randomIndex = Math.floor(Math.random() * logos.length);
    setWonItem(randomIndex);

    // Calcular rotação: várias voltas + posição do item
    const spins = 5; // Número de voltas completas
    const itemAngle = (360 / logos.length) * randomIndex;
    const totalRotation = 360 * spins + itemAngle;

    Animated.timing(spinAnimation, {
      toValue: totalRotation,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      setShowWonModal(true);
    });
  };

  const handleClaimPrize = () => {
    if (uid.trim()) {
      fetchInfo(uid.trim());
      setShowWonModal(false);
    }
  };

  const spin = spinAnimation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScrollView style={styles.container}>
      {/* Modal de Prêmio Ganho */}
      <Modal
        visible={showWonModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWonModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Parabéns!</Text>
            <Text style={styles.modalDesc}>Você ganhou:</Text>
            {wonItem !== null && (
              <Image source={logos[wonItem]} style={styles.wonItemImage} />
            )}
            <Text style={styles.modalDesc}>Insira seu ID para receber o prêmio:</Text>
            <TextInput
              style={styles.modalInput}
              value={uid}
              onChangeText={setUid}
              placeholder="Digite o ID"
              placeholderTextColor="#888"
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={handleClaimPrize}
                disabled={loading || !uid.trim()}
              >
                <Text style={styles.modalButtonText}>Resgatar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]} 
                onPress={() => setShowWonModal(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalDesc}>{modalDesc}</Text>
            <Button title="Fechar" onPress={() => {
              setModalVisible(false);
            }} />
          </View>
        </View>
      </Modal>

      {/* Título da Roleta */}
      <View style={styles.rouletteHeader}>
        <Text style={styles.rouletteTitle}>🎰 ROLETA DA SORTE 🎰</Text>
        <Text style={styles.rouletteSubtitle}>Gire e ganhe prêmios incríveis!</Text>
      </View>

      {/* Roleta */}
      <View style={styles.rouletteContainer}>
        <View style={styles.roulettePointer}>
          <View style={styles.pointerTriangle} />
        </View>
        
        <Animated.View 
          style={[
            styles.rouletteWheel,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          {logos.map((logo, idx) => {
            const angle = (360 / logos.length) * idx;
            const radius = 120;
            const radian = (angle * Math.PI) / 180;
            const x = radius * Math.cos(radian - Math.PI / 2);
            const y = radius * Math.sin(radian - Math.PI / 2);

            return (
              <View
                key={idx}
                style={[
                  styles.rouletteItem,
                  {
                    transform: [
                      { translateX: x },
                      { translateY: y },
                      { rotate: `${angle}deg` },
                    ],
                  },
                ]}
              >
                <Image source={logo} style={styles.rouletteItemImage} />
              </View>
            );
          })}
          
          {/* Centro da roleta */}
          <View style={styles.rouletteCenter}>
            <Text style={styles.rouletteCenterText}>K777</Text>
          </View>
        </Animated.View>

        {/* Botão Girar */}
        <TouchableOpacity 
          style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]} 
          onPress={spinWheel}
          disabled={isSpinning}
        >
          <Text style={styles.spinButtonText}>
            {isSpinning ? 'GIRANDO...' : 'GIRAR'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card de Input */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ou busque diretamente:</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={uid}
            onChangeText={setUid}
            placeholder="Digite o ID"
            placeholderTextColor="#888"
            autoCapitalize="none"
          />
          <Button title="Buscar" onPress={handleSubmit} disabled={loading || !uid.trim()} />
        </View>
        {loading && <ActivityIndicator style={styles.loading} />}
      </View>

      {/* Logos Row */}
      <View style={styles.logoRow}>
        {logos.map((logo, idx) => (
          <View key={idx} style={styles.logoContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleLogoPress(idx)}
            >
              <Image source={logo} style={[styles.logo, selectedLogos.includes(idx) && styles.logoSelected]} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#111',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#895af6',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    minWidth: 280,
    maxWidth: 340,
    borderWidth: 2,
    borderColor: '#895af6',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#895af6',
    fontFamily: 'monospace',
    textShadowColor: '#895af6',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'monospace',
  },
  modalInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#895af6',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#895af6',
    backgroundColor: '#222',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  wonItemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 3,
    borderColor: '#895af6',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: '#895af6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#333',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 0,
  },
  rouletteHeader: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  rouletteTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#895af6',
    fontFamily: 'monospace',
    textShadowColor: '#895af6',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  rouletteSubtitle: {
    fontSize: 16,
    color: '#ccc',
    fontFamily: 'monospace',
  },
  rouletteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  roulettePointer: {
    position: 'absolute',
    top: -20,
    zIndex: 10,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#895af6',
  },
  rouletteWheel: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(137, 90, 246, 0.1)',
    borderWidth: 4,
    borderColor: '#895af6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#895af6',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  rouletteItem: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rouletteItemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#895af6',
  },
  rouletteCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#895af6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#895af6',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  rouletteCenterText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  spinButton: {
    marginTop: 30,
    backgroundColor: '#895af6',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#895af6',
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  spinButtonDisabled: {
    opacity: 0.5,
  },
  spinButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardTitle: {
    color: '#895af6',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  card: {
    marginHorizontal: 24,
    marginVertical: 32,
    padding: 28,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 24,
    shadowColor: '#895af6',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#895af6',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#895af6',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    marginRight: 12,
    color: '#895af6',
    backgroundColor: '#222',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    shadowColor: '#895af6',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loading: {
    marginVertical: 12,
  },
  logoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 80,
  },
  logoContainer: {
    width: 64,
    height: 64,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(137, 90, 246, 0.07)',
    borderRadius: 16,
    shadowColor: '#895af6',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  logoSelected: {
    borderWidth: 3,
    borderColor: '#895af6',
    backgroundColor: 'rgba(137, 90, 246, 0.13)',
    shadowColor: '#895af6',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
  },
});
