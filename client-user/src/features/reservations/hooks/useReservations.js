// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\reservations\hooks\useReservations.js
import { useState, useEffect, useCallback } from 'react';
import { userClient } from '../../../shared/api/userClient.js';

export function useReservations() {
  const [reservationHistory, setReservationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await userClient.get('/reservations/me/history');
      const data = response.data.data || response.data;
      const mapped = (Array.isArray(data) ? data : []).map((item) => ({
        id: item._id || item.id,
        field: {
          id: item.field?._id || item.field?.id || item.fieldId,
          name: item.field?.name || item.fieldName || 'Cancha',
          image: item.field?.image || item.field?.photo || null
        },
        normalizedStatus: (item.status || '').toUpperCase(),
        date: item.date,
        time: item.time,
        raw: item
      }));
      setReservationHistory(mapped);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo cargar el historial de reservas.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createReservation = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      await userClient.post('/reservations', payload);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo crear la reserva.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelReservation = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await userClient.put(`/reservations/${id}/cancel`);
      await fetchReservations();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo cancelar la reserva.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchReservations]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return {
    reservationHistory,
    loading,
    error,
    fetchReservations,
    createReservation,
    cancelReservation
  };
}
