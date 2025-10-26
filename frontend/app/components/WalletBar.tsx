"use client";
import { useConnect, useDisconnect, useAccount } from "@starknet-react/core";

export default function WalletBar() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-4">
        🌟 IntiDapp - Ilumina tu Futuro
      </h2>
      
      {/* Debug info */}
      <div className="text-xs text-white opacity-60 mb-2">
        Estado: {status} | Dirección: {address ? "Sí" : "No"} | Conectores: {connectors.length}
      </div>
      
      {!address ? (
        <div className="space-y-3">
          <p className="text-white mb-3">
            Conecta tu wallet para comenzar tu viaje de aprendizaje
          </p>
          <div className="flex flex-col gap-3">
            {connectors.length > 0 ? (
              connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition shadow-md"
                >
                  Conectar {connector.name || connector.id}
                </button>
              ))
            ) : (
              <div className="text-white text-sm">
                <p className="mb-2">⚠️ No se detectaron wallets instaladas</p>
                <p className="text-xs opacity-80">
                  Instala ArgentX o Braavos para continuar
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-white">
              <p className="text-sm opacity-80">✅ Conectado como:</p>
              <p className="font-mono font-bold text-lg">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
            <button
              onClick={() => disconnect()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
            >
              Desconectar
            </button>
          </div>
          
          {/* Botón de emergencia para resetear */}
          <button
            onClick={() => {
              disconnect();
              // Forzar limpieza del localStorage
              if (typeof window !== 'undefined') {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="w-full bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600 transition"
          >
            🔄 Resetear Conexión (si hay problemas)
          </button>
        </div>
      )}
    </div>
  );
}
