// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\auth\screens\RegisterScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth.js';
import Input from '../../../shared/components/common/Input.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

const defaultValues = {
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  phone: ''
};

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit } = useForm({ defaultValues });
  const { handleRegister, loading, error } = useAuth();

  const onSubmit = async (formData) => {
    try {
      await handleRegister(formData);
      Alert.alert('Registro exitoso', 'Tu cuenta se creó correctamente. Inicia sesión ahora.');
      navigation.navigate('Login');
    } catch {
      // el hook ya muestra el error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Completa tus datos para comenzar a reservar.</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input label="Nombre" value={value} onChangeText={onChange} placeholder="Ingresa tu nombre" />
        )}
      />
      <Controller
        control={control}
        name="surname"
        render={({ field: { onChange, value } }) => (
          <Input label="Apellido" value={value} onChangeText={onChange} placeholder="Ingresa tu apellido" />
        )}
      />
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <Input label="Usuario" value={value} onChangeText={onChange} placeholder="Nombre de usuario" />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input label="Correo" value={value} onChangeText={onChange} placeholder="example@correo.com" keyboardType="email-address" />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input label="Contraseña" value={value} onChangeText={onChange} placeholder="Crea una contraseña" secureTextEntry />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <Input label="Teléfono" value={value} onChangeText={onChange} placeholder="Número de teléfono" keyboardType="phone-pad" />
        )}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button label="Registrarme" onPress={handleSubmit(onSubmit)} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.large,
    justifyContent: 'center'
  },
  title: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: '700',
    textAlign: 'center'
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: FONT_SIZE.medium,
    textAlign: 'center',
    marginBottom: SPACING.large
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center'
  }
});
