import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import styles from '@/src/styles/auth/login.styles';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signing } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animações flutuantes contínuas
    const createFloatingAnimation = (animValue: Animated.Value, duration: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: -20,
            duration: duration,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 20,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createFloatingAnimation(floatAnim1, 3000, 0).start();
    createFloatingAnimation(floatAnim2, 4000, 500).start();
    createFloatingAnimation(floatAnim3, 3500, 1000).start();

    // Animação de pulso para o título
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    try {
      await signIn({ email, password });
      setEmail('');
      setPassword('');
  router.replace('/');
    } catch (e: any) {
      const apiMsg = e?.message;
      setError(apiMsg || 'E-mail não encontrado ou inválido.');
    }
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.container}
    >
      {/* Elementos decorativos flutuantes */}
      <Animated.View
        style={[
          styles.floatingCircle,
          styles.circle1,
          { transform: [{ translateY: floatAnim1 }] },
        ]}
      >
        <LinearGradient
          colors={['rgba(124, 58, 237, 0.3)', 'rgba(124, 58, 237, 0.1)']}
          style={styles.circleGradient}
        />
      </Animated.View>
      
      <Animated.View
        style={[
          styles.floatingCircle,
          styles.circle2,
          { transform: [{ translateY: floatAnim2 }] },
        ]}
      >
        <LinearGradient
          colors={['rgba(168, 85, 247, 0.3)', 'rgba(168, 85, 247, 0.1)']}
          style={styles.circleGradient}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingCircle,
          styles.circle3,
          { top: height / 2 - 100 },
          { transform: [{ translateY: floatAnim3 }] },
        ]}
      >
        <LinearGradient
          colors={['rgba(147, 51, 234, 0.3)', 'rgba(147, 51, 234, 0.1)']}
          style={styles.circleGradient}
        />
      </Animated.View>

      {/* Card principal com blur */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <BlurView intensity={30} style={styles.blurContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.cardGradient}
          >
            {/* Título com animação */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <LinearGradient
                colors={['#a855f7', '#7c3aed', '#6d28d9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.titleContainer}
              >
                <Text style={styles.title}>✨ Entrar</Text>
              </LinearGradient>
            </Animated.View>

            {/* Linha decorativa */}
            <View style={styles.decorativeLine}>
              <LinearGradient
                colors={['transparent', '#7c3aed', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.lineGradient}
              />
            </View>

            {/* Inputs */}
            <View style={styles.inputContainer}>
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
            </View>

            {/* Mensagem de erro com estilo */}
            {!!error && (
              <Animated.View style={styles.errorContainer}>
                <LinearGradient
                  colors={['rgba(239, 68, 68, 0.2)', 'rgba(220, 38, 38, 0.1)']}
                  style={styles.errorGradient}
                >
                  <Text style={styles.error}>⚠️ {error}</Text>
                </LinearGradient>
              </Animated.View>
            )}

            {/* Botões */}
            {signing ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#a855f7" />
                <Text style={styles.loadingText}>Entrando...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleLogin}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={['#a855f7', '#7c3aed', '#6d28d9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>Entrar</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push('/(auth)/signup')}
                  style={styles.signupButton}
                >
                  <Text style={styles.signupText}>
                    Não tem conta? <Text style={styles.signupTextBold}>Cadastre-se</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </LinearGradient>
        </BlurView>
      </Animated.View>

      {/* Partículas decorativas */}
      <View style={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                opacity: Math.random() * 0.5 + 0.2,
              },
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

/* styles moved to ./login.styles */