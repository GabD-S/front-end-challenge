import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a855f7',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 32,
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    borderRadius: 14,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a855f7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#e9d5ff',
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  featuresGrid: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  featureBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  featureGradient: {
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    borderRadius: 16,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 13,
    color: '#c4b5fd',
    textAlign: 'center',
    lineHeight: 18,
  },
  missionCard: {
    marginHorizontal: 16,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 24,
  },
  missionGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    borderRadius: 18,
  },
  missionIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 12,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  missionText: {
    fontSize: 14,
    color: '#e9d5ff',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    marginBottom: 16,
  },
  valuesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  valuesList: {
    gap: 8,
  },
  valueItem: {
    fontSize: 13,
    color: '#c4b5fd',
    paddingVertical: 4,
  },
  ctaContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  ctaCard: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: 24,
    alignItems: 'center',
    borderRadius: 18,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#e9d5ff',
    textAlign: 'center',
  },
});
