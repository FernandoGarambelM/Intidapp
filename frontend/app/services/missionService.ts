import { 
  Mission, 
  MissionCategory, 
  MissionDifficulty, 
  StepType,
  ApiResponse,
  PaginatedResponse 
} from '../types';

// Datos simulados de misiones
const MOCK_MISSIONS: Mission[] = [
  {
    id: 'mission-001',
    title: '🔰 Bienvenido a Blockchain',
    description: 'Aprende qué es una wallet y cómo funciona',
    longDescription: 'En esta misión aprenderás los conceptos básicos de blockchain, qué es una wallet y cómo conectarte de forma segura.',
    points: 10,
    category: MissionCategory.BASICS,
    difficulty: MissionDifficulty.BEGINNER,
    estimatedTime: 15,
    prerequisites: [],
    isCompleted: false,
    isLocked: false,
    steps: [
      {
        id: 'step-001-1',
        title: 'Conecta tu wallet',
        description: 'Conecta tu wallet Argent X o Braavos',
        type: StepType.INTERACT,
        isCompleted: false,
        order: 1
      },
      {
        id: 'step-001-2',
        title: 'Lee sobre blockchain',
        description: 'Aprende qué es blockchain y por qué es importante',
        type: StepType.READ,
        isCompleted: false,
        order: 2
      }
    ],
    rewards: [
      {
        type: 'points',
        value: 10,
        description: '10 puntos de experiencia'
      },
      {
        type: 'badge',
        value: 'first-steps',
        description: 'Insignia "Primeros Pasos"'
      }
    ]
  },
  {
    id: 'mission-002',
    title: '💎 Tu Primer NFT',
    description: 'Descubre qué son los NFTs y por qué son únicos',
    longDescription: 'Explora el mundo de los NFTs, aprende cómo funcionan y mint tu primer NFT en Starknet.',
    points: 20,
    category: MissionCategory.NFTS,
    difficulty: MissionDifficulty.BEGINNER,
    estimatedTime: 25,
    prerequisites: ['mission-001'],
    isCompleted: false,
    isLocked: true,
    steps: [
      {
        id: 'step-002-1',
        title: 'Aprende sobre NFTs',
        description: 'Entiende qué hace únicos a los NFTs',
        type: StepType.READ,
        isCompleted: false,
        order: 1
      },
      {
        id: 'step-002-2',
        title: 'Mint tu primer NFT',
        description: 'Crea tu primer NFT en la red',
        type: StepType.TRANSACTION,
        isCompleted: false,
        order: 2
      }
    ],
    rewards: [
      {
        type: 'points',
        value: 20,
        description: '20 puntos de experiencia'
      },
      {
        type: 'nft',
        value: 'first-nft',
        description: 'Tu primer NFT coleccionable'
      }
    ]
  },
  {
    id: 'mission-003',
    title: '🤝 Smart Contracts 101',
    description: 'Entiende cómo funcionan los contratos inteligentes',
    longDescription: 'Aprende los fundamentos de los smart contracts y cómo interactuar con ellos de forma segura.',
    points: 30,
    category: MissionCategory.BASICS,
    difficulty: MissionDifficulty.INTERMEDIATE,
    estimatedTime: 35,
    prerequisites: ['mission-001'],
    isCompleted: false,
    isLocked: true,
    steps: [
      {
        id: 'step-003-1',
        title: 'Conceptos básicos',
        description: 'Aprende qué son los smart contracts',
        type: StepType.READ,
        isCompleted: false,
        order: 1
      },
      {
        id: 'step-003-2',
        title: 'Interactúa con un contrato',
        description: 'Realiza tu primera transacción con un smart contract',
        type: StepType.INTERACT,
        isCompleted: false,
        order: 2
      },
      {
        id: 'step-003-3',
        title: 'Quiz de conocimientos',
        description: 'Demuestra lo que has aprendido',
        type: StepType.QUIZ,
        isCompleted: false,
        order: 3
      }
    ],
    rewards: [
      {
        type: 'points',
        value: 30,
        description: '30 puntos de experiencia'
      },
      {
        type: 'unlock',
        value: 'defi-missions',
        description: 'Desbloquea misiones de DeFi'
      }
    ]
  },
  {
    id: 'mission-004',
    title: '🌐 Ethereum y Starknet',
    description: 'Conoce la diferencia entre Layer 1 y Layer 2',
    longDescription: 'Explora las diferencias entre Ethereum y Starknet, y por qué las Layer 2 son importantes.',
    points: 25,
    category: MissionCategory.STARKNET,
    difficulty: MissionDifficulty.INTERMEDIATE,
    estimatedTime: 30,
    prerequisites: ['mission-001'],
    isCompleted: false,
    isLocked: true,
    steps: [
      {
        id: 'step-004-1',
        title: 'Layer 1 vs Layer 2',
        description: 'Entiende las diferencias fundamentales',
        type: StepType.READ,
        isCompleted: false,
        order: 1
      },
      {
        id: 'step-004-2',
        title: 'Explora Starknet',
        description: 'Navega por el ecosistema de Starknet',
        type: StepType.INTERACT,
        isCompleted: false,
        order: 2
      }
    ],
    rewards: [
      {
        type: 'points',
        value: 25,
        description: '25 puntos de experiencia'
      },
      {
        type: 'badge',
        value: 'starknet-explorer',
        description: 'Insignia "Explorador de Starknet"'
      }
    ]
  },
  {
    id: 'mission-005',
    title: '🔐 Seguridad en DeFi',
    description: 'Aprende las mejores prácticas de seguridad',
    longDescription: 'Domina las mejores prácticas de seguridad para proteger tus activos en DeFi.',
    points: 40,
    category: MissionCategory.SECURITY,
    difficulty: MissionDifficulty.ADVANCED,
    estimatedTime: 45,
    prerequisites: ['mission-003'],
    isCompleted: false,
    isLocked: true,
    steps: [
      {
        id: 'step-005-1',
        title: 'Riesgos comunes',
        description: 'Identifica los riesgos más frecuentes',
        type: StepType.READ,
        isCompleted: false,
        order: 1
      },
      {
        id: 'step-005-2',
        title: 'Herramientas de seguridad',
        description: 'Aprende a usar herramientas de verificación',
        type: StepType.INTERACT,
        isCompleted: false,
        order: 2
      },
      {
        id: 'step-005-3',
        title: 'Simulacro de seguridad',
        description: 'Practica identificando contratos maliciosos',
        type: StepType.QUIZ,
        isCompleted: false,
        order: 3
      }
    ],
    rewards: [
      {
        type: 'points',
        value: 40,
        description: '40 puntos de experiencia'
      },
      {
        type: 'badge',
        value: 'security-expert',
        description: 'Insignia "Experto en Seguridad"'
      }
    ]
  },
  {
    id: 'mission-006',
    title: '🌊 Liquidez y AMM',
    description: 'Entiende cómo funcionan los pools de liquidez',
    longDescription: 'Aprende sobre los Automated Market Makers y cómo proporcionar liquidez de forma rentable.',
    points: 35,
    category: MissionCategory.DEFI,
    difficulty: MissionDifficulty.ADVANCED,
    estimatedTime: 40,
    prerequisites: ['mission-003', 'mission-005'],
    isCompleted: false,
    isLocked: true,
    steps: [
      {
        id: 'step-006-1',
        title: 'Conceptos de AMM',
        description: 'Aprende cómo funcionan los AMM',
        type: StepType.READ,
        isCompleted: false,
        order: 1
      },
      {
        id: 'step-006-2',
        title: 'Proporciona liquidez',
        description: 'Añade liquidez a un pool',
        type: StepType.TRANSACTION,
        isCompleted: false,
        order: 2
      }
    ],
    rewards: [
      {
        type: 'points',
        value: 35,
        description: '35 puntos de experiencia'
      },
      {
        type: 'unlock',
        value: 'advanced-defi',
        description: 'Desbloquea DeFi avanzado'
      }
    ]
  }
];

