import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './admin.styles';

export default function AdminScreen() {
  return (
    <LinearGradient colors={["#0f0c29", "#1a1637", "#2d1b4e"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.center}>
          <Text style={styles.title}>Painel do Administrador</Text>
          <Text style={styles.subtitle}>Gerencie usuários, aulas e configurações</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// styles moved to ./admin.styles
