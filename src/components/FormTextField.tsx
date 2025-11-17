import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

export default function FormTextField(props: TextInputProps) {
  return <TextInput style={[styles.input, props.style]} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 6
  }
});
