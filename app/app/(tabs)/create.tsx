import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { createAula, CreateAulaPayload } from '@/src/services/api';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { useAuth } from '@/src/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function CreateAulaScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [nome, setNome] = useState('');
  const [professor, setProfessor] = useState('');
  const [horario, setHorario] = useState('');
  const [dias, setDias] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vagas, setVagas] = useState('10');
  const [categoria, setCategoria] = useState('');
  const [nivel, setNivel] = useState('Todos os níveis');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Gate de permissão: apenas professor/admin podem acessar
    if (!user) return;
    const allowed = user.role === 'professor' || user.role === 'admin';
    if (!allowed) {
      Alert.alert('Acesso negado', 'Apenas professores e administradores podem criar aulas.', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ]);
    }
    if (!professor && user?.role === 'professor') {
      setProfessor(user.email);
    }
  }, [user]);

  async function handleCreate() {
    setError('');
    if (!nome || !professor || !horario || !dias || !descricao) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    setSaving(true);
    try {
      const payload: CreateAulaPayload = {
        nome,
        professor,
        horario,
        dias: dias.split(',').map(d => d.trim()).filter(Boolean),
        descricao,
        vagas: Number.isNaN(Number(vagas)) ? 10 : Number(vagas),
        categoria: categoria || undefined,
        nivel: nivel || undefined,
      };
      await createAula(payload);
      // Volta para Home; ela recarrega automaticamente ao focar
      router.replace('/(tabs)' as any);
    } catch (e: any) {
      setError(e.message || 'Erro ao criar aula.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <LinearGradient colors={['#1f0a3f', '#2a1557', '#1f0a3f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 20 }}>
          <BlurView intensity={50} style={styles.contentCard}>
            <View style={styles.cardInner}>
              <View style={styles.header}>
                <Text style={styles.title}>➕ Criar Nova Aula</Text>
                <Text style={styles.subtitle}>Preencha os dados para adicionar aos destaques</Text>
              </View>

              <View style={styles.form}>
                <Input label="Nome da Aula" value={nome} onChangeText={setNome} placeholder="Ex: CrossFit Intenso" />
                <Input label="Professor" value={professor} onChangeText={setProfessor} placeholder="Nome do professor" />
                <Input label="Horário" value={horario} onChangeText={setHorario} placeholder="Ex: 08:00 - 09:00" />
                <Input label="Dias da Semana" value={dias} onChangeText={setDias} placeholder="Ex: Segunda, Quarta, Sexta" />
                <Input label="Descrição" value={descricao} onChangeText={setDescricao} placeholder="Descreva a aula..." multiline numberOfLines={4} />
                <Input label="Vagas" value={vagas} onChangeText={setVagas} placeholder="Ex: 12" keyboardType="numeric" />
                <Input label="Categoria (opcional)" value={categoria} onChangeText={setCategoria} placeholder="Ex: crossfit, yoga" />
                <Input label="Nível (opcional)" value={nivel} onChangeText={setNivel} placeholder="Ex: Iniciante / Intermediário" />
              </View>

              {!!error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️ {error}</Text>
                </View>
              )}

              {saving ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#2dd4bf" />
                  <Text style={styles.loadingText}>Criando...</Text>
                </View>
              ) : (
                <>
                  <Button label="✅ Criar Aula" onPress={handleCreate} backgroundColor="#22c55e" style={{ marginBottom: 12 }} />
                  <Button label="Cancelar" onPress={() => router.back()} backgroundColor="rgba(255,255,255,0.1)" labelColor="#f5f7fb" />
                </>
              )}
            </View>
          </BlurView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentCard: { marginHorizontal: 16, borderRadius: 20, overflow: 'hidden' },
  cardInner: { padding: 24, borderWidth: 1, borderColor: 'rgba(45, 212, 191, 0.3)', backgroundColor: 'rgba(45, 212, 191, 0.05)' },
  header: { marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#f5f7fb', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#2dd4bf', fontWeight: '500' },
  form: { marginBottom: 20 },
  errorBox: { backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', marginBottom: 16 },
  errorText: { color: '#fca5a5', fontSize: 14, fontWeight: '600' },
  loadingContainer: { alignItems: 'center', paddingVertical: 20 },
  loadingText: { color: '#2dd4bf', marginTop: 12, fontSize: 16, fontWeight: '600' },
});
