// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\teams\screens\CreateTeamScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { useTeams } from '../hooks/useTeams.js';
import Input from '../../../shared/components/common/Input.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { Card } from '../../../shared/components/common/Common.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

const defaultValues = {
  name: '',
  description: '',
  phone: ''
};

export default function CreateTeamScreen() {
  const [image, setImage] = useState(null);
  const { control, handleSubmit } = useForm({ defaultValues });
  const { createTeam, loading, error } = useTeams();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso necesario', 'Necesitamos acceso a la galería para seleccionar la foto del equipo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (values) => {
    try {
      await createTeam({ ...values, image });
      Alert.alert('Equipo creado', 'Tu equipo se creó con éxito.');
    } catch {
      Alert.alert('Error', error || 'No se pudo crear el equipo.');
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Crear equipo</Text>
        <Text style={styles.subtitle}>Agrega la información de tu equipo.</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : <Text style={styles.imagePlaceholder}>Seleccionar foto del equipo</Text>}
        </TouchableOpacity>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input label="Nombre" value={value} onChangeText={onChange} placeholder="Nombre del equipo" />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input label="Descripción" value={value} onChangeText={onChange} placeholder="Descripción del equipo" />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input label="Teléfono" value={value} onChangeText={onChange} placeholder="Teléfono de contacto" keyboardType="phone-pad" />
          )}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button label="Crear equipo" onPress={handleSubmit(onSubmit)} loading={loading} />
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
  title: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: '700',
    marginBottom: SPACING.small
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium,
    marginBottom: SPACING.large
  },
  imagePicker: {
    height: 150,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagePlaceholder: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 14
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center'
  }
});
