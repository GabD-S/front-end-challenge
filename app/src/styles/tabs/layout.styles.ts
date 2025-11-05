import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
