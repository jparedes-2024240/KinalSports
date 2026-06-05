// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\shared\components\common\Common.jsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, SHADOWS } from '../../constants/theme.js';

export function LoadingSpinner({ text = 'Cargando...' }) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export function EmptyState({ icon = 'sports-basketball', title = 'Nada por aquí', description = 'No hay datos disponibles en este momento.' }) {
  return (
    <View style={styles.emptyContainer}>
      <MaterialIcons name={icon} size={48} color={COLORS.secondary} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
}

export function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: SPACING.small,
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.large,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    ...SHADOWS.light
  },
  emptyTitle: {
    marginTop: SPACING.small,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    color: COLORS.text
  },
  emptyDescription: {
    marginTop: SPACING.tiny,
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.light
  }
});
