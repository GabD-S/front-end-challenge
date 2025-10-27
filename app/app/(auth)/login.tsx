
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn, signing } = useAuth();
  const [error, setError] = React.useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    try {
      await signIn({ email, password });
      setEmail('');
      setPassword('');
      router.replace('/(tabs)');
    } catch (e: any) {
      const apiMsg = e?.response?.data?.message || e?.message;
      setError(apiMsg || 'E-mail não encontrado ou inválido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Input
        label="Email"
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      {signing ? (
        <ActivityIndicator style={{ marginVertical: 16 }} />
      ) : (
        <Button label="Entrar" onPress={handleLogin} />
      )}
      <Button
        label="Não tem conta? Cadastre-se"
        backgroundColor="#fff"
        labelColor="#7c3aed"
        onPress={() => router.push('/(auth)/signup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    color: '#f44336',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 15,
  },
});
