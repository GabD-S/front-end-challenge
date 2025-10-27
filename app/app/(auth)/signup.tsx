
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';

export default function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const { signUp, signing } = useAuth();
  const [error, setError] = React.useState('');

  const handleSignUp = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      await signUp({ email, password });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ]);
    } catch (e: any) {
      const apiMsg = e?.response?.data?.message || e?.message;
      setError(apiMsg || 'Falha ao cadastrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
      <Input
        label="Confirmar senha"
        placeholder="Repita sua senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      {signing ? (
        <ActivityIndicator style={{ marginVertical: 16 }} />
      ) : (
        <Button label="Cadastrar" onPress={handleSignUp} />
      )}
      <Button
        label="Já tem conta? Entrar"
        backgroundColor="#fff"
        labelColor="#7c3aed"
        onPress={() => router.push('/(auth)/login')}
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
