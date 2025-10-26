"use client";
import { useConnect } from "@starknet-react/core";
import { useAccountContext } from "./AccountProvider";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoginScreen() {
    const { connectors } = useConnect();
    const { connect, isConnecting } = useAccountContext();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Limpiar cualquier conexión previa al mostrar login
        localStorage.removeItem('starknet-last-wallet');
        localStorage.removeItem('wallet-connect-session');

        const timer = setTimeout(() => {
            setIsReady(true);
        }, 800); // Tiempo más largo para asegurar limpieza
        return () => clearTimeout(timer);
    }, []);

    if (!isReady) {
        return (
            <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Image
                                src="/logo.png"
                                alt="IntiDapp Logo"
                                width={32}
                                height={32}
                                className="rounded"
                            />
                            <h2 className="text-2xl font-bold text-gray-800">
                                IntiDapp
                            </h2>
                        </div>
                        <p className="text-gray-600">Detectando wallets...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Image
                            src="/logo.png"
                            alt="IntiDapp Logo"
                            width={48}
                            height={48}
                            className="rounded"
                        />
                        <h1 className="text-3xl font-bold text-gray-800">
                            IntiDapp
                        </h1>
                    </div>
                    <p className="text-lg text-purple-600 font-semibold mb-2">
                        Ilumina tu Futuro
                    </p>
                    <p className="text-gray-600">
                        Plataforma educativa gamificada para aprender blockchain
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                        Conecta tu Wallet
                    </h2>

                    {connectors.length > 0 ? (
                        connectors.map((connector) => (
                            <button
                                key={connector.id}
                                onClick={() => {
                                    // Forzar que la extensión pida selección de wallet
                                    connect(connector.id);
                                }}
                                disabled={isConnecting}
                                className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isConnecting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Conectando...
                                    </>
                                ) : (
                                    <>
                                        {connector.id === "argentX" && "🦊"}
                                        {connector.id === "braavos" && "🛡️"}
                                        {connector.name === "Argent X" && "🦊"}
                                        {connector.name === "Braavos" && "🛡️"}
                                        Conectar con {connector.name || connector.id}
                                    </>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Image
                                    src="/logo.png"
                                    alt="IntiDapp Logo"
                                    width={24}
                                    height={24}
                                    className="rounded"
                                />
                                <p className="text-yellow-800 font-semibold">
                                    No se detectaron wallets
                                </p>
                            </div>
                            <p className="text-yellow-700 text-sm mb-4">
                                Para usar IntiDapp necesitas instalar una wallet compatible:
                            </p>
                            <div className="space-y-2">
                                <a
                                    href="https://www.argent.xyz/argent-x/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                >
                                    <Image
                                        src="/logo.png"
                                        alt="IntiDapp Logo"
                                        width={20}
                                        height={20}
                                        className="rounded"
                                    />
                                    Instalar Argent X
                                </a>
                                <a
                                    href="https://braavos.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                                >
                                    <Image
                                        src="/logo.png"
                                        alt="IntiDapp Logo"
                                        width={20}
                                        height={20}
                                        className="rounded"
                                    />
                                    Instalar Braavos
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Image
                            src="/logo.png"
                            alt="IntiDapp Logo"
                            width={16}
                            height={16}
                            className="rounded"
                        />
                        <p>Conexión segura con Starknet</p>
                    </div>
                    <p>Tus claves privadas nunca salen de tu wallet</p>
                </div>
            </div>
        </div>
    );
}