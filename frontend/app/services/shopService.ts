import {
    ShopItem,
    ShopCategory,
    ItemRarity,
    ApiResponse
} from '../types';

// Datos simulados de la tienda
const MOCK_SHOP_ITEMS: ShopItem[] = [
    {
        id: 'cert-001',
        name: '🏆 Certificado Blockchain Básico',
        description: 'NFT que certifica tus conocimientos básicos',
        longDescription: 'Certificado oficial que demuestra tu comprensión de los conceptos fundamentales de blockchain. Este NFT se puede verificar en cualquier momento y sirve como prueba de tus conocimientos.',
        price: 30, // 50 → 30
        category: ShopCategory.CERTIFICATES,
        rarity: ItemRarity.COMMON,
        isAvailable: true,
        isPurchased: false,
        requirements: [
            {
                type: 'points',
                value: 15, // 25 → 15
                description: 'Necesitas 15 puntos'
            },
            {
                type: 'missions',
                value: ['mission-001', 'mission-002'],
                description: 'Completa las misiones básicas'
            }
        ],
        metadata: {
            certificateType: 'basic',
            validUntil: null,
            issuer: 'IntiDapp Academy'
        }
    },
    {
        id: 'avatar-001',
        name: '💎 Avatar Exclusivo - Diamante',
        description: 'Avatar único para tu perfil',
        longDescription: 'Avatar exclusivo con efectos especiales de diamante. Muestra tu estatus como usuario avanzado de IntiDapp.',
        price: 23, // 38 → 23
        category: ShopCategory.AVATARS,
        rarity: ItemRarity.RARE,
        isAvailable: true,
        isPurchased: false,
        requirements: [
            {
                type: 'points',
                value: 23, // 38 → 23
                description: 'Necesitas 23 puntos'
            }
        ],
        metadata: {
            avatarType: 'diamond',
            effects: ['sparkle', 'glow'],
            rarity: 'rare'
        }
    },
    {
        id: 'nft-001',
        name: '🎨 NFT Coleccionable - Genesis',
        description: 'Arte digital exclusivo de IntiDapp',
        longDescription: 'NFT coleccionable de la serie Genesis de IntiDapp. Edición limitada con arte único creado por artistas latinoamericanos.',
        price: 30, // 50 → 30
        category: ShopCategory.NFTS,
        rarity: ItemRarity.EPIC,
        isAvailable: true,
        isPurchased: false,
        requirements: [
            {
                type: 'points',
                value: 30, // 50 → 30
                description: 'Necesitas 30 puntos'
            },
            {
                type: 'missions',
                value: ['mission-002'],
                description: 'Completa la misión de NFTs'
            }
        ],
        metadata: {
            artist: 'Carlos Mendoza',
            edition: 'Genesis #001',
            totalSupply: 100
        }
    },
    {
        id: 'premium-001',
        name: '🚀 Acceso Premium - 1 Mes',
        description: 'Acceso a misiones avanzadas',
        longDescription: 'Acceso premium por 1 mes que incluye misiones exclusivas, contenido avanzado, y soporte prioritario.',
        price: 75, // 125 → 75
        category: ShopCategory.PREMIUM,
        rarity: ItemRarity.LEGENDARY,
        isAvailable: true,
        isPurchased: false,
        requirements: [
            {
                type: 'points',
                value: 75, // 125 → 75
                description: 'Necesitas 75 puntos'
            },
            {
                type: 'missions',
                value: ['mission-003', 'mission-004'],
                description: 'Completa misiones intermedias'
            }
        ],
        metadata: {
            duration: 30, // días
            benefits: ['exclusive-missions', 'priority-support', 'advanced-content']
        }
    },
    {
        id: 'badge-001',
        name: '🛡️ Insignia de Seguridad',
        description: 'Demuestra tu expertise en seguridad',
        longDescription: 'Insignia especial que certifica tu conocimiento en seguridad DeFi. Solo disponible para usuarios que completen todas las misiones de seguridad.',
        price: 45, // 75 → 45
        category: ShopCategory.COLLECTIBLES,
        rarity: ItemRarity.EPIC,
        isAvailable: false,
        isPurchased: false,
        requirements: [
            {
                type: 'points',
                value: 45, // 75 → 45
                description: 'Necesitas 45 puntos'
            },
            {
                type: 'missions',
                value: ['mission-005'],
                description: 'Completa la misión de seguridad'
            }
        ],
        metadata: {
            badgeType: 'security-expert',
            level: 'expert'
        }
    },
    {
        id: 'cert-002',
        name: '🌟 Certificado DeFi Avanzado',
        description: 'Certificación en finanzas descentralizadas',
        longDescription: 'Certificado avanzado que demuestra tu dominio de DeFi, incluyendo AMMs, yield farming, y estrategias avanzadas.',
        price: 113, // 188 → 113
        category: ShopCategory.CERTIFICATES,
        rarity: ItemRarity.LEGENDARY,
        isAvailable: false,
        isPurchased: false,
        requirements: [
            {
                type: 'points',
                value: 113, // 188 → 113
                description: 'Necesitas 113 puntos'
            },
            {
                type: 'missions',
                value: ['mission-005', 'mission-006'],
                description: 'Completa todas las misiones DeFi'
            }
        ],
        metadata: {
            certificateType: 'defi-advanced',
            validUntil: null,
            issuer: 'IntiDapp Academy'
        }
    }
];




