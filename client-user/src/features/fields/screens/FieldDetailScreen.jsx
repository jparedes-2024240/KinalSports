// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\fields\screens\FieldDetailScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../../shared/components/common/Button.jsx';
import { Card } from '../../../shared/components/common/Common.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

export default function FieldDetailScreen({ route, navigation }) {
  const { field } = route.params;

  return (
    <View style={styles.container}>
      <Card>
        {field.image ? <Image source={{ uri: field.image }} style={styles.image} /> : null}
        <Text style={styles.name}>{field.name}</Text>
        <Text style={styles.location}>{field.location}</Text>
        <Text style={[styles.status, { color: field.isAvailable ? COLORS.success : COLORS.warning }]}>Disponibilidad: {field.isAvailable ? 'Disponible' : 'No disponible'}</Text>
        <Button label="Reservar cancha" onPress={() => navigation.navigate('CreateReservation', { field })} disabled={!field.isAvailable} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.medium,
    backgroundColor: COLORS.background
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: SPACING.medium
  },
  name: {
    color: COLORS.text,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: '700',
    marginBottom: SPACING.small
  },
  location: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.medium
  },
  status: {
    fontSize: FONT_SIZE.medium,
    fontWeight: '600',
    marginBottom: SPACING.large
  }
});
