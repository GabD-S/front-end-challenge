import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Animated, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import styles from '@/src/styles/tabs/explore.styles';

export default function ExploreScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    { icon: '🏋️', title: 'Aulas Variadas', description: 'Mais de 20 tipos de aulas diferentes para todos os níveis' },
    { icon: '👨‍🏫', title: 'Profissionais', description: 'Instrutores certificados e experientes' },
    { icon: '📅', title: 'Horários Flexíveis', description: 'Aulas de manhã, tarde e noite' },
    { icon: '⭐', title: 'Resultados Garantidos', description: 'Avaliação contínua e acompanhamento' },
  ];

  const stats = [
    { number: '500+', label: 'Alunos Ativos' },
    { number: '20+', label: 'Tipos de Aulas' },
    { number: '95%', label: 'Taxa de Satisfação' },
  ];

  return (
    <LinearGradient
      colors={['#0f0c29', '#1a1637', '#2d1b4e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.headerIcon}>🎯</Text>
            <Text style={styles.headerTitle}>Conheça a Fit Dreams</Text>
            <Text style={styles.headerSubtitle}>Academia de treinamento profissional</Text>
          </Animated.View>

          {/* Estatísticas */}
          <Animated.View
            style={[
              styles.statsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {stats.map((stat, idx) => (
              <BlurView intensity={40} key={idx} style={styles.statCard}>
                <LinearGradient
                  colors={['rgba(168, 85, 247, 0.25)', 'rgba(124, 58, 237, 0.15)']}
                  style={styles.statGradient}
                >
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </BlurView>
            ))}
          </Animated.View>

          {/* Características */}
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>✨ Por Que Escolher?</Text>
            </View>

            <View style={styles.featuresGrid}>
              {features.map((feature, idx) => (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [
                    styles.featureCard,
                    { transform: [{ scale: pressed ? 0.95 : 1 }] },
                  ]}
                >
                  <BlurView intensity={40} style={styles.featureBlur}>
                    <LinearGradient
                      colors={['rgba(168, 85, 247, 0.25)', 'rgba(124, 58, 237, 0.15)']}
                      style={styles.featureGradient}
                    >
                      <Text style={styles.featureIcon}>{feature.icon}</Text>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDescription}>{feature.description}</Text>
                    </LinearGradient>
                  </BlurView>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* Missão */}
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <BlurView intensity={50} style={styles.missionCard}>
              <LinearGradient
                colors={['rgba(168, 85, 247, 0.2)', 'rgba(124, 58, 237, 0.1)']}
                style={styles.missionGradient}
              >
                <Text style={styles.missionIcon}>🚀</Text>
                <Text style={styles.missionTitle}>Nossa Missão</Text>
                <Text style={styles.missionText}>
                  Transformar vidas através de programas de treinamento personalizados, oferecendo um ambiente acolhedor,
                  profissional e motivador para todos os níveis de aptidão.
                </Text>
                <View style={styles.divider} />
                <Text style={styles.valuesTitle}>Nossos Valores</Text>
                <View style={styles.valuesList}>
                  <Text style={styles.valueItem}>💪 Dedicação ao bem-estar</Text>
                  <Text style={styles.valueItem}>🎯 Excelência em serviço</Text>
                  <Text style={styles.valueItem}>🤝 Comunidade unida</Text>
                  <Text style={styles.valueItem}>📈 Crescimento contínuo</Text>
                </View>
              </LinearGradient>
            </BlurView>
          </Animated.View>

          {/* CTA */}
          <Animated.View
            style={[
              styles.ctaContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <BlurView intensity={50} style={styles.ctaCard}>
              <LinearGradient
                colors={['#a855f7', '#7c3aed']}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaTitle}>Pronto para começar?</Text>
                <Text style={styles.ctaSubtitle}>
                  Junte-se a centenas de alunos satisfeitos e transforme sua vida
                </Text>
              </LinearGradient>
            </BlurView>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// styles moved to ./explore.styles
