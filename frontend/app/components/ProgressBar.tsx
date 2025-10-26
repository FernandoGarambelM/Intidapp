"use client";
import { useAccount } from "@starknet-react/core";

interface ProgressBarProps {
  contractAddress: string;
}

export default function ProgressBar({ contractAddress }: ProgressBarProps) {
  const { address } = useAccount();

  // Validar si el contrato está configurado
  const isValidContract = contractAddress && contractAddress !== "0x0000000000000000000000000000000000000000000000000000000000000000";

  if (!address) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        Conecta tu wallet para ver tu progreso
      </div>
    );
  }

  if (!isValidContract) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-lg text-center text-yellow-800">
        <p className="font-bold mb-2">⚠️ Contrato no desplegado</p>
        <p className="text-sm">Despliega el contrato siguiendo las instrucciones en PASOS_SIGUIENTES.md</p>
      </div>
    );
  }

  // Por ahora mostramos un mensaje de que el contrato está listo
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">Tu Progreso</h3>
        <span className="text-2xl font-bold text-purple-600">0 pts</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-6 mb-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-500 flex items-center justify-end px-2"
          style={{ width: "0%" }}
        >
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Completa misiones para ganar puntos
      </p>
    </div>
  );
}
