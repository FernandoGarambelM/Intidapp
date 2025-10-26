"use client";
import { useAccountContext } from "./AccountProvider";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { shortAddress, disconnect, address, isDisconnecting } = useAccountContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="IntiDapp Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold text-gray-800">IntiDapp</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-purple-600 font-medium transition"
            >
              🏠 Inicio
            </Link>
            <Link
              href="/missions"
              className="text-gray-600 hover:text-purple-600 font-medium transition"
            >
              📚 Misiones
            </Link>
            <Link
              href="/shop"
              className="text-gray-600 hover:text-purple-600 font-medium transition"
            >
              🛍️ Tienda
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-purple-600 font-medium transition"
            >
              👤 Perfil
            </Link>
          </div>

          {/* Account Info */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
            >
              <span className="text-sm">💎</span>
              <span className="font-mono text-sm">{shortAddress}</span>
              <span className="text-xs">▼</span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Dirección completa:</p>
                  <p className="font-mono text-xs text-gray-800 break-all">
                    {address}
                  </p>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(address || "");
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    📋 Copiar dirección
                  </button>

                  <Link
                    href="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    👤 Ver perfil
                  </Link>

                  <hr className="my-2" />

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowDisconnectModal(true);
                    }}
                    disabled={isDisconnecting}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2 disabled:opacity-50"
                  >
                    🚪 Desconectar wallet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex justify-around">
            <Link
              href="/"
              className="text-gray-600 hover:text-purple-600 text-sm font-medium"
            >
              🏠 Inicio
            </Link>
            <Link
              href="/missions"
              className="text-gray-600 hover:text-purple-600 text-sm font-medium"
            >
              📚 Misiones
            </Link>
            <Link
              href="/shop"
              className="text-gray-600 hover:text-purple-600 text-sm font-medium"
            >
              🛍️ Tienda
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-purple-600 text-sm font-medium"
            >
              👤 Perfil
            </Link>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}

      {/* Modal de confirmación de desconexión */}
      {showDisconnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🚪</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ¿Cerrar sesión?
              </h2>
              <p className="text-gray-600">
                Se desconectará tu wallet y tendrás que volver a conectarla para acceder a IntiDapp.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tu progreso y puntos se mantendrán seguros.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDisconnectModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowDisconnectModal(false);
                  disconnect();
                }}
                disabled={isDisconnecting}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDisconnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Desconectando...
                  </>
                ) : (
                  "Desconectar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}