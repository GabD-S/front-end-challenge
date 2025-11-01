import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';

function TopNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const items = [
    { id: 'index', title: 'Home', icon: 'house.fill', href: '/(tabs)' },
    { id: 'aulas', title: 'Aulas', icon: 'calendar', href: '/(tabs)/aulas' },
    { id: 'explore', title: 'Explore', icon: 'paperplane.fill', href: '/(tabs)/explore' },
    { id: 'professor', title: 'Professor', icon: 'person.fill', href: '/(tabs)/professor' },
    { id: 'admin', title: 'Admin', icon: 'gear', href: '/(tabs)/admin' },
  ];

  return (
    <View style={styles.headerBar}>
      <Text style={styles.logo}>💪 FitPro Elite</Text>
      <View style={styles.tabsRow}>
        {items.map((it) => {
          const active = pathname === it.href || pathname === '/(tabs)' && it.id === 'index';
          // Opcional: manter Professor/Admin sempre visíveis; se quiser ocultar por papel use user?.role
          return (
            <Pressable key={it.id} onPress={() => router.push(it.href as any)} style={styles.tabBtn}>
              <IconSymbol size={18} name={it.icon as any} color={active ? Colors[colorScheme ?? 'light'].tint : '#aaa'} />
              <Text style={[styles.tabText, active && { color: Colors[colorScheme ?? 'light'].tint }]}>{it.title}</Text>
            </Pressable>
          );
        })}
      </View>
      {(user?.role === 'admin' || user?.role === 'professor') ? (
        <Pressable onPress={() => router.push('/(tabs)/create' as any)} style={styles.createBtn}>
          <Text style={styles.createBtnText}>＋ Criar Aula</Text>
        </Pressable>
      ) : (
        <View style={{ width: 120 }} />
      )}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        header: () => <TopNav />,
        // Esconde a barra inferior; navegaremos pelo header superior
        tabBarStyle: { display: 'none' },
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="aulas"
        options={{
          title: 'Aulas',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="professor"
        options={{
          title: 'Professor',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: '#1f0a3f',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(45, 212, 191, 0.3)',
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#f5f7fb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabText: {
    color: '#c7c9d3',
    fontWeight: '600',
    fontSize: 13,
  },
  createBtn: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  createBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