class ShopService {
    private items: ShopItem[] = MOCK_SHOP_ITEMS;
    private userWallet: string | null = null;

    // Simula delay de red
    private async delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Configura el usuario actual
    setUserWallet(wallet: string): void {
        this.userWallet = wallet;
        this.loadUserPurchases();
    }

    // Carga las compras del usuario (simulado con localStorage)
    private loadUserPurchases(): void {
        if (!this.userWallet) return;

        const savedPurchases = localStorage.getItem(`shop_${this.userWallet}`);
        if (savedPurchases) {
            const purchases = JSON.parse(savedPurchases);
            this.items = this.items.map(item => ({
                ...item,
                isPurchased: purchases.includes(item.id)
            }));
        }
    }

    // Guarda las compras del usuario
    private savePurchase(itemId: string): void {
        if (!this.userWallet) return;

        const savedPurchases = localStorage.getItem(`shop_${this.userWallet}`);
        const purchases = savedPurchases ? JSON.parse(savedPurchases) : [];

        if (!purchases.includes(itemId)) {
            purchases.push(itemId);
            localStorage.setItem(`shop_${this.userWallet}`, JSON.stringify(purchases));
        }
    }

    // Verifica si el usuario cumple los requisitos
    private async checkRequirements(item: ShopItem, userPoints: number, completedMissions: string[]): Promise<boolean> {
        for (const req of item.requirements) {
            switch (req.type) {
                case 'points':
                    if (userPoints < (req.value as number)) return false;
                    break;
                case 'missions':
                    const requiredMissions = req.value as string[];
                    if (!requiredMissions.every(mission => completedMissions.includes(mission))) {
                        return false;
                    }
                    break;
            }
        }
        return true;
    }

    // Obtiene todos los items de la tienda
    async getAllItems(): Promise<ApiResponse<ShopItem[]>> {
        await this.delay();

        return {
            success: true,
            data: [...this.items]
        };
    }

    // Obtiene items por categoría
    async getItemsByCategory(category: ShopCategory): Promise<ApiResponse<ShopItem[]>> {
        await this.delay();

        const filtered = this.items.filter(item => item.category === category);
        return {
            success: true,
            data: filtered
        };
    }

    // Obtiene items por rareza
    async getItemsByRarity(rarity: ItemRarity): Promise<ApiResponse<ShopItem[]>> {
        await this.delay();

        const filtered = this.items.filter(item => item.rarity === rarity);
        return {
            success: true,
            data: filtered
        };
    }

    // Obtiene items disponibles para comprar
    async getAvailableItems(userPoints: number, completedMissions: string[]): Promise<ApiResponse<ShopItem[]>> {
        await this.delay();

        const available = [];
        for (const item of this.items) {
            if (!item.isPurchased && await this.checkRequirements(item, userPoints, completedMissions)) {
                available.push({
                    ...item,
                    isAvailable: true
                });
            }
        }

        return {
            success: true,
            data: available
        };
    }

    // Obtiene items comprados
    async getPurchasedItems(): Promise<ApiResponse<ShopItem[]>> {
        await this.delay();

        const purchased = this.items.filter(item => item.isPurchased);
        return {
            success: true,
            data: purchased
        };
    }

    // Obtiene un item específico
    async getItemById(id: string): Promise<ApiResponse<ShopItem | null>> {
        await this.delay();

        const item = this.items.find(item => item.id === id);
        return {
            success: true,
            data: item || null
        };
    }

    // Compra un item (solo valida puntos)
    async purchaseItem(
        itemId: string,
        userPoints: number
    ): Promise<ApiResponse<{ success: boolean; newPoints: number }>> {
        await this.delay();

        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            return {
                success: false,
                data: { success: false, newPoints: userPoints },
                error: 'Item no encontrado'
            };
        }

        const item = this.items[itemIndex];

        if (item.isPurchased) {
            return {
                success: false,
                data: { success: false, newPoints: userPoints },
                error: 'Item ya comprado'
            };
        }

        if (userPoints < item.price) {
            return {
                success: false,
                data: { success: false, newPoints: userPoints },
                error: 'Puntos insuficientes'
            };
        }

        // Realizar compra
        this.items[itemIndex].isPurchased = true;
        const newPoints = userPoints - item.price;

        // Guardar compra
        this.savePurchase(itemId);

        return {
            success: true,
            data: { success: true, newPoints }
        };
    }

    // Obtiene estadísticas de la tienda
    async getShopStats(): Promise<ApiResponse<any>> {
        await this.delay();

        const total = this.items.length;
        const purchased = this.items.filter(item => item.isPurchased).length;
        const totalSpent = this.items
            .filter(item => item.isPurchased)
            .reduce((sum, item) => sum + item.price, 0);

        return {
            success: true,
            data: {
                totalItems: total,
                purchasedItems: purchased,
                totalSpent,
                completionRate: Math.round((purchased / total) * 100)
            }
        };
    }
}

export const shopService = new ShopService();