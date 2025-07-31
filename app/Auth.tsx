import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function Auth() {
  const [uid, setUid] = useState('');
  const { data, loading, error, fetchInfo } = useAuth();

  const handleSubmit = () => {
    if (uid.trim()) {
      fetchInfo(uid.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID da Conta:</Text>
      <TextInput
        style={styles.input}
        value={uid}
        onChangeText={setUid}
        placeholder="Digite o ID"
        autoCapitalize="none"
      />
      <Button title="Buscar" onPress={handleSubmit} disabled={loading || !uid.trim()} />
      {loading && <ActivityIndicator style={styles.loading} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {data && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Resultado:</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
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
});