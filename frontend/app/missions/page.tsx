"use client";
import { useState } from "react";
import Link from "next/link";
import { useAccountContext } from "../components/AccountProvider";
import { useSimpleMissions, useSimpleMissionStats } from "../hooks/useSimpleMissions";

export default function MissionsPage() {
  const { shortAddress } = useAccountContext();
  const { missions, loading } = useSimpleMissions();
  const { stats, loading: statsLoading } = useSimpleMissionStats();



  if (loading || statsLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600">Cargando misiones...</span>
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
            📚 Todas las Misiones
          </h1>
          <p className="text-gray-600">
            Completa misiones para ganar puntos y desbloquear recompensas
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Tu Progreso</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600">{stats.completedMissions}</div>
                <div className="text-green-700">Completadas</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600">{stats.totalPoints}</div>
                <div className="text-purple-700">Puntos Totales</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">{stats.totalMissions}</div>
                <div className="text-blue-700">Total Misiones</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600">{stats.completionRate}%</div>
                <div className="text-orange-700">Progreso</div>
              </div>
            </div>
          </div>
        )}



        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`bg-white p-6 rounded-2xl shadow-lg border-2 transition-all ${(mission as any).isCompleted
                ? 'border-green-200 bg-green-50'
                : 'border-purple-200 hover:border-purple-400'
                }`}
            >
              {/* Mission Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 flex-1">
                    {mission.title}
                  </h3>
                  {(mission as any).isCompleted && (
                    <span className="text-green-500 text-xl">✅</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {mission.description}
                </p>
              </div>

              {/* Mission Details */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    💰 {mission.points} puntos
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    📚 {mission.steps.length} pasos
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                {(mission as any).isCompleted ? (
                  <div className="flex gap-2">
                    <div className="flex-1 text-center py-3 bg-green-100 text-green-700 rounded-lg font-semibold">
                      ✅ Completada
                    </div>
                    <Link
                      href={`/missions/${mission.id}`}
                      className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
                    >
                      👁️ Ver
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/missions/${mission.id}`}
                    className="w-full block text-center bg-linear-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition"
                  >
                    📖 Ingresar a la Misión
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}