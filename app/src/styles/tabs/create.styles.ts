import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  contentCard: { marginHorizontal: 16, borderRadius: 20, overflow: 'hidden' },
  cardInner: { padding: 24, borderWidth: 1, borderColor: 'rgba(45, 212, 191, 0.3)', backgroundColor: 'rgba(45, 212, 191, 0.05)' },
  header: { marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#f5f7fb', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#2dd4bf', fontWeight: '500' },
  form: { marginBottom: 20 },
  errorBox: { backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', marginBottom: 16 },
  errorText: { color: '#fca5a5', fontSize: 14, fontWeight: '600' },
  loadingContainer: { alignItems: 'center', paddingVertical: 20 },
  loadingText: { color: '#2dd4bf', marginTop: 12, fontSize: 16, fontWeight: '600' },
});
