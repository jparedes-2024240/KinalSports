// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\teams\hooks\useTeams.js
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../../shared/store/authStore.js';
import { userClient } from '../../../shared/api/userClient.js';

export function useTeams() {
  const user = useAuthStore((state) => state.user);
  const [teams, setTeams] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [allResponse, myResponse] = await Promise.all([
        userClient.get('/teams'),
        user ? userClient.get('/teams/me/mis-equipos') : Promise.resolve({ data: [] })
      ]);

      const allData = allResponse.data.data || allResponse.data;
      const myData = myResponse.data.data || myResponse.data;

      setTeams(Array.isArray(allData) ? allData : []);
      setMyTeams(Array.isArray(myData) ? myData : []);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar los equipos.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const joinTeam = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await userClient.post(`/teams/${id}/join`);
      await fetchTeams();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo unirse al equipo.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTeams]);

  const leaveTeam = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await userClient.post(`/teams/${id}/leave`);
      await fetchTeams();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo salir del equipo.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTeams]);

  const createTeam = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('phone', data.phone);
      if (data.image) {
        formData.append('photo', {
          uri: data.image,
          name: data.image.split('/').pop(),
          type: 'image/jpeg'
        });
      }
      await userClient.post('/teams', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchTeams();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo crear el equipo.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTeams]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return {
    teams,
    myTeams,
    loading,
    error,
    fetchTeams,
    joinTeam,
    leaveTeam,
    createTeam
  };
}
