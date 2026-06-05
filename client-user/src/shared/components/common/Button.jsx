// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\shared\components\common\Button.jsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../../constants/theme.js';

export default function Button({ label, variant = 'primary', onPress, loading = false, disabled = false }) {
  const buttonStyles = [styles.button, variant === 'secondary' ? styles.secondary : styles.primary, disabled && styles.disabled];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={COLORS.surface} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: {
    backgroundColor: COLORS.primary
  },
  secondary: {
    backgroundColor: COLORS.secondary
  },
  disabled: {
    opacity: 0.65
  },
  label: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.medium,
    fontWeight: '600'
  }
});
