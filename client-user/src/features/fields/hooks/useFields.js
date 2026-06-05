// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\fields\hooks\useFields.js
import { useState, useEffect, useCallback } from 'react';
import { userClient } from '../../../shared/api/userClient.js';

export function useFields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFields = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await userClient.get('/fields');
      const data = response.data.data || response.data;
      const mapped = (Array.isArray(data) ? data : []).map((item) => ({
        id: item._id || item.id,
        name: item.fieldName || item.name || 'Campo',
        image: item.photo || item.image || null,
        location: `${item.fieldType || 'Tipo'} • ${item.capacity || 'N/A'}`,
        isAvailable: Boolean(item.isActive),
        raw: item
      }));
      setFields(mapped);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar los campos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  return {
    fields,
    loading,
    error,
    fetchFields
  };
}
