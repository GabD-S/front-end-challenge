import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

export default function IndexScreen() {
  // Estrutura inicial: header e FlatList vazia
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Aulas Disponíveis</Text>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => String(index)}
        renderItem={() => null}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma aula encontrada.</Text>}
        contentContainerStyle={{ flexGrow: 1 }}
      />
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
  empty: {
    color: '#bbb',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});
