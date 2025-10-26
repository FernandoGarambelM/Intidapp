"use client";
import { useAccountContext } from "./AccountProvider";
import LoginScreen from "./LoginScreen";
import Navbar from "./Navbar";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected, isConnecting, isDisconnecting } = useAccountContext();

  // Mostrar pantalla de carga durante desconexión
  if (isDisconnecting) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🚪 Cerrando sesión
            </h2>
            <p className="text-gray-600">Desconectando tu wallet...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}