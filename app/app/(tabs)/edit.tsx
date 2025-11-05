import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAulas, Aula } from '@/src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { useAuth } from '@/src/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import styles from './edit.styles';

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  // Gate de permissão: apenas professor/admin podem acessar
  useEffect(() => {
    if (!user) return; // ainda carregando estado de auth
    const allowed = user.role === 'professor' || user.role === 'admin';
    if (!allowed) {
      Alert.alert('Acesso negado', 'Apenas professores e administradores podem editar aulas.', [
        { text: 'OK', onPress: () => router.replace({ pathname: '/(tabs)/show', params: { id } }) },
      ]);
    }
  }, [user, id]);

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
  setDias(Array.isArray(found.dias) ? found.dias.join(', ') : '-');
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
    <LinearGradient
      colors={['#0f0c29', '#1a1637', '#2d1b4e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#a855f7" />
          </View>
        ) : !aula ? (
          <View style={styles.center}>
            <Text style={styles.error}>❌ Aula não encontrada.</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 20 }}>
            <BlurView intensity={50} style={styles.contentCard}>
              <LinearGradient
                colors={['rgba(168, 85, 247, 0.15)', 'rgba(124, 58, 237, 0.08)']}
                style={styles.cardGradient}
              >
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>✏️ Editar Aula</Text>
                  <Text style={styles.subtitle}>Atualize as informações da aula</Text>
                </View>

                {/* Formulário */}
                <View style={styles.form}>
                  <Input
                    label="Nome da Aula"
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome"
                  />
                  <Input
                    label="Professor"
                    value={professor}
                    onChangeText={setProfessor}
                    placeholder="Nome do professor"
                  />
                  <Input
                    label="Horário"
                    value={horario}
                    onChangeText={setHorario}
                    placeholder="Ex: 08:00 - 09:00"
                  />
                  <Input
                    label="Dias da Semana"
                    value={dias}
                    onChangeText={setDias}
                    placeholder="Ex: Segunda, Quarta, Sexta"
                  />
                  <Input
                    label="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Descreva a aula..."
                    multiline
                    numberOfLines={4}
                  />
                </View>

                {/* Mensagem de erro */}
                {!!error && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>⚠️ {error}</Text>
                  </View>
                )}

                {/* Botões */}
                <View style={styles.buttons}>
                  {saving ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="#a855f7" />
                      <Text style={styles.loadingText}>Salvando...</Text>
                    </View>
                  ) : (
                    <>
                      <Button
                        label="💾 Salvar Alterações"
                        onPress={handleSave}
                        backgroundColor="#a855f7"
                        style={{ marginBottom: 12 }}
                      />
                      <Button
                        label="❌ Cancelar"
                        onPress={() => router.back()}
                        backgroundColor="rgba(255, 255, 255, 0.1)"
                        labelColor="#e9d5ff"
                      />
                    </>
                  )}
                </View>
              </LinearGradient>
            </BlurView>
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

// styles moved to ./edit.styles
