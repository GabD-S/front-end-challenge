import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getAulas, Aula } from '@/src/services/api';

export default function ShowScreen() {
  const { id } = useLocalSearchParams();
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const aulas = await getAulas();
      const found = aulas.find(a => a.id === id);
      setAula(found || null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
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
    <View style={styles.container}>
      {/* Imagem de capa (placeholder) */}
      <View style={styles.imageBox}>
        <Image
          source={require('@/assets/placeholder.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>{aula.nome}</Text>
      <Text style={styles.professor}>Professor: {aula.professor}</Text>
      {/* Espaço para mais detalhes no próximo passo */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  imageBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#333',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  professor: {
    color: '#bbb',
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: '#f44336',
    fontSize: 18,
  },
});
