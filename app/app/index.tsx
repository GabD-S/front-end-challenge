import { Redirect } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Default entry: send users to the auth flow during Phase 1
export default function Index() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (token) {
  return <Redirect href="/" />;
  }

  return <Redirect href="/login" />;
}
