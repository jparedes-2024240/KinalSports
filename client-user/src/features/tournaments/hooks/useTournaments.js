// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\tournaments\hooks\useTournaments.js
import { useState, useEffect, useCallback } from 'react';
import { userClient } from '../../../shared/api/userClient.js';

export function useTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [myTournaments, setMyTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTournaments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [allResponse, myResponse] = await Promise.all([
        userClient.get('/tournaments'),
        userClient.get('/tournaments/my-tournaments')
      ]);

      const allData = allResponse.data.data || allResponse.data;
      const myData = myResponse.data.data || myResponse.data;

      setTournaments(Array.isArray(allData) ? allData : []);
      setMyTournaments(Array.isArray(myData) ? myData : []);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar los torneos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const registerTournament = useCallback(async (tournamentId, teamId) => {
    setLoading(true);
    setError(null);

    try {
      await userClient.post(`/tournaments/register/${tournamentId}`, { teamId });
      await fetchTournaments();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo registrar el equipo en el torneo.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTournaments]);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  return {
    tournaments,
    myTournaments,
    loading,
    error,
    fetchTournaments,
    registerTournament
  };
}
