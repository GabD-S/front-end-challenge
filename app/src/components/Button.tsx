import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  labelColor?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({
  label,
  onPress,
  backgroundColor = '#7c3aed',
  labelColor = '#fff',
  style,
  labelStyle,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.label, { color: labelColor }, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
