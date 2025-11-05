import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Aula, getAulas, enrollInAula, unenrollFromAula, deleteAula } from '@/src/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import styles from '@/src/styles/tabs/aulas.styles';

export default function AulasScreen() {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const categoriaParam = typeof params?.categoria === 'string' ? params.categoria : undefined;

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getAulas();
    const filtered = categoriaParam ? data.filter(a => (a.categoria || '').toLowerCase() === categoriaParam.toLowerCase()) : data;
    setAulas(filtered);
    setLoading(false);
  }, [categoriaParam]);

  useEffect(() => { load(); }, [load]);

  async function handleInscrever(aulaId: string) {
    if (!user) {
      Alert.alert('Faça login', 'Você precisa estar logado para se inscrever.', [
        { text: 'Ir para Login', onPress: () => router.push('/(auth)/login') },
        { text: 'Cancelar', style: 'cancel' },
      ]);
      return;
    }
    if (user.role !== 'usuario') {
      Alert.alert('Ação não permitida', 'Apenas alunos podem se inscrever.');
      return;
    }
    setEnrolling(aulaId);
    try {
      const updated = await enrollInAula(aulaId, user.email);
      setAulas(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    } catch (e: any) {
      Alert.alert('Não foi possível inscrever', e.message || 'Erro desconhecido');
    }
    setEnrolling(null);
  }

  async function handleDesinscrever(aulaId: string) {
    if (!user) return;
    setEnrolling(aulaId);
    try {
      const updated = await unenrollFromAula(aulaId, user.email);
      setAulas(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    } finally {
      setEnrolling(null);
    }
  }

  async function handleRemover(aulaId: string) {
    Alert.alert('Remover aula', 'Tem certeza que deseja remover esta aula?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: async () => {
        await deleteAula(aulaId);
        setAulas(prev => prev.filter(a => a.id !== aulaId));
      }},
    ]);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#a855f7" />
        <Text style={{ color: '#a855f7', marginTop: 12 }}>Carregando aulas...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#1f0a3f", "#2a1557", "#2a1557"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Aulas Disponíveis</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {(user?.role === 'admin' || user?.role === 'professor') && (
              <Pressable onPress={() => router.push('/create' as any)} style={{ marginRight: 12 }}>
                <Text style={[styles.back, { color: '#22c55e', fontWeight: 'bold' }]}>＋ Criar Aula</Text>
              </Pressable>
            )}
            <Pressable onPress={() => router.back()}>
              <Text style={styles.back}>← Voltar</Text>
            </Pressable>
          </View>
        </View>
        <FlatList
          data={aulas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          renderItem={({ item }) => {
            const cheio = (item.vagas ?? 0) <= 0;
            const jaInscrito = (item.inscritos || []).includes(user?.email || '');
            const canEnroll = (user?.role ?? 'usuario') === 'usuario';
            return (
              <BlurView intensity={40} style={styles.card}>
                <LinearGradient colors={["rgba(168,85,247,0.15)", "rgba(124,58,237,0.08)"]} style={styles.cardInner}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>{item.nome}</Text>
                    <View style={[styles.badge, cheio ? styles.badgeFull : styles.badgeOk]}>
                      <Text style={styles.badgeText}>{cheio ? 'Sem vagas' : `${item.vagas} vagas`}</Text>
                    </View>
                  </View>
                  <Text style={styles.detail}>👨‍🏫 {item.professor}</Text>
                  <Text style={styles.detail}>⏰ {item.horario}</Text>
                  <Text style={styles.detail}>📅 {(item.dias || []).join(', ')}</Text>
                  {!!item.inscritos?.length && (
                    <Text style={styles.inscritos}>Inscritos: {item.inscritos.join(', ')}</Text>
                  )}
                  <View style={styles.actions}>
                    {canEnroll ? (
                      jaInscrito ? (
                        <Pressable
                          disabled={enrolling === item.id}
                          onPress={() => handleDesinscrever(item.id)}
                          style={({ pressed }) => [styles.button, { backgroundColor: '#ef4444' }, { opacity: pressed ? 0.8 : 1 }]}
                        >
                          <Text style={styles.buttonText}>Desinscrever</Text>
                        </Pressable>
                      ) : (
                        <Pressable
                          disabled={cheio || enrolling === item.id}
                          onPress={() => handleInscrever(item.id)}
                          style={({ pressed }) => [
                            styles.button,
                            cheio ? styles.buttonDisabled : styles.buttonPrimary,
                            { opacity: pressed ? 0.8 : 1 },
                          ]}
                        >
                          <Text style={styles.buttonText}>Inscrever-se</Text>
                        </Pressable>
                      )
                    ) : (
                      <View style={{ flexDirection: 'row' }}>
                        <Pressable style={[styles.button, { backgroundColor: '#2dd4bf', marginRight: 8 }]} onPress={() => router.push({ pathname: '/edit', params: { id: item.id } } as any)}>
                          <Text style={styles.buttonText}>Editar</Text>
                        </Pressable>
                        <Pressable style={[styles.button, { backgroundColor: '#ef4444' }]} onPress={() => handleRemover(item.id)}>
                          <Text style={styles.buttonText}>Remover</Text>
                        </Pressable>
                      </View>
                    )}
                    <Pressable onPress={() => router.push({ pathname: '/show', params: { id: item.id } } as any)}>
                      <Text style={styles.link}>Ver detalhes →</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </BlurView>
            );
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

// styles moved to ./aulas.styles
