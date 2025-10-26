"use client";
import { useState, useEffect } from 'react';
import { simpleMissionService } from '../services/simpleMissionService';
import { useAccountContext } from '../components/AccountProvider';

export function useSimpleMissions() {
  const { address } = useAccountContext();
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      simpleMissionService.setUserWallet(address);
      loadMissions();
      
      // Escuchar eventos de misiones completadas
      const handleMissionCompleted = () => {
        loadMissions();
      };
      
      window.addEventListener('missionCompleted', handleMissionCompleted);
      
      return () => {
        window.removeEventListener('missionCompleted', handleMissionCompleted);
      };
    }
  }, [address]);

  const loadMissions = () => {
    setLoading(true);
    const allMissions = simpleMissionService.getAllMissions();
    setMissions(allMissions);
    setLoading(false);
  };

  const completeMission = (missionId: number) => {
    const result = simpleMissionService.completeMission(missionId);
    if (result.success) {
      // Disparar evento para actualizar otros componentes
      window.dispatchEvent(new Event('missionCompleted'));
      loadMissions(); // Recargar misiones
    }
    return result;
  };

  return {
    missions,
    loading,
    completeMission,
    refetch: loadMissions
  };
}

export function useSimpleMissionStats() {
  const { address } = useAccountContext();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      simpleMissionService.setUserWallet(address);
      loadStats();
      
      // Escuchar eventos de misiones completadas
      const handleMissionCompleted = () => {
        loadStats();
      };
      
      window.addEventListener('missionCompleted', handleMissionCompleted);
      
      return () => {
        window.removeEventListener('missionCompleted', handleMissionCompleted);
      };
    }
  }, [address]);

  const loadStats = () => {
    setLoading(true);
    const userStats = simpleMissionService.getUserStats();
    setStats(userStats);
    setLoading(false);
  };

  return {
    stats,
    loading,
    refetch: loadStats
  };
}