class MissionService {
  private missions: Mission[] = MOCK_MISSIONS;
  private userWallet: string | null = null;

  // Simula delay de red
  private async delay(ms: number = 10): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Configura el usuario actual
  setUserWallet(wallet: string): void {
    this.userWallet = wallet;
    this.loadUserProgress();
  }

  // Carga el progreso del usuario (simulado con localStorage)
  private loadUserProgress(): void {
    if (!this.userWallet) return;
    
    const savedProgress = localStorage.getItem(`missions_${this.userWallet}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.missions = this.missions.map(mission => ({
        ...mission,
        isCompleted: progress.completed?.includes(mission.id) || false,
        isLocked: this.isMissionLocked(mission, progress.completed || [])
      }));
    } else {
      // Primera vez del usuario - desbloquear primera misión
      this.missions = this.missions.map(mission => ({
        ...mission,
        isLocked: mission.prerequisites.length > 0
      }));
    }
  }

  // Verifica si una misión está bloqueada
  private isMissionLocked(mission: Mission, completedMissions: string[]): boolean {
    if (mission.prerequisites.length === 0) return false;
    return !mission.prerequisites.every(prereq => completedMissions.includes(prereq));
  }

  // Guarda el progreso del usuario
  private saveUserProgress(): void {
    if (!this.userWallet) return;
    
    const completedMissions = this.missions
      .filter(m => m.isCompleted)
      .map(m => m.id);
    
    const progress = {
      completed: completedMissions,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(`missions_${this.userWallet}`, JSON.stringify(progress));
  }

  // Obtiene todas las misiones
  async getAllMissions(): Promise<ApiResponse<Mission[]>> {
    await this.delay();
    
    return {
      success: true,
      data: [...this.missions]
    };
  }

  // Obtiene misiones por categoría
  async getMissionsByCategory(category: MissionCategory): Promise<ApiResponse<Mission[]>> {
    await this.delay();
    
    const filtered = this.missions.filter(m => m.category === category);
    return {
      success: true,
      data: filtered
    };
  }

  // Obtiene misiones por dificultad
  async getMissionsByDifficulty(difficulty: MissionDifficulty): Promise<ApiResponse<Mission[]>> {
    await this.delay();
    
    const filtered = this.missions.filter(m => m.difficulty === difficulty);
    return {
      success: true,
      data: filtered
    };
  }

  // Obtiene una misión específica
  async getMissionById(id: string): Promise<ApiResponse<Mission | null>> {
    await this.delay();
    
    const mission = this.missions.find(m => m.id === id);
    return {
      success: true,
      data: mission || null
    };
  }

  // Obtiene misiones disponibles (desbloqueadas)
  async getAvailableMissions(): Promise<ApiResponse<Mission[]>> {
    await this.delay();
    
    const available = this.missions.filter(m => !m.isLocked && !m.isCompleted);
    return {
      success: true,
      data: available
    };
  }

  // Obtiene misiones completadas
  async getCompletedMissions(): Promise<ApiResponse<Mission[]>> {
    await this.delay();
    
    const completed = this.missions.filter(m => m.isCompleted);
    return {
      success: true,
      data: completed
    };
  }

  // Completa una misión
  async completeMission(missionId: string): Promise<ApiResponse<{ points: number; rewards: any[] }>> {
    await this.delay();
    
    const missionIndex = this.missions.findIndex(m => m.id === missionId);
    if (missionIndex === -1) {
      return {
        success: false,
        data: { points: 0, rewards: [] },
        error: 'Misión no encontrada'
      };
    }

    const mission = this.missions[missionIndex];
    if (mission.isLocked) {
      return {
        success: false,
        data: { points: 0, rewards: [] },
        error: 'Misión bloqueada'
      };
    }

    if (mission.isCompleted) {
      return {
        success: false,
        data: { points: 0, rewards: [] },
        error: 'Misión ya completada'
      };
    }

    // Marcar como completada
    this.missions[missionIndex].isCompleted = true;

    // Desbloquear misiones dependientes
    const completedMissions = this.missions.filter(m => m.isCompleted).map(m => m.id);
    this.missions = this.missions.map(m => ({
      ...m,
      isLocked: this.isMissionLocked(m, completedMissions)
    }));

    // Guardar progreso
    this.saveUserProgress();

    return {
      success: true,
      data: {
        points: mission.points,
        rewards: mission.rewards
      }
    };
  }

  // Obtiene estadísticas del usuario
  async getUserStats(): Promise<ApiResponse<any>> {
    await this.delay();
    
    const total = this.missions.length;
    const completed = this.missions.filter(m => m.isCompleted).length;
    const totalPoints = this.missions
      .filter(m => m.isCompleted)
      .reduce((sum, m) => sum + m.points, 0);

    return {
      success: true,
      data: {
        totalMissions: total,
        completedMissions: completed,
        totalPoints,
        completionRate: Math.round((completed / total) * 100)
      }
    };
  }
}

export const missionService = new MissionService();