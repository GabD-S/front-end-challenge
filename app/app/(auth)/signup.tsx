import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import styles from './signup.styles';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const { signUp, signing } = useAuth();
  const [error, setError] = React.useState('');
  const [role, setRole] = React.useState<'usuario' | 'professor' | 'admin'>('usuario');

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

  const handleSignUp = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      await signUp({ email, password, role });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') },
      ]);
    } catch (e: any) {
      const apiMsg = e?.response?.data?.message || e?.message;
      setError(apiMsg || 'Falha ao cadastrar.');
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
                <Text style={styles.title}>🚀 Cadastro</Text>
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

              {/* Seletor de Tipo de Conta */}
              <View style={styles.roleBox}>
                <Text style={styles.roleLabel}>Tipo de conta:</Text>
                <View style={styles.roleButtonsContainer}>
                  {['usuario', 'professor', 'admin'].map(opt => (
                    <TouchableOpacity
                      key={opt}
                      style={styles.roleButtonWrapper}
                      onPress={() => setRole(opt as any)}
                      activeOpacity={0.8}
                    >
                      {role === opt ? (
                        <LinearGradient
                          colors={['#a855f7', '#7c3aed']}
                          style={styles.roleBtn}
                        >
                          <Text style={styles.roleBtnTextActive}>
                            {opt === 'usuario' ? '👤 Usuário' : opt === 'professor' ? '👨‍🏫 Professor' : '⚡ Admin'}
                          </Text>
                        </LinearGradient>
                      ) : (
                        <View style={styles.roleBtnInactive}>
                          <Text style={styles.roleBtnText}>
                            {opt === 'usuario' ? '👤 Usuário' : opt === 'professor' ? '👨‍🏫 Professor' : '⚡ Admin'}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Input
                label="Confirmar senha"
                placeholder="Repita sua senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                <Text style={styles.loadingText}>Cadastrando...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSignUp}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={['#a855f7', '#7c3aed', '#6d28d9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push('/(auth)/login')}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginText}>
                    Já tem conta? <Text style={styles.loginTextBold}>Entrar</Text>
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