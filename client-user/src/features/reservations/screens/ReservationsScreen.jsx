// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\reservations\screens\ReservationsScreen.jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useReservations } from '../hooks/useReservations.js';
import { Card, EmptyState, LoadingSpinner } from '../../../shared/components/common/Common.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

export default function ReservationsScreen() {
  const { reservationHistory, loading, error, cancelReservation, fetchReservations } = useReservations();

  const handleCancel = async (reservationId) => {
    try {
      await cancelReservation(reservationId);
      Alert.alert('Reserva cancelada', 'La reserva se canceló correctamente.');
    } catch {
      Alert.alert('Error', 'No se pudo cancelar la reserva.');
    }
  };

  const renderItem = ({ item }) => (
    <Card>
      <Text style={styles.title}>{item.field.name}</Text>
      <Text style={styles.subtitle}>{item.date} · {item.time}</Text>
      <Text style={styles.status}>Estado: {item.normalizedStatus}</Text>
      {item.normalizedStatus !== 'CANCELLED' && (
        <Button label="Cancelar reserva" onPress={() => handleCancel(item.id)} />
      )}
    </Card>
  );

  if (loading && reservationHistory.length === 0) {
    return <LoadingSpinner text="Cargando reservas..." />;
  }

  if (error && reservationHistory.length === 0) {
    return <EmptyState title="Error" description={error} />;
  }

  return (
    <FlatList
      data={reservationHistory}
      keyExtractor={(item) => item.id?.toString() || item.field.id}
      renderItem={renderItem}
      contentContainerStyle={reservationHistory.length === 0 ? styles.emptyList : styles.list}
      ListEmptyComponent={<EmptyState title="Sin reservas" description="No tienes reservas en tu historial." />}
      onRefresh={fetchReservations}
      refreshing={loading}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: SPACING.medium,
    backgroundColor: COLORS.background
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.background
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    marginBottom: SPACING.small
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.small
  },
  status: {
    color: COLORS.text,
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.small
  }
});
