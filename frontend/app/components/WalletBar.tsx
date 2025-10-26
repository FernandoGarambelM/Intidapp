"use client";
import { useConnect, useDisconnect, useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";

export default function WalletBar() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [isReady, setIsReady] = useState(false);

  // Esperar a que el componente esté completamente montado y las extensiones se carguen
  useEffect(() => {
    // Delay más largo para dar tiempo a las extensiones a inyectarse
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Log para debugging
  useEffect(() => {
    if (isReady) {
      console.log('Conectores detectados:', connectors.length);
      console.log('Lista de conectores:', connectors.map(c => c.id || c.name));
      console.log('window.starknet existe:', !!(window as any).starknet);
    }
  }, [isReady, connectors]);

  if (!isReady) {
    return (
      <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 rounded-lg shadow-xl">
        <h2 className="text-white text-2xl font-bold mb-4">
          🌟 IntiDapp - Ilumina tu Futuro
        </h2>
        <p className="text-white">Detectando wallets...</p>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 rounded-lg shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-4">
        🌟 IntiDapp - Ilumina tu Futuro
      </h2>

      {!address ? (
        <div className="space-y-3">
          <p className="text-white mb-3">
            Conecta tu wallet para comenzar tu viaje de aprendizaje
          </p>
          {connectors.length > 0 ? (
            connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
              >
                Conectar {connector.name || connector.id}
              </button>
            ))
          ) : (
            <div className="text-white">
              <p className="mb-2">⚠️ No se detectaron wallets</p>
              <p className="text-sm opacity-80">Instala ArgentX o Braavos para continuar</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="text-white">
            <p className="text-sm opacity-80">Conectado como:</p>
            <p className="font-mono font-bold">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Desconectar
          </button>
        </div>
      )}
    </div>
  );
}
