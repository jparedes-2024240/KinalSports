// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\auth\screens\LoginScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth.js';
import Input from '../../../shared/components/common/Input.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

const defaultValues = {
  emailOrUsername: '',
  password: ''
};

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm({ defaultValues });
  const { handleLogin, loading, error } = useAuth();

  const onSubmit = async (formData) => {
    await handleLogin(formData);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/kinal_sports.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Bienvenido a KinalSports</Text>
      <Text style={styles.subtitle}>Ingresa con tu correo o usuario para reservar.</Text>

      <Controller
        control={control}
        name="emailOrUsername"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Correo o usuario"
            value={value}
            onChangeText={onChange}
            placeholder="example@correo.com / usuario"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Contraseña"
            value={value}
            onChangeText={onChange}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
          />
        )}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button label="Iniciar sesión" onPress={handleSubmit(onSubmit)} loading={loading} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Regístrate</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: SPACING.large
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
  footer: {
    marginTop: SPACING.large,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerText: {
    color: COLORS.textLight,
    marginRight: SPACING.tiny
  },
  link: {
    color: COLORS.primary,
    fontWeight: '700'
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center'
  }
});
