
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native';
import Button from '@/src/components/Button';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { getAulas, Aula, enrollInAula, getAulaById, deleteAula } from '@/src/services/api';
import { useAuth } from '@/src/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import styles from '@/src/styles/tabs/show.styles';

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
                      onPress={() => router.push({ pathname: '/edit' as any, params: { id: aula.id } })}
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
                              router.replace('/' as any);
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

// styles moved to ./show.styles
