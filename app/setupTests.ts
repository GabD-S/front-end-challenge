import '@testing-library/jest-native/extend-expect';

// Silence warning about Animated: useNativeDriver
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
