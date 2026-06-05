// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\profile\screens\ProfileScreen.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { userClient } from '../../../shared/api/userClient.js';
import { useAuthStore } from '../../../shared/store/authStore.js';
import { Card, LoadingSpinner } from '../../../shared/components/common/Common.jsx';
import Input from '../../../shared/components/common/Input.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

const defaultValues = {
  displayName: '',
  phone: '',
  favoriteSports: ''
};

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [avatarSource, setAvatarSource] = useState(null);
  const updateUser = useAuthStore((state) => state.updateUser);
  const logout = useAuthStore((state) => state.logout);
  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    setError(null);

    try {
      const response = await userClient.get('/users/profile');
      const data = response.data.data || response.data;
      const favoriteSports = Array.isArray(data.favoriteSports) ? data.favoriteSports.join(', ') : data.favoriteSports || '';
      reset({
        displayName: data.displayName || data.name || '',
        phone: data.phone || '',
        favoriteSports
      });
      const avatar = data.avatar || data.photo || null;
      setAvatarSource(avatar);
      updateUser(data);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo cargar el perfil.');
    } finally {
      setProfileLoading(false);
    }
  }, [reset, updateUser]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSave = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        displayName: values.displayName,
        phone: values.phone,
        favoriteSports: values.favoriteSports
          .split(',')
          .map((sport) => sport.trim())
          .filter(Boolean)
      };
      const response = await userClient.put('/users/profile', payload);
      const data = response.data.data || response.data;
      updateUser(data);
      reset({
        displayName: data.displayName || data.name || '',
        phone: data.phone || '',
        favoriteSports: Array.isArray(data.favoriteSports) ? data.favoriteSports.join(', ') : data.favoriteSports || ''
      });
      Alert.alert('Guardado', 'Tu perfil se actualizó correctamente.');
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: () => logout() }
    ]);
  };

  if (profileLoading) {
    return <LoadingSpinner text="Cargando perfil..." />;
  }

  const avatarUri = avatarSource && typeof avatarSource === 'string' && avatarSource.startsWith('http')
    ? { uri: avatarSource }
    : require('../../../../assets/avatarDefault.png');

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.avatarWrapper}>
          <Image source={avatarUri} style={styles.avatar} />
          <Text style={styles.title}>Mi perfil</Text>
        </View>

        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, value } }) => (
            <Input label="Nombre" value={value} onChangeText={onChange} placeholder="Nombre completo" editable={editMode} />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input label="Teléfono" value={value} onChangeText={onChange} placeholder="Teléfono" keyboardType="phone-pad" editable={editMode} />
          )}
        />
        <Controller
          control={control}
          name="favoriteSports"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Deportes favoritos"
              value={value}
              onChangeText={onChange}
              placeholder="Fútbol, Baloncesto, Voleibol"
              editable={editMode}
            />
          )}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {editMode ? (
          <Button label="Guardar cambios" onPress={handleSubmit(handleSave)} loading={loading} />
        ) : (
          <Button label="Editar perfil" onPress={() => setEditMode(true)} />
        )}

        <Button label="Cerrar sesión" variant="secondary" onPress={handleLogout} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.medium
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: SPACING.large
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: SPACING.medium,
    backgroundColor: COLORS.border
  },
  title: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.large,
    fontWeight: '700'
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center'
  }
});
