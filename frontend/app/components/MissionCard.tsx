"use client";
import { useState } from "react";
import { useAccount } from "@starknet-react/core";
import { Contract } from "starknet";
import { CONTRACT_ABI } from "../lib/abi";
import Link from "next/link";

interface MissionProps {
  id: number;
  title: string;
  description: string;
  points: number;
  contractAddress: string;
}

export default function MissionCard({ 
  id, 
  title, 
  description, 
  points, 
  contractAddress 
}: MissionProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const { account, address } = useAccount();

  // Verificar si el contrato está desplegado
  const isContractDeployed = contractAddress && 
    contractAddress !== "0x0000000000000000000000000000000000000000000000000000000000000000";

  const handleComplete = async () => {
    if (!address) {
      alert("⚠️ Conecta tu wallet primero");
      return;
    }

    setIsCompleting(true);
    
    try {
      if (isContractDeployed && account) {
        // MODO BLOCKCHAIN: Interactuar con el contrato real
        const contract = new Contract(CONTRACT_ABI, contractAddress, account);
        const result = await contract.complete_mission(points);
        await account.waitForTransaction(result.transaction_hash);
        alert(`🎉 ¡Misión completada en blockchain! +${points} puntos`);
      } else {
        // MODO SIMULACIÓN: Usar servicio de puntos
        const storageKey = `intidapp_progress_${address}`;
        const currentProgress = JSON.parse(localStorage.getItem(storageKey) || '{"missions": [], "totalPoints": 0}');
        
        // Verificar si ya completó esta misión
        if (currentProgress.missions.includes(id)) {
          alert("⚠️ Ya completaste esta misión");
          setIsCompleting(false);
          return;
        }
        
        // Registrar misión completada
        currentProgress.missions.push(id);
        localStorage.setItem(storageKey, JSON.stringify(currentProgress));
        
        // Añadir puntos usando el servicio
        const { pointsService } = await import('../services/pointsService');
        pointsService.setUserWallet(address);
        pointsService.addPoints(points);
        
        alert(`🎉 ¡Misión completada! +${points} puntos`);
        
        // Disparar evento personalizado para actualizar el progreso
        window.dispatchEvent(new Event('missionCompleted'));
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al completar misión: " + (error as Error).message);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
          {points} pts
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      {!isContractDeployed && (
        <p className="text-sm text-orange-600 mb-2">
          {/* ℹ️ Modo simulación (sin contrato) */}
        </p>
      )}
      
      <div className="flex gap-3">
        <Link 
          href={`/missions/${id}`}
          className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition text-center"
        >
          📖 Ingresar a la Misión
        </Link>
      </div>
    </div>
  );
}
