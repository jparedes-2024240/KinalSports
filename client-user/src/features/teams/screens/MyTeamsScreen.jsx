// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\teams\screens\MyTeamsScreen.jsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useTeams } from '../hooks/useTeams.js';
import { Card, EmptyState, LoadingSpinner } from '../../../shared/components/common/Common.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

export default function MyTeamsScreen() {
  const { myTeams, loading, error, fetchTeams } = useTeams();

  const renderItem = ({ item }) => (
    <Card>
      {item.photo ? <Image source={{ uri: item.photo }} style={styles.image} /> : null}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.description || 'Equipo sin descripción'}</Text>
    </Card>
  );

  if (loading && myTeams.length === 0) {
    return <LoadingSpinner text="Cargando mis equipos..." />;
  }

  if (error && myTeams.length === 0) {
    return <EmptyState title="Error" description={error} />;
  }

  return (
    <FlatList
      data={myTeams}
      keyExtractor={(item) => item._id?.toString() || item.id}
      renderItem={renderItem}
      contentContainerStyle={myTeams.length === 0 ? styles.emptyList : styles.list}
      ListEmptyComponent={<EmptyState title="No tienes equipos" description="Crea o únete a un equipo para ver aquí." />}
      onRefresh={fetchTeams}
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
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: SPACING.small
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    marginBottom: SPACING.small
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium
  }
});
