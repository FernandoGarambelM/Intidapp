// Servicio simple de misiones en memoria
import { missionsData, MissionData, isMissionCompleted } from '../lib/missionsData';

class SimpleMissionService {
  private userWallet: string | null = null;

  // Configura el usuario actual
  setUserWallet(wallet: string): void {
    this.userWallet = wallet;
  }

  // Obtiene todas las misiones con su estado
  getAllMissions(): any[] {
    if (!this.userWallet) return missionsData.map(m => ({ ...m, isCompleted: false }));

    return missionsData.map(mission => ({
      ...mission,
      isCompleted: isMissionCompleted(mission.id, this.userWallet!)
    }));
  }

  // Obtiene una misión por ID
  getMissionById(id: number): any {
    const mission = missionsData.find(m => m.id === id);
    if (!mission) return undefined;
    
    if (!this.userWallet) return { ...mission, isCompleted: false };

    return {
      ...mission,
      isCompleted: isMissionCompleted(mission.id, this.userWallet)
    };
  }

  // Verifica si una misión está completada
  isMissionCompleted(missionId: number): boolean {
    if (!this.userWallet) return false;
    return isMissionCompleted(missionId, this.userWallet);
  }

  // Completa una misión
  completeMission(missionId: number): { success: boolean; points: number } {
    if (!this.userWallet) {
      return { success: false, points: 0 };
    }

    const mission = missionsData.find(m => m.id === missionId);
    if (!mission) {
      return { success: false, points: 0 };
    }

    if (this.isMissionCompleted(missionId)) {
      return { success: false, points: 0 };
    }

    // Registrar misión completada
    const storageKey = `intidapp_progress_${this.userWallet}`;
    const currentProgress = JSON.parse(localStorage.getItem(storageKey) || '{"missions": [], "totalPoints": 0}');
    currentProgress.missions.push(missionId);
    localStorage.setItem(storageKey, JSON.stringify(currentProgress));

    // Añadir puntos
    const { pointsService } = require('./pointsService');
    pointsService.setUserWallet(this.userWallet);
    pointsService.addPoints(mission.points);

    return { success: true, points: mission.points };
  }

  // Obtiene estadísticas del usuario
  getUserStats() {
    if (!this.userWallet) {
      return {
        totalMissions: missionsData.length,
        completedMissions: 0,
        totalPoints: 0,
        completionRate: 0
      };
    }

    const completedMissions = missionsData.filter(m => 
      isMissionCompleted(m.id, this.userWallet!)
    ).length;

    const { pointsService } = require('./pointsService');
    pointsService.setUserWallet(this.userWallet);
    const totalPoints = pointsService.getUserPoints();

    return {
      totalMissions: missionsData.length,
      completedMissions,
      totalPoints,
      completionRate: Math.round((completedMissions / missionsData.length) * 100)
    };
  }
}

export const simpleMissionService = new SimpleMissionService();