import { Redirect } from 'expo-router';

// Default entry: send users to the auth flow during Phase 1
export default function Index() {
  return <Redirect href="/login" />;
}
