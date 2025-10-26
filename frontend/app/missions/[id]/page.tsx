"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import { getMissionById } from "../../lib/missionsData";
import MissionSteps from "../../components/MissionSteps";

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { address } = useAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const missionId = Number(params.id);
  const mission = getMissionById(missionId);

  useEffect(() => {
    if (!mission) {
      router.push('/');
    }
  }, [mission, router]);

  if (!mission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Misión no encontrada</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < mission.steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteMission = () => {
    if (!address) {
      alert("⚠️ Conecta tu wallet primero");
      return;
    }

    // Verificar si ya completó esta misión
    const storageKey = `intidapp_progress_${address}`;
    const currentProgress = JSON.parse(localStorage.getItem(storageKey) || '{"missions": [], "totalPoints": 0}');
    
    if (currentProgress.missions.includes(missionId)) {
      alert("⚠️ Ya completaste esta misión");
      return;
    }

    // Registrar misión completada
    currentProgress.missions.push(missionId);
    currentProgress.totalPoints += mission.points;
    localStorage.setItem(storageKey, JSON.stringify(currentProgress));
    
    // Mostrar modal de éxito
    setShowCompletionModal(true);
    
    // Disparar evento personalizado para actualizar el progreso
    window.dispatchEvent(new Event('missionCompleted'));

    // Redirigir después de 3 segundos
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const currentStepData = mission.steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Header Mejorado */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-white hover:text-purple-100 font-semibold transition"
            >
              <span className="text-2xl">←</span>
              <span className="hidden sm:inline">Volver a Inicio</span>
            </button>
            
            <div className="flex items-center gap-4">
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
                    Sin wallet conectada
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header de la Misión */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <span className="text-5xl">{mission.emoji}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {mission.title}
              </h1>
              <p className="text-gray-600 mb-3">{mission.description}</p>
              <div className="flex items-center gap-4">
                <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold">
                  🏆 Recompensa: {mission.points} puntos
                </span>
                <span className="text-gray-500 text-sm">
                  {mission.steps.length} pasos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pasos de la Misión */}
        <MissionSteps
          step={currentStepData}
          currentStep={currentStep}
          totalSteps={mission.steps.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        {/* Botón de Completar (solo visible en el último paso) */}
        {currentStep === mission.steps.length && (
          <div className="mt-8">
            <button
              onClick={handleCompleteMission}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition shadow-lg"
            >
              🎉 Completar Misión y Reclamar {mission.points} Puntos
            </button>
          </div>
        )}
      </div>

      {/* Modal de Éxito */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center transform animate-bounce-in shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Felicidades!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Has completado la misión
              <br />
              <span className="font-bold text-purple-600">{mission.title}</span>
            </p>
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6">
              <p className="text-2xl font-bold text-yellow-800">
                +{mission.points} puntos
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Redirigiendo al inicio...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
