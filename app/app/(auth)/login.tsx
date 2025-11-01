import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

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
      router.replace('/(tabs)');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: -1, // Ensure decorative elements are behind interactive elements
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: -80,
    left: -80,
  },
  circle3: {
    width: 200,
    height: 200,
    top: height / 2 - 100,
    left: -50,
  },
  circleGradient: {
    flex: 1,
    borderRadius: 1000,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
  },
  blurContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
  },
  titleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 12,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  decorativeLine: {
    height: 2,
    marginVertical: 24,
  },
  lineGradient: {
    flex: 1,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 20,
  },
  errorContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  errorGradient: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 12,
  },
  error: {
    color: '#fca5a5',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  loaderContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: '#a855f7',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  signupButton: {
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  signupText: {
    color: '#e9d5ff',
    fontSize: 15,
  },
  signupTextBold: {
    fontWeight: 'bold',
    color: '#a855f7',
  },
  particles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1, // Ensure particles are behind interactive elements
    pointerEvents: 'none', // Prevent particles from blocking clicks
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#a855f7',
    borderRadius: 100,
  },
});