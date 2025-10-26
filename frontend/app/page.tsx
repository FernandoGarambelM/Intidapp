"use client";
import MissionCard from "./components/MissionCard";
import ProgressBar from "./components/ProgressBar";
import Link from "next/link";
import { useAccountContext } from "./components/AccountProvider";
import { useSimpleMissions, useSimpleMissionStats } from "./hooks/useSimpleMissions";
import { usePoints } from "./hooks/usePoints";

// ⚠️ NOTA: Por ahora usamos una dirección temporal
// Después del despliegue, reemplazarás esto con la dirección real del contrato
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

export default function Home() {
  const { shortAddress } = useAccountContext();
  const { missions, loading: missionsLoading } = useSimpleMissions();
  const { stats, loading: statsLoading } = useSimpleMissionStats();
  const { points } = usePoints();

  // Mostrar solo las primeras 4 misiones disponibles en la página principal
  const featuredMissions = missions.filter(m => !(m as any).isCompleted).slice(0, 4);

  if (missionsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600">Cargando tu progreso...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Bienvenido de vuelta! 👋
          </h1>
          <p className="text-gray-600 mb-4">
            Conectado como <span className="font-mono font-semibold text-purple-600">{shortAddress}</span>
          </p>
          
          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{points}</div>
                <div className="text-sm text-purple-700">Puntos</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completedMissions}</div>
                <div className="text-sm text-green-700">Completadas</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalMissions}</div>
                <div className="text-sm text-blue-700">Total Misiones</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.completionRate}%</div>
                <div className="text-sm text-orange-700">Progreso</div>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar contractAddress={CONTRACT_ADDRESS} />
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/missions"
            className="bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
          >
            📚 Todas las Misiones
          </Link>
          <Link
            href="/shop"
            className="bg-linear-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center gap-2"
          >
            🛍️ Tienda de Recompensas
          </Link>
          <Link
            href="/profile"
            className="bg-linear-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-green-500 hover:to-blue-600 transition-all flex items-center gap-2"
          >
            👤 Mi Perfil
          </Link>
        </div>

        {/* Featured Missions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              🚀 Misiones Destacadas
            </h2>
            <Link
              href="/missions"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Ver todas →
            </Link>
          </div>
          
          {featuredMissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  id={mission.id}
                  title={mission.title}
                  description={mission.description}
                  points={mission.points}
                  contractAddress={CONTRACT_ADDRESS}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Felicitaciones!
              </h3>
              <p className="text-gray-600">
                Has completado todas las misiones disponibles. ¡Sigue atento a nuevas misiones!
              </p>
            </div>
          )}
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
