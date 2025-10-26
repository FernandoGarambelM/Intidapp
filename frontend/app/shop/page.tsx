"use client";
import { useState } from "react";
import { useAccountContext } from "../components/AccountProvider";
import { useShop, useShopStats } from "../hooks/useShop";
import { useMissionStats } from "../hooks/useMissions";
import { ShopCategory, ItemRarity } from "../types";

export default function ShopPage() {
  const { shortAddress } = useAccountContext();
  const { items, loading, purchaseItem, userPoints } = useShop();
  const { stats: shopStats, loading: shopStatsLoading } = useShopStats();
  
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | 'all'>('all');
  const [selectedRarity, setSelectedRarity] = useState<ItemRarity | 'all'>('all');

  // Filtrar items
  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const rarityMatch = selectedRarity === 'all' || item.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const handlePurchase = async (itemId: string) => {
    try {
      const result = await purchaseItem(itemId);
      alert(`¡Compra exitosa! Te quedan ${result.newPoints} puntos`);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const getRarityColor = (rarity: ItemRarity) => {
    switch (rarity) {
      case ItemRarity.COMMON: return 'bg-gray-100 text-gray-700';
      case ItemRarity.RARE: return 'bg-blue-100 text-blue-700';
      case ItemRarity.EPIC: return 'bg-purple-100 text-purple-700';
      case ItemRarity.LEGENDARY: return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRarityIcon = (rarity: ItemRarity) => {
    switch (rarity) {
      case ItemRarity.COMMON: return '⚪';
      case ItemRarity.RARE: return '🔵';
      case ItemRarity.EPIC: return '🟣';
      case ItemRarity.LEGENDARY: return '🟡';
      default: return '⚪';
    }
  };

  if (loading || shopStatsLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600">Cargando tienda...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header con logo */}
        {/* <Header /> */}

        {/* Page Title */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🛍️ Tienda de Recompensas
          </h1>
          <p className="text-gray-600 mb-4">
            Canjea tus puntos por recompensas exclusivas
          </p>
          <div className="bg-purple-100 px-4 py-2 rounded-lg inline-block">
            <span className="text-purple-600 font-semibold">
              💰 Puntos disponibles: {userPoints}
            </span>
          </div>
        </div>

        {/* Shop Stats */}
        {/* {shopStats && (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estadísticas de Compras</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">{shopStats.totalItems}</div>
                <div className="text-blue-700">Items Totales</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600">{shopStats.purchasedItems}</div>
                <div className="text-green-700">Comprados</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600">{shopStats.totalSpent}</div>
                <div className="text-purple-700">Puntos Gastados</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600">{shopStats.completionRate}%</div>
                <div className="text-orange-700">Colección</div>
              </div>
            </div>
          </div>
        )} */}

        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔍 Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ShopCategory | 'all')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Todas las categorías</option>
                <option value={ShopCategory.CERTIFICATES}>🏆 Certificados</option>
                <option value={ShopCategory.NFTS}>🎨 NFTs</option>
                <option value={ShopCategory.AVATARS}>💎 Avatares</option>
                <option value={ShopCategory.PREMIUM}>🚀 Premium</option>
                <option value={ShopCategory.COLLECTIBLES}>🛡️ Coleccionables</option>
              </select>
            </div>

            {/* Rarity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rareza
              </label>
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value as ItemRarity | 'all')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Todas las rarezas</option>
                <option value={ItemRarity.COMMON}>⚪ Común</option>
                <option value={ItemRarity.RARE}>🔵 Raro</option>
                <option value={ItemRarity.EPIC}>🟣 Épico</option>
                <option value={ItemRarity.LEGENDARY}>🟡 Legendario</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white p-6 rounded-2xl shadow-lg border-2 transition-all ${
                item.isPurchased
                  ? 'border-green-200 bg-green-50'
                  : !item.isAvailable
                  ? 'border-gray-200 opacity-60'
                  : 'border-purple-200 hover:border-purple-400'
              }`}
            >
              {/* Item Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 flex-1">
                    {item.name}
                  </h3>
                  {item.isPurchased && (
                    <span className="text-green-500 text-xl">✅</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {item.description}
                </p>
              </div>

              {/* Item Details */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    💰 {item.price} puntos
                  </span>
                  <span className={`px-2 py-1 rounded capitalize text-sm ${getRarityColor(item.rarity)}`}>
                    {getRarityIcon(item.rarity)} {item.rarity}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                    📂 {item.category}
                  </span>
                </div>
              </div>

              {/* Requirements */}
              {item.requirements.length > 0 && (
                <div className="mb-4 text-sm text-gray-600">
                  <span className="font-medium">Requisitos:</span>
                  <div className="mt-1 space-y-1">
                    {item.requirements.map((req, index) => (
                      <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {req.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Long Description */}
              {item.longDescription && (
                <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {item.longDescription}
                </div>
              )}

              {/* Action Button */}
              <div className="mt-4">
                {item.isPurchased ? (
                  <div className="text-center py-3 bg-green-100 text-green-700 rounded-lg font-semibold">
                    ✅ Ya lo tienes
                  </div>
                ) : !item.isAvailable ? (
                  <div className="text-center py-3 bg-gray-100 text-gray-500 rounded-lg">
                    🔒 No disponible
                  </div>
                ) : userPoints < item.price ? (
                  <div className="text-center py-3 bg-red-100 text-red-600 rounded-lg">
                    💸 Puntos insuficientes
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(item.id)}
                    className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition"
                  >
                    🎁 Canjear por {item.price} puntos
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No items found */}
        {filteredItems.length === 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron items
            </h3>
            <p className="text-gray-600">
              Intenta cambiar los filtros para ver más productos.
            </p>
          </div>
        )}

        {/* Info */}
        <div className="mt-12 bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">
            💡 ¿Cómo ganar puntos?
          </h2>
          <ul className="text-yellow-700 space-y-1">
            <li>• Completa misiones educativas</li>
            <li>• Participa en desafíos especiales</li>
            <li>• Invita amigos a la plataforma</li>
            <li>• Mantén una racha de aprendizaje diario</li>
          </ul>
        </div>
      </div>
    </div>
  );
}