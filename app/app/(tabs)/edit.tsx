import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAulas, Aula } from '@/src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Campos editáveis
  const [nome, setNome] = useState('');
  const [professor, setProfessor] = useState('');
  const [horario, setHorario] = useState('');
  const [dias, setDias] = useState('');
  const [descricao, setDescricao] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const aulas = await getAulas();
      const found = aulas.find(a => a.id === id);
      setAula(found || null);
      if (found) {
        setNome(found.nome);
        setProfessor(found.professor);
        setHorario(found.horario);
        setDias(found.dias.join(', '));
        setDescricao(found.descricao);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!aula) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Aula não encontrada.</Text>
      </View>
    );
  }

  async function handleSave() {
    setError('');
    setSaving(true);
    try {
      if (!nome || !professor || !horario || !dias || !descricao) {
        setError('Preencha todos os campos.');
        setSaving(false);
        return;
      }
      const aulasRaw = await AsyncStorage.getItem('MOCK_AULAS');
      let aulas: Aula[] = aulasRaw ? JSON.parse(aulasRaw) : [];
      const idx = aulas.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Aula não encontrada.');
      aulas[idx] = {
        ...aulas[idx],
        nome,
        professor,
        horario,
        dias: dias.split(',').map(d => d.trim()),
        descricao,
      };
      await AsyncStorage.setItem('MOCK_AULAS', JSON.stringify(aulas));
      router.replace({ pathname: '/(tabs)/show', params: { id } });
    } catch (e: any) {
      setError(e.message || 'Erro ao salvar.');
    }
    setSaving(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Aula</Text>
      <Input label="Nome" value={nome} onChangeText={setNome} />
      <Input label="Professor" value={professor} onChangeText={setProfessor} />
      <Input label="Horário" value={horario} onChangeText={setHorario} />
      <Input label="Dias da semana" value={dias} onChangeText={setDias} />
      <Input label="Descrição" value={descricao} onChangeText={setDescricao} multiline numberOfLines={3} />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button label={saving ? 'Salvando...' : 'Salvar Alterações'} onPress={handleSave} disabled={saving} style={{ marginTop: 24 }} />
      <Button label="Cancelar" backgroundColor="#fff" labelColor="#7c3aed" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#222',
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 18,
    textAlign: 'center',
  },
  error: {
    color: '#f44336',
    fontSize: 18,
  },
});
