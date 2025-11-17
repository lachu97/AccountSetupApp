import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, disabled }: { title: string; onPress?: () => void; disabled?: boolean }) {
  return (
    <TouchableOpacity style={[styles.btn, disabled && styles.disabled]} onPress={onPress} disabled={disabled} accessibilityRole="button">
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#0066cc', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  label: { color: '#fff', fontWeight: '600' },
  disabled: { opacity: 0.5 }
});
