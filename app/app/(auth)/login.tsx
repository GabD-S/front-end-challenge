import { router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn, signing } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn({ email, password });
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao entrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {signing ? (
        <ActivityIndicator />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
      <View style={{ height: 16 }} />
      <Button
        title="Não tem conta? Cadastre-se"
        onPress={() => router.push('/(auth)/signup')}
        accessibilityLabel="Ir para tela de cadastro"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
