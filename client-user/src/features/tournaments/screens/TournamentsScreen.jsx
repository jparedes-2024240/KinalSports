// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\tournaments\screens\TournamentsScreen.jsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTournaments } from '../hooks/useTournaments.js';
import { Card, EmptyState, LoadingSpinner } from '../../../shared/components/common/Common.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

export default function TournamentsScreen({ navigation }) {
  const { tournaments, loading, error, fetchTournaments } = useTournaments();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TournamentDetail', { tournament: item })}>
      <Card>
        <Text style={styles.title}>{item.name || 'Torneo'}</Text>
        <Text style={styles.subtitle}>{item.location || 'Ubicación no disponible'}</Text>
        <Text style={styles.info}>Fecha: {item.date || 'Sin fecha'}</Text>
      </Card>
    </TouchableOpacity>
  );

  if (loading && tournaments.length === 0) {
    return <LoadingSpinner text="Cargando torneos..." />;
  }

  if (error && tournaments.length === 0) {
    return <EmptyState title="Error" description={error} />;
  }

  return (
    <FlatList
      data={tournaments}
      keyExtractor={(item) => item._id?.toString() || item.id}
      renderItem={renderItem}
      contentContainerStyle={tournaments.length === 0 ? styles.emptyList : styles.list}
      ListEmptyComponent={<EmptyState title="Sin torneos" description="No hay torneos disponibles por ahora." />}
      onRefresh={fetchTournaments}
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
  info: {
    color: COLORS.text,
    fontSize: FONT_SIZE.medium
  }
});
