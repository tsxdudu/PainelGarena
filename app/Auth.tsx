import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

const logos = [
  require('../assets/produtos/image.png'),
  require('../assets/produtos/naruto.png'),
  require('../assets/produtos/kakashi.png'),
  require('../assets/produtos/image3.png'),
  require('../assets/produtos/image4.png'),
  require('../assets/produtos/image5.png'),
  require('../assets/produtos/orochimaru.png'),
  require('../assets/produtos/image2.png'),
  require('../assets/produtos/image1.png'),
  require('../assets/produtos/skinLaranja.png'),
  require('../assets/produtos/blue.png'),
  require('../assets/produtos/cabelobranco.png'),
  require('../assets/produtos/coelha.png'),
  require('../assets/produtos/coelhao.png'),
  require('../assets/produtos/punho.png'),
  require('../assets/produtos/dragao.png'),
  require('../assets/produtos/calca.png'),
  require('../assets/produtos/calca-azul.png'),
  require('../assets/produtos/IMG-20250626-WA0008.jpg'),
  require('../assets/produtos/IMG-20250626-WA0009.jpg'),
  require('../assets/produtos/IMG-20250626-WA0011.jpg'),
  require('../assets/produtos/IMG-20250626-WA0012.jpg'),
  require('../assets/produtos/IMG-20250626-WA0013.jpg'),
  require('../assets/produtos/IMG-20250626-WA0014.jpg'),
  require('../assets/produtos/IMG-20250626-WA0015.jpg'),
  require('../assets/produtos/IMG-20250626-WA0016.jpg'),
  require('../assets/produtos/IMG-20250626-WA0017.jpg'),
  require('../assets/produtos/IMG-20250626-WA0018.jpg'),
];

export default function Auth() {
  const [uid, setUid] = useState('');
  const { data, loading, error, fetchInfo } = useAuth();
  const [selectedLogos, setSelectedLogos] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const router = useRouter();

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
        setModalDesc(`Parabéns! Voce acaba de ganhar seus presentes, a recompensa será enviada á sua conta em 24h.`);
        setModalVisible(true);
      }
    }
  }, [loading, error, data]);

  const handleLogoPress = (idx: number) => {
    setSelectedLogos((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Modal */}
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
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={() => router.replace('/')}>
        <Image source={require('../assets/images/logo_small_foot.jpg')} style={[styles.logoHeader]}/>
      </TouchableOpacity>
      {/* Main Card */}
      <View style={styles.card}>
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
    shadowColor: '#ffd700',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    minWidth: 260,
    borderWidth: 2,
    borderColor: '#fbff00ff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fbff00ff',
    fontFamily: 'monospace',
    textShadowColor: '#eff313ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
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
  header: {
    paddingTop: 28,
    paddingLeft: 28,
    alignItems: 'flex-start',
  },
  logoHeader: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#222',
    shadowColor: '#ffd700',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    marginHorizontal: 24,
    marginVertical: 32,
    padding: 28,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 24,
    shadowColor: '#ffd700',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#fbff00ff',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#fbff00ff',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    marginRight: 12,
    color: '#fbff00ff',
    backgroundColor: '#222',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    shadowColor: '#ffd700',
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
  error: {
    color: '#ff0000ff',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 14,
  },
  result: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fbff00ff',
  },
  resultText: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fbff00ff',
    fontFamily: 'monospace',
    fontSize: 16,
  },
  logoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  logoContainer: {
    width: 64,
    height: 64,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255, 204, 0, 0.07)',
    borderRadius: 16,
    shadowColor: '#ffd700',
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
    borderColor: '#fbff00ff',
    backgroundColor: '#ffd70022',
    shadowColor: '#ffd700',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
  },
  selectBox: {
    position: 'absolute',
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: '#fbff00ff',
    borderRadius: 6,
    padding: 4,
    zIndex: 2,
  },
});
