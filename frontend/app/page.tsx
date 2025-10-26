"use client";
import dynamic from "next/dynamic";

// Componente de carga mientras se monta el WalletBar
const LoadingWallet = () => (
  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg shadow-xl">
    <h2 className="text-white text-2xl font-bold mb-4">
      🌟 IntiDapp - Ilumina tu Futuro
    </h2>
    <p className="text-white">Cargando wallets...</p>
  </div>
);

// Importar WalletBar solo en el cliente (sin SSR)
const WalletBar = dynamic(() => import("./components/WalletBar"), {
  ssr: false,
  loading: LoadingWallet,
});

import MissionCard from "./components/MissionCard";
import ProgressBar from "./components/ProgressBar";
import Link from "next/link";

// ⚠️ NOTA: Por ahora usamos una dirección temporal
// Después del despliegue, reemplazarás esto con la dirección real del contrato
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

export default function Home() {
  const missions = [
    {
      id: 1,
      title: "🔰 Bienvenido a Blockchain",
      description: "Aprende qué es una wallet y cómo funciona",
      points: 10,
    },
    {
      id: 2,
      title: "💎 Tu Primer NFT",
      description: "Descubre qué son los NFTs y por qué son únicos",
      points: 20,
    },
    {
      id: 3,
      title: "🤝 Smart Contracts 101",
      description: "Entiende cómo funcionan los contratos inteligentes",
      points: 30,
    },
    {
      id: 4,
      title: "🌐 Ethereum y Starknet",
      description: "Conoce la diferencia entre Layer 1 y Layer 2",
      points: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <WalletBar />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar contractAddress={CONTRACT_ADDRESS} />
        </div>

        {/* Botón Tienda */}
        <div className="mb-8 flex justify-end">
          <Link
            href="/shop"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center gap-2"
          >
            🛍️ Tienda de Recompensas
          </Link>
        </div>

        {/* Missions Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📚 Misiones Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                {...mission}
                contractAddress={CONTRACT_ADDRESS}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>🌟 IntiDapp - Iluminando el futuro de América Latina</p>
          <p className="text-sm mt-2">
            Construido con ❤️ usando Starknet y Next.js
          </p>
        </div>
      </div>
    </div>
  );
}
