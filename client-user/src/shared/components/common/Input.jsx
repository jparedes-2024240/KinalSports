// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\shared\components\common\Input.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../../constants/theme.js';

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry = false, error, keyboardType = 'default', editable = true }) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        style={[styles.input, error ? styles.errorBorder : null, !editable && styles.disabledInput]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.medium
  },
  label: {
    color: COLORS.textLight,
    marginBottom: SPACING.tiny,
    fontSize: FONT_SIZE.small
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    borderRadius: 10,
    padding: SPACING.medium,
    fontSize: FONT_SIZE.medium
  },
  errorBorder: {
    borderColor: COLORS.error
  },
  disabledInput: {
    backgroundColor: '#edf2f7'
  },
  errorText: {
    marginTop: SPACING.tiny,
    color: COLORS.error,
    fontSize: FONT_SIZE.small
  }
});
