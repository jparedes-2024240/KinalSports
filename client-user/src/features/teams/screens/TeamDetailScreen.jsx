// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\teams\screens\TeamDetailScreen.jsx
import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useTeams } from '../hooks/useTeams.js';
import { Card } from '../../../shared/components/common/Common.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

export default function TeamDetailScreen({ route }) {
  const { team } = route.params;
  const { myTeams, joinTeam, leaveTeam, loading, error } = useTeams();

  const isMember = useMemo(
    () => myTeams.some((item) => item._id === team._id || item.id === team.id),
    [myTeams, team]
  );

  const handleAction = async () => {
    try {
      if (isMember) {
        await leaveTeam(team._id || team.id);
        Alert.alert('Equipo', 'Has salido del equipo.');
      } else {
        await joinTeam(team._id || team.id);
        Alert.alert('Equipo', 'Te uniste al equipo.');
      }
    } catch {
      Alert.alert('Error', error || 'No se pudo actualizar el equipo.');
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        {team.photo ? <Image source={{ uri: team.photo }} style={styles.image} /> : null}
        <Text style={styles.title}>{team.name}</Text>
        <Text style={styles.subtitle}>{team.description || 'Descripción no disponible'}</Text>
        <Text style={styles.info}>Contacto: {team.phone || 'No disponible'}</Text>
        <Button label={isMember ? 'Salir del equipo' : 'Unirse al equipo'} onPress={handleAction} loading={loading} />
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
    marginBottom: SPACING.medium
  },
  info: {
    color: COLORS.text,
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.large
  }
});
