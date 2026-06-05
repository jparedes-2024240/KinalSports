// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\tournaments\screens\TournamentDetailScreen.jsx
import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useTournaments } from '../hooks/useTournaments.js';
import { useTeams } from '../../teams/hooks/useTeams.js';
import { Card } from '../../../shared/components/common/Common.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

export default function TournamentDetailScreen({ route }) {
  const { tournament } = route.params;
  const { myTeams, loading, error } = useTeams();
  const { registerTournament } = useTournaments();

  const selectedTeam = useMemo(() => myTeams[0] || null, [myTeams]);

  const handleRegister = async () => {
    if (!selectedTeam) {
      Alert.alert('Equipo necesario', 'Debes tener al menos un equipo para inscribirlo.');
      return;
    }

    try {
      await registerTournament(tournament._id || tournament.id, selectedTeam._id || selectedTeam.id);
      Alert.alert('Inscripción exitosa', 'Tu equipo se inscribió en el torneo.');
    } catch {
      Alert.alert('Error', error || 'No se pudo inscribir el equipo.');
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        {tournament.image ? <Image source={{ uri: tournament.image }} style={styles.image} /> : null}
        <Text style={styles.title}>{tournament.name || 'Torneo'}</Text>
        <Text style={styles.subtitle}>{tournament.location || 'Ubicación no disponible'}</Text>
        <Text style={styles.info}>Fecha: {tournament.date || 'Sin fecha'}</Text>
        <Text style={styles.description}>{tournament.description || 'No hay descripción disponible.'}</Text>
        <Button label={selectedTeam ? `Inscribir ${selectedTeam.name}` : 'Selecciona un equipo'} onPress={handleRegister} loading={loading} />
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
    height: 180,
    borderRadius: 14,
    marginBottom: SPACING.medium
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZE.xlarge,
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
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.medium
  },
  description: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.large
  }
});
