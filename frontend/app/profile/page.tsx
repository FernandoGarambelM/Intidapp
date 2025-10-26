"use client";
import { useAccountContext } from "../components/AccountProvider";

export default function ProfilePage() {
  const { address, shortAddress } = useAccountContext();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-linear-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-4">
              👤
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Información de tu cuenta en IntiDapp</p>
          </div>

          {/* Account Info */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📍 Información de Wallet
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Dirección corta:</label>
                  <p className="font-mono text-lg text-purple-600">{shortAddress}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Dirección completa:</label>
                  <p className="font-mono text-xs text-gray-800 break-all bg-white p-2 rounded border">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🏆 Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Misiones completadas:</span>
                  <span className="font-bold text-green-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Puntos totales:</span>
                  <span className="font-bold text-purple-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NFTs obtenidos:</span>
                  <span className="font-bold text-blue-600">0</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigator.clipboard.writeText(address || "")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              📋 Copiar Dirección
            </button>
            <button
              onClick={() => window.open(`https://sepolia.voyager.online/contract/${address}`, '_blank')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              🔍 Ver en Explorer
            </button>
          </div>

          {/* Coming Soon */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🚧 Próximamente
            </h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• Historial de misiones completadas</li>
              <li>• Galería de NFTs obtenidos</li>
              <li>• Ranking y logros</li>
              <li>• Configuración de perfil personalizada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}