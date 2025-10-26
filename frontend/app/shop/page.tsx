"use client";
import { useRouter } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";

interface ShopItem {
  id: number;
  name: string;
  emoji: string;
  category: string;
  price: number;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const shopItems: ShopItem[] = [
  // Avatares
  { id: 1, name: "Avatar Guerrero Inca", emoji: "⚔️", category: "avatar", price: 50, description: "Guerrero ancestral de los Andes", rarity: 'rare' },
  { id: 2, name: "Avatar Cóndor Andino", emoji: "🦅", category: "avatar", price: 75, description: "Espíritu libre de las montañas", rarity: 'epic' },
  { id: 3, name: "Avatar Jaguar Maya", emoji: "🐆", category: "avatar", price: 100, description: "Guardián sagrado de la selva", rarity: 'legendary' },
  
  // Insignias
  { id: 4, name: "Explorador Blockchain", emoji: "🔍", category: "badge", price: 30, description: "Has comenzado tu viaje", rarity: 'common' },
  { id: 5, name: "Maestro NFT", emoji: "💎", category: "badge", price: 50, description: "Dominas el arte digital", rarity: 'rare' },
  { id: 6, name: "DeFi Expert", emoji: "📈", category: "badge", price: 80, description: "Experto en finanzas descentralizadas", rarity: 'epic' },
  
  // Marcos
  { id: 7, name: "Marco Dorado", emoji: "🟡", category: "frame", price: 40, description: "Elegancia dorada", rarity: 'common' },
  { id: 8, name: "Marco Diamante", emoji: "💠", category: "frame", price: 60, description: "Brillo de diamante", rarity: 'rare' },
  { id: 9, name: "Marco Arcoíris", emoji: "🌈", category: "frame", price: 50, description: "Colores vibrantes", rarity: 'rare' },
  
  // Efectos
  { id: 10, name: "Efecto Fuego", emoji: "🔥", category: "effect", price: 70, description: "Llamas ardientes", rarity: 'epic' },
  { id: 11, name: "Efecto Estrellas", emoji: "✨", category: "effect", price: 80, description: "Brillo celestial", rarity: 'epic' },
  { id: 12, name: "Partículas Brillantes", emoji: "⭐", category: "effect", price: 120, description: "Resplandor mágico", rarity: 'legendary' },
  
  // Beneficios
  { id: 13, name: "Descuento Gas 10%", emoji: "⛽", category: "benefit", price: 100, description: "Ahorra en transacciones", rarity: 'rare' },
  { id: 14, name: "Acceso Anticipado", emoji: "🎫", category: "benefit", price: 150, description: "Nuevas misiones primero", rarity: 'epic' },
  { id: 15, name: "Multiplicador x2", emoji: "⚡", category: "benefit", price: 200, description: "Dobla tus puntos", rarity: 'legendary' },
  
  // Certificados
  { id: 16, name: "Blockchain Graduate", emoji: "🎓", category: "certificate", price: 150, description: "Certificado oficial", rarity: 'epic' },
  { id: 17, name: "NFT de Logro", emoji: "🏆", category: "certificate", price: 300, description: "NFT único de logro", rarity: 'legendary' },
];

const categories = [
  { id: 'all', name: 'Todos', emoji: '🌟' },
  { id: 'avatar', name: 'Avatares', emoji: '🎨' },
  { id: 'badge', name: 'Insignias', emoji: '🏆' },
  { id: 'frame', name: 'Marcos', emoji: '🎭' },
  { id: 'effect', name: 'Efectos', emoji: '✨' },
  { id: 'benefit', name: 'Beneficios', emoji: '🎁' },
  { id: 'certificate', name: 'Certificados', emoji: '🎓' },
];

const rarityColors = {
  common: 'border-gray-400 bg-gray-50',
  rare: 'border-blue-400 bg-blue-50',
  epic: 'border-purple-400 bg-purple-50',
  legendary: 'border-yellow-400 bg-yellow-50'
};

const rarityLabels = {
  common: 'Común',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Legendario'
};

export default function ShopPage() {
  const router = useRouter();
  const { address } = useAccount();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    if (!address) {
      alert("⚠️ Conecta tu wallet primero");
      return;
    }
    
    setSelectedItem(item);
    setShowPurchaseModal(true);
    
    // Simular compra después de 2 segundos
    setTimeout(() => {
      setShowPurchaseModal(false);
      alert(`🎉 ¡Has canjeado "${item.name}"!\n(Funcionalidad visual - no se descontaron puntos)`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-white hover:text-yellow-100 font-semibold transition"
            >
              <span className="text-2xl">←</span>
              <span className="hidden sm:inline">Volver a Inicio</span>
            </button>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              🛍️ Tienda de Recompensas
            </h1>

            <div className="flex items-center gap-2">
              {address ? (
                <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
              ) : (
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white text-sm font-medium">
                    Sin wallet
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Info Banner */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-8">
          <p className="text-blue-800 text-center">
            ℹ️ <strong>Modo Vista Previa:</strong> Esta es una demostración visual. No se descontarán puntos reales al "comprar" items.
          </p>
        </div>

        {/* Categorías */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-purple-200'
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-lg p-6 border-2 ${rarityColors[item.rarity]} hover:scale-105 transition-transform`}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  {rarityLabels[item.rarity]}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 text-center h-10">
                {item.description}
              </p>

              <div className="flex flex-col gap-3">
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 text-center">
                  <span className="text-yellow-800 font-bold text-lg">
                    💰 {item.price} pts
                  </span>
                </div>

                <button
                  onClick={() => handlePurchase(item)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition"
                >
                  Canjear
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No hay items en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal de Compra */}
      {showPurchaseModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center transform animate-bounce-in shadow-2xl">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Canjeando...
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-bold text-purple-600">{selectedItem.name}</span>
            </p>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
}
