"use client";
import { useState, useEffect } from 'react';
import { pointsService } from '../services/pointsService';
import { useAccountContext } from '../components/AccountProvider';

export function usePoints() {
  const { address } = useAccountContext();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (address) {
      pointsService.setUserWallet(address);
      loadPoints();
      
      // Escuchar eventos de misiones completadas
      const handleMissionCompleted = () => {
        loadPoints();
      };
      
      window.addEventListener('missionCompleted', handleMissionCompleted);
      
      return () => {
        window.removeEventListener('missionCompleted', handleMissionCompleted);
      };
    }
  }, [address]);

  const loadPoints = () => {
    const userPoints = pointsService.getUserPoints();
    setPoints(userPoints);
  };

  const addPoints = (amount: number) => {
    const newPoints = pointsService.addPoints(amount);
    setPoints(newPoints);
    return newPoints;
  };

  const spendPoints = (amount: number) => {
    const result = pointsService.spendPoints(amount);
    if (result.success) {
      setPoints(result.newPoints);
    }
    return result;
  };

  return {
    points,
    addPoints,
    spendPoints,
    refresh: loadPoints
  };
}