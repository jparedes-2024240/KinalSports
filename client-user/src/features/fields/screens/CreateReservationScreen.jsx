// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\fields\screens\CreateReservationScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useReservations } from '../../reservations/hooks/useReservations.js';
import Input from '../../../shared/components/common/Input.jsx';
import Button from '../../../shared/components/common/Button.jsx';
import { Card } from '../../../shared/components/common/Common.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../../../shared/constants/theme.js';

const defaultValues = {
  date: '',
  time: ''
};

export default function CreateReservationScreen({ route, navigation }) {
  const { field } = route.params;
  const { control, handleSubmit } = useForm({ defaultValues });
  const { createReservation, loading, error } = useReservations();

  const onSubmit = async (values) => {
    try {
      await createReservation({ fieldId: field.id, date: values.date, time: values.time });
      Alert.alert('Reserva creada', 'Tu reserva se registró correctamente.');
      navigation.navigate('Reservations');
    } catch {
      // error ya seteado en hook
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Reservar {field.name}</Text>
        <Text style={styles.subtitle}>{field.location}</Text>

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <Input label="Fecha" value={value} onChangeText={onChange} placeholder="YYYY-MM-DD" />
          )}
        />
        <Controller
          control={control}
          name="time"
          render={({ field: { onChange, value } }) => (
            <Input label="Horario" value={value} onChangeText={onChange} placeholder="HH:MM" />
          )}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button label="Confirmar reserva" onPress={handleSubmit(onSubmit)} loading={loading} />
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
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center'
  }
});
