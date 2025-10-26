// Servicio simple de puntos en memoria
class PointsService {
  private userWallet: string | null = null;

  // Configura el usuario actual
  setUserWallet(wallet: string): void {
    this.userWallet = wallet;
  }

  // Obtiene los puntos del usuario
  getUserPoints(): number {
    if (!this.userWallet) return 0;
    
    const saved = localStorage.getItem(`points_${this.userWallet}`);
    return saved ? parseInt(saved) : 0;
  }

  // Añade puntos al usuario
  addPoints(points: number): number {
    if (!this.userWallet) return 0;
    
    const currentPoints = this.getUserPoints();
    const newPoints = currentPoints + points;
    localStorage.setItem(`points_${this.userWallet}`, newPoints.toString());
    return newPoints;
  }

  // Gasta puntos del usuario
  spendPoints(points: number): { success: boolean; newPoints: number } {
    if (!this.userWallet) return { success: false, newPoints: 0 };
    
    const currentPoints = this.getUserPoints();
    if (currentPoints < points) {
      return { success: false, newPoints: currentPoints };
    }
    
    const newPoints = currentPoints - points;
    localStorage.setItem(`points_${this.userWallet}`, newPoints.toString());
    return { success: true, newPoints };
  }

  // Establece puntos específicos (para testing)
  setPoints(points: number): void {
    if (!this.userWallet) return;
    localStorage.setItem(`points_${this.userWallet}`, points.toString());
  }
}

export const pointsService = new PointsService();