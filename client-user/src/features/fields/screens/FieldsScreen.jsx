// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\fields\screens\FieldsScreen.jsx
import React from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFields } from '../hooks/useFields.js';
import { Card, EmptyState, LoadingSpinner } from '../../../shared/components/common/Common.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

export default function FieldsScreen({ navigation }) {
  const { fields, loading, error, fetchFields } = useFields();

  const renderField = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FieldDetail', { field: item })} style={styles.itemTouch}>
      <Card>
        {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.location}</Text>
        <Text style={[styles.status, { color: item.isAvailable ? COLORS.success : COLORS.warning }] }>
          {item.isAvailable ? 'Disponible' : 'No disponible'}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  if (loading && fields.length === 0) {
    return <LoadingSpinner text="Cargando canchas..." />;
  }

  if (error && fields.length === 0) {
    return <EmptyState title="Error" description={error} />;
  }

  return (
    <FlatList
      data={fields}
      keyExtractor={(item) => item.id?.toString() || item.name}
      renderItem={renderField}
      contentContainerStyle={fields.length === 0 ? styles.emptyList : styles.list}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchFields} tintColor={COLORS.primary} />}
      ListEmptyComponent={<EmptyState title="No hay canchas" description="No se encontraron canchas disponibles." />}
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
  itemTouch: {
    marginBottom: SPACING.medium
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: SPACING.small
  },
  name: {
    color: COLORS.text,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    marginBottom: SPACING.tiny
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.small
  },
  status: {
    fontSize: FONT_SIZE.medium,
    fontWeight: '600'
  }
});
