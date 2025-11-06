import { Redirect } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Entry route: avoid redirecting '/' to itself to prevent loops
export default function Index() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If logged in, land on Aulas; otherwise go to Login
  if (token) return <Redirect href="/aulas" />;
  return <Redirect href="/login" />;
  
}
