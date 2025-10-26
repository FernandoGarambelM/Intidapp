"use client";
import { useState, useEffect } from 'react';
import { Mission, MissionCategory, MissionDifficulty } from '../types';
import { missionService } from '../services/missionService';
import { useAccountContext } from '../components/AccountProvider';

export function useMissions() {
  const { address } = useAccountContext();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configurar el servicio cuando cambie la wallet
  useEffect(() => {
    if (address) {
      missionService.setUserWallet(address);
      loadMissions();
    }
  }, [address]);

  const loadMissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await missionService.getAllMissions();
      if (response.success) {
        setMissions(response.data);
      } else {
        setError(response.error || 'Error cargando misiones');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const completeMission = async (missionId: string) => {
    try {
      const response = await missionService.completeMission(missionId);
      if (response.success) {
        // Recargar misiones para actualizar el estado
        await loadMissions();
        return response.data;
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    missions,
    loading,
    error,
    completeMission,
    refetch: loadMissions
  };
}

export function useMissionsByCategory(category: MissionCategory) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMissions();
  }, [category]);

  const loadMissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await missionService.getMissionsByCategory(category);
      if (response.success) {
        setMissions(response.data);
      } else {
        setError(response.error || 'Error cargando misiones');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return {
    missions,
    loading,
    error,
    refetch: loadMissions
  };
}

export function useAvailableMissions() {
  const { address } = useAccountContext();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      missionService.setUserWallet(address);
      loadMissions();
    }
  }, [address]);

  const loadMissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await missionService.getAvailableMissions();
      if (response.success) {
        setMissions(response.data);
      } else {
        setError(response.error || 'Error cargando misiones');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return {
    missions,
    loading,
    error,
    refetch: loadMissions
  };
}

export function useMissionStats() {
  const { address } = useAccountContext();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      missionService.setUserWallet(address);
      loadStats();
    }
  }, [address]);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await missionService.getUserStats();
      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.error || 'Error cargando estadísticas');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    refetch: loadStats
  };
}