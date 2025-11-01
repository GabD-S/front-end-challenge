import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { color: '#c4b5fd', fontSize: 14 },
});
