import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Pressable, Image, Animated, Dimensions, ScrollView, StatusBar, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/src/contexts/AuthContext';
import { Aula as ApiAula, getAulas as getAulasAPI, enrollInAula as enrollAula, unenrollFromAula as unenrollAula, addFeedback, getFeedbacks, Feedback, deleteAula } from '@/src/services/api';

type Categoria = 'yoga' | 'crossfit' | 'pilates' | 'hiit' | 'musculacao';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(360, Math.max(260, Math.floor(width * 0.82)));
// Nova paleta de cores
const Palette = {
  deep: '#1f0a3f', // roxo profundo
  deepAlt: '#2a1557',
  softWhite: '#f5f7fb',
  mint: '#2dd4bf', // verde menta
  bright: '#22c55e', // verde brilhante
  borderMint: 'rgba(45, 212, 191, 0.3)',
  borderSoft: 'rgba(245, 247, 251, 0.12)'
};

export default function IndexScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inicio');
  const [aulas, setAulas] = useState<ApiAula[]>([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [userFeedbacks, setUserFeedbacks] = useState<Feedback[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  const loadData = useCallback(async () => {
    const data = await getAulasAPI();
    setAulas(data);
    const fbs = await getFeedbacks();
    setUserFeedbacks(fbs);
  }, []);

  useEffect(() => {
    (async () => {
      await loadData();
      setLoading(false);
    })();
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      // Recarrega quando a Home entra em foco
      loadData();
      return () => {};
    }, [loadData])
  );

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    }
  }, [loading]);

  const navItems = [
    { id: 'inicio', label: 'Início', icon: '🏠' },
    { id: 'aulas', label: 'Aulas', icon: '📅' },
    { id: 'planos', label: 'Planos', icon: '💎' },
    { id: 'perfil', label: 'Perfil', icon: '👤' },
  ];

  const sportsInfo = [
    {
      id: 's1',
      name: 'CrossFit',
      description: 'Treinamento funcional de alta intensidade que combina levantamento olímpico, ginástica e exercícios metabólicos.',
      benefits: ['Força explosiva', 'Resistência cardiovascular', 'Agilidade'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      color: '#ef4444'
    },
    {
      id: 's2',
      name: 'Yoga',
      description: 'Prática milenar que une corpo e mente através de posturas, respiração e meditação.',
      benefits: ['Flexibilidade', 'Equilíbrio mental', 'Redução do estresse'],
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      color: '#8b5cf6'
    },
    {
      id: 's3',
      name: 'Pilates',
      description: 'Método que fortalece o core e melhora a postura através de movimentos controlados e precisos.',
      benefits: ['Fortalecimento do core', 'Postura correta', 'Consciência corporal'],
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      color: '#10b981'
    },
    {
      id: 's4',
      name: 'HIIT',
      description: 'Treino intervalado de alta intensidade que maximiza queima calórica em menos tempo.',
      benefits: ['Queima de gordura', 'Metabolismo acelerado', 'Eficiência'],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      color: '#f59e0b'
    },
    {
      id: 's5',
      name: 'Musculação',
      description: 'Treinamento resistido focado em hipertrofia muscular e ganho de força.',
      benefits: ['Aumento de massa', 'Força máxima', 'Definição muscular'],
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
      color: '#3b82f6'
    },
  ];

  const testimonials = [
    { id: 't1', name: 'Carla Mendes', age: 29, text: 'Em 6 meses perdi 15kg e ganhei muita disposição. Os professores são extremamente qualificados!', rating: 5, image: 'https://randomuser.me/api/portraits/women/44.jpg', achievement: 'Perda de peso' },
    { id: 't2', name: 'Marcos Silva', age: 34, text: 'Consegui superar meus limites. O ambiente é motivador e a estrutura é de primeiro mundo.', rating: 5, image: 'https://randomuser.me/api/portraits/men/12.jpg', achievement: 'Performance' },
    { id: 't3', name: 'Bruna Costa', age: 24, text: 'Flexibilidade nos horários e aulas variadas. Nunca me senti tão bem com meu corpo!', rating: 5, image: 'https://randomuser.me/api/portraits/women/68.jpg', achievement: 'Bem-estar' },
    { id: 't4', name: 'Pedro Santos', age: 41, text: 'Após lesão no joelho, o pilates me ajudou a recuperar totalmente. Profissionais incríveis!', rating: 5, image: 'https://randomuser.me/api/portraits/men/32.jpg', achievement: 'Recuperação' },
  ];

  const stats = [
    { id: 'st1', value: '15k+', label: 'Alunos Ativos', icon: '👥' },
    { id: 'st2', value: '50+', label: 'Professores', icon: '🏆' },
    { id: 'st3', value: '100+', label: 'Aulas/Semana', icon: '📅' },
    { id: 'st4', value: '98%', label: 'Satisfação', icon: '⭐' },
  ];

  const categoryIcons = {
    yoga: '🧘‍♀️',
    crossfit: '🏋️',
    pilates: '🤸',
    hiit: '⚡',
  };

  const categoryColors = {
    yoga: '#8b5cf6',
    crossfit: '#ef4444',
    pilates: '#10b981',
    hiit: '#f59e0b',
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#a855f7" />
        <Text style={styles.loadingText}>Carregando experiência premium...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Navbar Superior */}
      <Animated.View style={[styles.topNav, { opacity: fadeAnim, transform: [{ translateY: slideAnim }], zIndex: 10 }]}> 
        <View style={styles.navContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>💪</Text>
            </View>
            <Text style={styles.logoText}>FitPro Elite</Text>
          </View>
          {!user ? (
            <Pressable style={styles.loginButton} onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </Pressable>
          ) : (
            <View style={styles.navActions}>
              <Pressable style={[styles.loginButton, { backgroundColor: Palette.mint, marginRight: 8 }]} onPress={() => {
                if ((user as any)?.role === 'admin') router.push('/(tabs)/admin');
                else if ((user as any)?.role === 'professor') router.push('/(tabs)/professor');
                else router.push('/(tabs)/explore');
              }}>
                <Text style={styles.loginButtonText}>Perfil</Text>
              </Pressable>
              <Pressable style={[styles.loginButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]} onPress={async () => {
                await signOut();
                router.push('/(auth)/login');
              }}>
                <Text style={styles.loginButtonText}>Sair</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Animated.View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Hero Section */}
          <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}> 
            <View style={styles.heroOverlay} pointerEvents="box-none">
              <Text style={styles.heroTitle}>{`Transforme seu corpo,
Eleve sua mente`}</Text>
              <Text style={styles.heroSubtitle}>Treinamento profissional com resultados comprovados</Text>
              <Pressable style={styles.ctaButton} onPress={() => router.push('/(tabs)/aulas')}>
                <Text style={styles.ctaButtonText}>Começar Jornada 🚀</Text>
              </Pressable>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80' }}
              style={styles.heroImage}
            />
          </Animated.View>

          {/* Stats Section */}
          <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </Animated.View>

          {/* Aulas em Destaque */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Aulas em Destaque</Text>
                <Text style={styles.sectionSubtitle}>Reserve sua vaga nas melhores turmas</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {(user?.role === 'admin' || user?.role === 'professor') && (
                  <Pressable style={[styles.seeAllButton, { marginRight: 8 }]} onPress={() => router.push('/(tabs)/create')}>
                    <Text style={[styles.seeAllText, { color: Palette.bright }]}>＋ Criar Aula</Text>
                  </Pressable>
                )}
                <Pressable style={styles.seeAllButton} onPress={() => router.push('/(tabs)/aulas')}>
                  <Text style={styles.seeAllText}>Ver todas →</Text>
                </Pressable>
              </View>
            </View>

            <FlatList
              data={aulas}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingVertical: 10 }}
              decelerationRate="fast"
              snapToAlignment="start"
              snapToInterval={CARD_WIDTH + 16}
              renderItem={({ item, index }) => {
                const enrolled = !!user && (item.inscritos || []).includes(user.email);
                const canEnroll = (user?.role ?? 'usuario') === 'usuario';
                const cat = ((item.categoria || 'yoga') as 'yoga'|'crossfit'|'pilates'|'hiit');
                const isLast = index === aulas.length - 1;
                const rightGap = isLast ? 0 : 16;
                return (
                <View
                  style={[
                    styles.classCard,
                    { width: CARD_WIDTH, marginRight: rightGap },
                    enrolled && styles.classCardEnrolled,
                  ]}
                >
                  <Pressable onPress={() => router.push({ pathname: '/(tabs)/show', params: { id: item.id } })}>
                    <View style={[styles.classCardHeader, { backgroundColor: enrolled ? '#059669' : categoryColors[cat] }]}> 
                      <Text style={styles.classIcon}>{enrolled ? '✅' : categoryIcons[cat]}</Text>
                      <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>{item.nivel || 'Todos os níveis'}</Text>
                      </View>
                    </View>
                  </Pressable>
                  <View style={styles.classCardBody}>
                    <Pressable onPress={() => router.push({ pathname: '/(tabs)/show', params: { id: item.id } })}>
                      <Text style={styles.className}>{item.nome}</Text>
                      <Text style={styles.classProfessor}>👨‍🏫 {item.professor}</Text>
                      <View style={styles.classInfo}>
                        <View style={styles.infoItem}>
                          <Text style={styles.infoIcon}>⏰</Text>
                          <Text style={styles.infoText}>{item.horario}</Text>
                        </View>
                        <View style={styles.infoItem}>
                          <Text style={styles.infoIcon}>👥</Text>
                          <Text style={styles.infoText}>{typeof item.vagas === 'number' ? item.vagas : 0} vagas</Text>
                        </View>
                      </View>
                    </Pressable>

                    {canEnroll ? (
                      <Pressable
                        style={[styles.reserveButton, enrolled && { backgroundColor: '#ef4444' }]}
                        onPress={async (e) => {
                          // Evita abrir a tela de detalhes ao clicar no botão
                          // @ts-ignore
                          e?.stopPropagation?.();
                          if (!user) {
                            Alert.alert('Faça login', 'Você precisa estar logado para se inscrever.', [
                              { text: 'Ir para Login', onPress: () => router.push('/(auth)/login') },
                              { text: 'Cancelar', style: 'cancel' },
                            ]);
                            return;
                          }
                          try {
                            const updated = enrolled
                              ? await unenrollAula(item.id, user.email)
                              : await enrollAula(item.id, user.email);
                            setAulas(prev => prev.map(a => (a.id === updated.id ? updated : a)));
                          } catch (e: any) {
                            Alert.alert('Não foi possível processar', e.message || 'Erro desconhecido');
                          }
                        }}
                      >
                        <Text style={styles.reserveButtonText}>{enrolled ? 'Desinscrever' : 'Reservar Agora'}</Text>
                      </Pressable>
                    ) : (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable
                          style={[styles.reserveButton, { backgroundColor: Palette.mint, flex: 1, marginRight: 8 }]}
                          onPress={(e) => {
                            // @ts-ignore
                            e?.stopPropagation?.();
                            router.push({ pathname: '/(tabs)/edit', params: { id: item.id } });
                          }}
                        >
                          <Text style={styles.reserveButtonText}>Editar</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.reserveButton, { backgroundColor: '#ef4444', flex: 1 }]}
                          onPress={(e) => {
                            // @ts-ignore
                            e?.stopPropagation?.();
                            Alert.alert('Remover aula', 'Tem certeza que deseja remover esta aula?', [
                              { text: 'Cancelar', style: 'cancel' },
                              { text: 'Remover', style: 'destructive', onPress: async () => {
                                await deleteAula(item.id);
                                setAulas(prev => prev.filter(a => a.id !== item.id));
                              }},
                            ]);
                          }}
                        >
                          <Text style={styles.reserveButtonText}>Remover</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
                );
              }}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Modalidades Disponíveis</Text>
                <Text style={styles.sectionSubtitle}>Encontre o treino perfeito para você</Text>
              </View>
            </View>

            <FlatList
              data={sportsInfo}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
              renderItem={({ item }) => (
                <Pressable
                  style={({ hovered, pressed }) => [
                    styles.sportCard,
                    hovered && styles.cardHover,
                    pressed && { transform: [{ scale: 0.98 }] },
                  ]}
                  onPress={() => router.push({ pathname: '/(tabs)/aulas', params: { categoria: item.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') } })}
                >
                  <Image source={{ uri: item.image }} style={styles.sportImage} />
                  <View style={styles.sportOverlay}>
                    <View style={[styles.sportBadge, { backgroundColor: item.color }]}>
                      <Text style={styles.sportBadgeText}>{item.name}</Text>
                    </View>
                  </View>
                  <View style={styles.sportContent}>
                    <Text style={styles.sportDescription}>{item.description}</Text>
                    <View style={styles.benefitsContainer}>
                      <Text style={styles.benefitsTitle}>Benefícios:</Text>
                      {item.benefits.map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                          <Text style={styles.benefitDot}>•</Text>
                          <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                      ))}
                    </View>
                    <Pressable style={[styles.exploreSportButton, { backgroundColor: item.color }]} onPress={() => router.push({ pathname: '/(tabs)/aulas', params: { categoria: item.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') } })}> 
                      <Text style={styles.exploreSportText}>Explorar Modalidade</Text>
                    </Pressable>
                  </View>
                </Pressable>
              )}
            />
          </View>

          {/* Depoimentos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>O Que Dizem Nossos Alunos</Text>
                <Text style={styles.sectionSubtitle}>Histórias reais de transformação</Text>
              </View>
            </View>

            <FlatList
              data={testimonials}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
              renderItem={({ item }) => (
                <View style={styles.testimonialCard}>
                  <View style={styles.testimonialHeader}>
                    <Image source={{ uri: item.image }} style={styles.testimonialImage} />
                    <View style={styles.testimonialInfo}>
                      <Text style={styles.testimonialName}>{item.name}</Text>
                      <Text style={styles.testimonialAge}>{item.age} anos</Text>
                      <View style={styles.ratingContainer}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Text key={i} style={styles.star}>⭐</Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={styles.achievementBadge}>
                    <Text style={styles.achievementText}>🏆 {item.achievement}</Text>
                  </View>
                  <Text style={styles.testimonialText}>"{item.text}"</Text>
                </View>
              )}
            />
          </View>

          {/* Feedbacks Recentes (usuários) */}
          {!!userFeedbacks.length && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Feedbacks Recentes</Text>
              </View>
              <FlatList
                data={userFeedbacks}
                keyExtractor={(f) => f.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
                renderItem={({ item }) => (
                  <View style={styles.testimonialCard}>
                    <View style={styles.testimonialHeader}>
                      <View style={[styles.testimonialImage, { backgroundColor: '#2dd4bf', alignItems: 'center', justifyContent: 'center' }]}>
                        <Text style={{ color: '#0f172a', fontWeight: 'bold' }}>{item.userEmail[0]?.toUpperCase()}</Text>
                      </View>
                      <View style={styles.testimonialInfo}>
                        <Text style={styles.testimonialName}>{item.userEmail}</Text>
                        <Text style={styles.testimonialAge}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                        <View style={styles.ratingContainer}>
                          {[...Array(item.rating)].map((_, i) => (
                            <Text key={i} style={styles.star}>⭐</Text>
                          ))}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.testimonialText}>"{item.text}"</Text>
                  </View>
                )}
              />
            </View>
          )}

          {/* Feedbacks dos Usuários (envio) */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Deixe seu Feedback</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={styles.ratingRow}>
                {[1,2,3,4,5].map((n) => (
                  <Pressable key={n} onPress={() => setFeedbackRating(n)}>
                    <Text style={[styles.starRate, n <= feedbackRating ? styles.starActive : styles.starInactive]}>★</Text>
                  </Pressable>
                ))}
              </View>
              <TextInput
                placeholder="Conte como foi sua experiência..."
                placeholderTextColor="#888"
                value={feedbackText}
                onChangeText={setFeedbackText}
                style={styles.feedbackInput}
                multiline
              />
              <Pressable
                disabled={sendingFeedback || !user || !feedbackText.trim()}
                onPress={async () => {
                  if (!user) {
                    Alert.alert('Faça login', 'Entre para enviar um feedback.');
                    return;
                  }
                  setSendingFeedback(true);
                  try {
                    const saved = await addFeedback({ userEmail: user.email, text: feedbackText.trim(), rating: feedbackRating });
                    setUserFeedbacks(prev => [saved, ...prev]);
                    setFeedbackText('');
                    setFeedbackRating(5);
                  } finally {
                    setSendingFeedback(false);
                  }
                }}
                style={({ pressed }) => [styles.finalCTAButton, { opacity: pressed ? 0.85 : 1 }]}
              >
                <Text style={styles.finalCTAButtonText}>{sendingFeedback ? 'Enviando...' : 'Enviar Feedback'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Call to Action Final */}
          <View style={styles.finalCTA}>
            <Text style={styles.finalCTATitle}>Pronto para começar?</Text>
            <Text style={styles.finalCTASubtitle}>
              Agende uma aula experimental gratuita e conheça nossa estrutura
            </Text>
            <Pressable style={styles.finalCTAButton} onPress={() => router.push('/(tabs)/aulas')}>
              <Text style={styles.finalCTAButtonText}>Agendar Aula Grátis 🎁</Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Navegação inferior removida - a navegação ficará no topo pelo layout */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.deep,
  },
  loadingText: {
    color: '#2dd4bf',
    marginTop: 16,
    fontSize: 14,
  },
  topNav: {
    backgroundColor: Palette.deep,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(45, 212, 191, 0.3)',
    paddingTop: 50,
    paddingBottom: 12,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
  backgroundColor: '#2dd4bf',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoEmoji: {
    fontSize: 20,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  color: '#f5f7fb',
  },
  loginButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#f5f7fb',
    fontWeight: 'bold',
    fontSize: 14,
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroSection: {
    height: 400,
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
    pointerEvents: 'none',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
    pointerEvents: 'box-none',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  color: '#f5f7fb',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 16,
  color: '#e7e9ef',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#f5f7fb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 24,
  backgroundColor: '#2a1557',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  statCard: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  color: '#2dd4bf',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  color: '#c7c9d3',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  color: '#f5f7fb',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  color: '#c7c9d3',
  },
  seeAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  seeAllText: {
    color: '#2dd4bf',
    fontWeight: 'bold',
    fontSize: 14,
  },
  classCard: {
    width: 280,
    backgroundColor: '#2a1557',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(245, 247, 251, 0.12)',
  },
  classCardEnrolled: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34,197,94,0.08)',
  },
  cardHover: {
    transform: [{ translateY: -4 }],
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  classCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  classIcon: {
    fontSize: 32,
  },
  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    color: '#f5f7fb',
    fontSize: 11,
    fontWeight: 'bold',
  },
  classCardBody: {
    padding: 16,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
  color: '#f5f7fb',
    marginBottom: 6,
  },
  classProfessor: {
    fontSize: 14,
    color: '#d6d7df',
    marginBottom: 12,
  },
  classInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#c7c9d3',
  },
  reserveButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#f5f7fb',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sportCard: {
    width: 320,
    backgroundColor: '#2a1557',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(245, 247, 251, 0.12)',
  },
  sportImage: {
    width: '100%',
    height: 180,
  },
  sportOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  sportBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  sportBadgeText: {
    color: '#f5f7fb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sportContent: {
    padding: 16,
  },
  sportDescription: {
    fontSize: 14,
    color: '#d6d7df',
    marginBottom: 16,
    lineHeight: 20,
  },
  benefitsContainer: {
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f5f7fb',
    marginBottom: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  benefitDot: {
    color: '#2dd4bf',
    fontSize: 16,
    marginRight: 8,
  },
  benefitText: {
    fontSize: 13,
    color: '#c7c9d3',
  },
  exploreSportButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  exploreSportText: {
    color: '#f5f7fb',
    fontWeight: 'bold',
    fontSize: 14,
  },
  testimonialCard: {
    width: 300,
    backgroundColor: '#2a1557',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 247, 251, 0.12)',
  },
  testimonialHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  testimonialImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#2dd4bf',
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f7fb',
    marginBottom: 2,
  },
  testimonialAge: {
    fontSize: 12,
    color: '#c7c9d3',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  achievementBadge: {
    backgroundColor: 'rgba(45, 212, 191, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  achievementText: {
    color: '#2dd4bf',
    fontSize: 12,
    fontWeight: 'bold',
  },
  testimonialText: {
    fontSize: 14,
    color: '#d6d7df',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  finalCTA: {
    backgroundColor: '#2a1557',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 247, 251, 0.12)',
  },
  finalCTATitle: {
    fontSize: 28,
    fontWeight: 'bold',
  color: '#f5f7fb',
    marginBottom: 12,
    textAlign: 'center',
  },
  finalCTASubtitle: {
    fontSize: 14,
    color: '#c7c9d3',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  finalCTAButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  finalCTAButtonText: {
    color: '#f5f7fb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starRate: {
    fontSize: 24,
    marginRight: 8,
  },
  starActive: { color: '#f59e0b' },
  starInactive: { color: '#444' },
  feedbackInput: {
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.3)',
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
  color: '#f5f7fb',
    marginBottom: 12,
    backgroundColor: 'rgba(45, 212, 191, 0.08)'
  },
  // estilos da navegação inferior removidos
});