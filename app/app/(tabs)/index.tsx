
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getAulas, Aula } from '@/src/services/api';

export default function IndexScreen() {
  const [loading, setLoading] = useState(true);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAulas();
        setAulas(data);
      } catch (e) {
        setAulas([]);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Aulas Disponíveis</Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={aulas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: '/(tabs)/show', params: { id: item.id } })}
            >
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.professor}>Professor: {item.professor}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma aula encontrada.</Text>}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  professor: {
    color: '#bbb',
    fontSize: 15,
  },
  empty: {
    color: '#bbb',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});
