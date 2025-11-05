import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './professor.styles';

export default function ProfessorScreen() {
  return (
    <LinearGradient colors={["#0f0c29", "#1a1637", "#2d1b4e"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.center}>
          <Text style={styles.title}>Painel do Professor</Text>
          <Text style={styles.subtitle}>Gerencie suas aulas e listas de presença</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// styles moved to ./professor.styles
