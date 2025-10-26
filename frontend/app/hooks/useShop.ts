"use client";
import { useState, useEffect } from 'react';
import { ShopItem, ShopCategory, ItemRarity } from '../types';
import { shopService } from '../services/shopService';
import { pointsService } from '../services/pointsService';
import { useAccountContext } from '../components/AccountProvider';

export function useShop() {
  const { address } = useAccountContext();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(0);

  // Configurar los servicios cuando cambie la wallet
  useEffect(() => {
    if (address) {
      shopService.setUserWallet(address);
      pointsService.setUserWallet(address);
      loadItems();
      loadPoints();
    }
  }, [address]);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await shopService.getAllItems();
      if (response.success) {
        setItems(response.data);
      } else {
        setError(response.error || 'Error cargando tienda');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const loadPoints = () => {
    const points = pointsService.getUserPoints();
    setUserPoints(points);
  };

  const purchaseItem = async (itemId: string) => {
    try {
      const response = await shopService.purchaseItem(itemId, userPoints);
      
      if (response.success) {
        // Descontar puntos
        const result = pointsService.spendPoints(
          items.find(item => item.id === itemId)?.price || 0
        );
        
        if (result.success) {
          setUserPoints(result.newPoints);
          // Recargar items para actualizar el estado
          await loadItems();
          return { success: true, newPoints: result.newPoints };
        } else {
          throw new Error('Error al descontar puntos');
        }
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    items,
    loading,
    error,
    userPoints,
    purchaseItem,
    refetch: loadItems,
    refreshPoints: loadPoints
  };
}

export function useShopByCategory(category: ShopCategory) {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, [category]);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await shopService.getItemsByCategory(category);
      if (response.success) {
        setItems(response.data);
      } else {
        setError(response.error || 'Error cargando categoría');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    refetch: loadItems
  };
}

export function useAvailableShopItems() {
  const { address } = useAccountContext();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      shopService.setUserWallet(address);
      loadItems();
    }
  }, [address]);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await shopService.getAllItems();
      
      if (response.success) {
        // Filtrar solo items disponibles
        const availableItems = response.data.filter(item => !item.isPurchased);
        setItems(availableItems);
      } else {
        setError(response.error || 'Error cargando items disponibles');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    refetch: loadItems
  };
}

export function useShopStats() {
  const { address } = useAccountContext();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      shopService.setUserWallet(address);
      loadStats();
    }
  }, [address]);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await shopService.getShopStats();
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