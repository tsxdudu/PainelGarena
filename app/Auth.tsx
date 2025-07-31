import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

const logos = [
  require('../assets/produtos/IMG-20250626-WA0008.jpg'),
  require('../assets/produtos/IMG-20250626-WA0009.jpg'),
  require('../assets/produtos/IMG-20250626-WA0010.jpg'),
  require('../assets/produtos/IMG-20250626-WA0011.jpg'),
  require('../assets/produtos/IMG-20250626-WA0012.jpg'),
  require('../assets/produtos/IMG-20250626-WA0013.jpg'),
  require('../assets/produtos/IMG-20250626-WA0014.jpg'),
  require('../assets/produtos/IMG-20250626-WA0015.jpg'),
  require('../assets/produtos/IMG-20250626-WA0016.jpg'),
  require('../assets/produtos/IMG-20250626-WA0017.jpg'),
  require('../assets/produtos/IMG-20250626-WA0018.jpg'),
  require('../assets/produtos/IMG-20250626-WA0019.jpg'),

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
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
          router.replace('/');
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalDesc}>{modalDesc}</Text>
            <Button title="Fechar" onPress={() => {
              setModalVisible(false);
              router.replace('/');
            }} />
          </View>
        </View>
      </Modal>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo_small_foot.jpg')} style={[styles.logoHeader]}/>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 260,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalDesc: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 28,
    paddingLeft: 28,
  },
  logoHeader: {
    width: 48,
    height: 48,
  },
  card: {
    marginHorizontal: 24,
    marginVertical: 48,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginRight: 12,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loading: {
    marginVertical: 12,
  },
  error: {
    color: 'red',
    marginTop: 8,
    marginBottom: 8,
  },
  result: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f6f6f6',
    borderRadius: 6,
  },
  resultText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  logoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    gap: 8,
  },
  logoContainer: {
    width: 56,
    height: 56,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  logoSelected: {
    borderWidth: 2,
    borderColor: '#ff0000ff',
    backgroundColor: '#e6f0ff',
  },
  selectBox: {
    position: 'absolute',
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: '#ff0000ff',
    borderRadius: 6,
    padding: 4,
    zIndex: 2,
  },
});
