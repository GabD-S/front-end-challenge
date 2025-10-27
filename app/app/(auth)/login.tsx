import { router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn, signing } = useAuth();
  const [type, setType] = React.useState<'customer' | 'teacher' | 'admin'>('customer');

  const handleLogin = async () => {
    try {
      await signIn({ email, password });
      Alert.alert('Sucesso', 'Login realizado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ]);
    } catch (e: any) {
      // Tenta extrair mensagem da API
      const apiMsg = e?.response?.data?.message || e?.message;
      Alert.alert('Erro', apiMsg || 'Falha ao entrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.description}>Digite seu email cadastrado</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <Text style={styles.description}>Digite sua senha de acesso</Text>
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo de usuário</Text>
        <Text style={styles.description}>Escolha o tipo de conta</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button
            title="Aluno"
            color={type === 'customer' ? '#4caf50' : '#555'}
            onPress={() => setType('customer')}
          />
          <Button
            title="Professor"
            color={type === 'teacher' ? '#2196f3' : '#555'}
            onPress={() => setType('teacher')}
          />
          <Button
            title="Admin"
            color={type === 'admin' ? '#f44336' : '#555'}
            onPress={() => setType('admin')}
          />
        </View>
      </View>
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
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#222', // fundo escuro para contraste
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 16,
  },
  description: {
    color: '#bbb',
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    backgroundColor: '#333',
    fontSize: 16,
  },
});
