
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native';
import Button from '@/src/components/Button';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { getAulas, Aula, enrollInAula, getAulaById, deleteAula } from '@/src/services/api';
import { useAuth } from '@/src/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function ShowScreen() {
  const { id } = useLocalSearchParams();
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const found = await getAulaById(String(id));
      setAula(found || null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: '#1f0a3f' }]}>
        <ActivityIndicator size="large" color="#2dd4bf" />
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

  return (
    <LinearGradient
      colors={['#1f0a3f', '#2a1557', '#1f0a3f']}
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
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Header com Voltar */}
            <View style={styles.headerSection}>
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </Pressable>
            </View>

            {/* Imagem de Capa */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/placeholder.png')}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(31, 10, 63, 0.95)']}
                style={styles.imageOverlay}
              />
            </View>

            {/* Card Principal */}
            <BlurView intensity={50} style={styles.contentCard}>
              <LinearGradient
                colors={['rgba(45, 212, 191, 0.12)', 'rgba(245, 247, 251, 0.06)']}
                style={styles.cardGradient}
              >
                {/* Título */}
                <View style={styles.titleSection}>
                  <Text style={styles.title}>{aula.nome}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.badgeText}>🔴 Ativo</Text>
                  </View>
                </View>

                {/* Informações Principais */}
                <View style={styles.infoGrid}>
                  {/* Professor */}
                  <BlurView intensity={30} style={styles.infoCard}>
                    <LinearGradient
                      colors={['rgba(45, 212, 191, 0.16)', 'rgba(245, 247, 251, 0.06)']}
                      style={styles.infoGradient}
                    >
                      <Text style={styles.infoLabel}>👨‍🏫 Professor</Text>
                      <Text style={styles.infoValue}>{aula.professor}</Text>
                    </LinearGradient>
                  </BlurView>

                  {/* Horário */}
                  <BlurView intensity={30} style={styles.infoCard}>
                    <LinearGradient
                      colors={['rgba(45, 212, 191, 0.16)', 'rgba(245, 247, 251, 0.06)']}
                      style={styles.infoGradient}
                    >
                      <Text style={styles.infoLabel}>⏰ Horário</Text>
                      <Text style={styles.infoValue}>{aula.horario}</Text>
                    </LinearGradient>
                  </BlurView>
                </View>

                {/* Dias da Semana */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>📅 Dias da Semana</Text>
                  <View style={styles.daysContainer}>
                    {(Array.isArray(aula.dias) ? aula.dias : ['-']).map((dia, idx) => (
                      <View key={idx} style={styles.dayBadge}>
                        <Text style={styles.dayText}>{dia}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Descrição */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>📝 Descrição</Text>
                  <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>{aula.descricao}</Text>
                  </View>
                </View>

                {/* Lista de Inscritos e Vagas */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>👥 Vagas e Inscritos</Text>
                  <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>Vagas restantes: {typeof aula.vagas === 'number' ? aula.vagas : 0}</Text>
                    <Text style={[styles.descriptionText, { marginTop: 8 }]}>Inscritos: {(aula.inscritos || []).length > 0 ? aula.inscritos?.join(', ') : 'Nenhum inscrito ainda'}</Text>
                  </View>
                </View>

                {/* Botões de Ação */}
                <View style={styles.actionButtons}>
                  {user?.role === 'usuario' && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.editButtonContainer,
                        { transform: [{ scale: pressed ? 0.95 : 1 }] },
                      ]}
                      onPress={async () => {
                        if (!user) return;
                        try {
                          const updated = await enrollInAula(String(aula.id), user.email);
                          setAula(updated);
                        } catch (e: any) {
                          // noop: poderia exibir Alert se desejado
                        }
                      }}
                    >
                      <LinearGradient
                        colors={['#22c55e', '#16a34a']}
                        style={styles.editButton}
                      >
                        <Text style={styles.buttonText}>✅ Inscrever-se</Text>
                      </LinearGradient>
                    </Pressable>
                  )}
                  {(user?.role === 'professor' || user?.role === 'admin') && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.editButtonContainer,
                        { transform: [{ scale: pressed ? 0.95 : 1 }] },
                      ]}
                      onPress={() => router.push({ pathname: '/(tabs)/edit', params: { id: aula.id } })}
                    >
                      <LinearGradient
                        colors={['#2dd4bf', '#14b8a6']}
                        style={styles.editButton}
                      >
                        <Text style={styles.buttonText}>✏️ Editar Aula</Text>
                      </LinearGradient>
                    </Pressable>
                  )}
                  {(user?.role === 'professor' || user?.role === 'admin') && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.editButtonContainer,
                        { transform: [{ scale: pressed ? 0.95 : 1 }] },
                      ]}
                      onPress={() => {
                        Alert.alert('Remover aula', 'Tem certeza que deseja remover esta aula?', [
                          { text: 'Cancelar', style: 'cancel' },
                          {
                            text: 'Remover',
                            style: 'destructive',
                            onPress: async () => {
                              await deleteAula(String(aula.id));
                              router.replace('/(tabs)' as any);
                            },
                          },
                        ]);
                      }}
                    >
                      <LinearGradient colors={['#ef4444', '#b91c1c']} style={styles.editButton}>
                        <Text style={styles.buttonText}>🗑️ Remover Aula</Text>
                      </LinearGradient>
                    </Pressable>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(45, 212, 191, 0.15)',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#2dd4bf',
    fontSize: 14,
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  contentCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.3)',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f5f7fb',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  infoGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.3)',
    borderRadius: 14,
  },
  infoLabel: {
    fontSize: 12,
    color: '#2dd4bf',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    color: '#f5f7fb',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f7fb',
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  dayText: {
    color: '#22c55e',
    fontWeight: '600',
    fontSize: 13,
  },
  descriptionBox: {
    backgroundColor: 'rgba(45, 212, 191, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.3)',
  },
  descriptionText: {
    color: '#c7c9d3',
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtons: {
    marginTop: 20,
    gap: 12,
  },
  editButtonContainer: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  editButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#f87171',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
