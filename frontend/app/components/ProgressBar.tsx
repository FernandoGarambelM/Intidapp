"use client";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  contractAddress: string;
}

export default function ProgressBar({ contractAddress }: ProgressBarProps) {
  const { address } = useAccount();
  const [progress, setProgress] = useState({ missions: [], totalPoints: 0 });

  // Validar si el contrato está configurado
  const isValidContract = contractAddress && contractAddress !== "0x0000000000000000000000000000000000000000000000000000000000000000";

  useEffect(() => {
    if (address && !isValidContract) {
      // Leer progreso desde localStorage en modo simulación
      const storageKey = `intidapp_progress_${address}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    }
  }, [address, isValidContract]);

  if (!address) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        Conecta tu wallet para ver tu progreso
      </div>
    );
  }

  if (!isValidContract) {
    // MODO SIMULACIÓN
    const totalMissions = 4; // Número total de misiones
    const completedMissions = progress.missions.length;
    const percentage = (completedMissions / totalMissions) * 100;

    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-lg border-2 border-orange-200">
        <div className="flex justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Tu Progreso (Simulación)</h3>
            <p className="text-xs text-orange-600">Sin contrato desplegado</p>
          </div>
          <span className="text-2xl font-bold text-purple-600">{progress.totalPoints} pts</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-6 mb-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-500 flex items-center justify-end px-2"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 10 && (
              <span className="text-white text-xs font-bold">{Math.round(percentage)}%</span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {completedMissions}/{totalMissions} misiones completadas
        </p>
      </div>
    );
  }

  // MODO BLOCKCHAIN (cuando esté desplegado el contrato)
  return (
    <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-lg text-center text-yellow-800">
      <p className="font-bold mb-2">⚠️ Contrato no desplegado</p>
      <p className="text-sm">Despliega el contrato siguiendo las instrucciones en PASOS_SIGUIENTES.md</p>
    </div>
  );
}
