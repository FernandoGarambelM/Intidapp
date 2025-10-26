"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";

interface AccountContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnecting: boolean;
  connect: (connectorId: string) => void;
  disconnect: () => void;
  shortAddress: string | undefined;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { connect: starknetConnect, connectors } = useConnect();
  const { disconnect: starknetDisconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const connect = async (connectorId: string) => {
    setIsConnecting(true);
    try {
      const connector = connectors.find(c => c.id === connectorId);
      if (connector) {
        // Limpiar cualquier conexión previa
        await starknetDisconnect();

        // Pequeña pausa para asegurar desconexión completa
        await new Promise(resolve => setTimeout(resolve, 100));

        // Conectar con el nuevo conector
        await starknetConnect({ connector });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    setIsDisconnecting(true);
    try {
      // Desconectar de Starknet
      await starknetDisconnect();

      // Limpiar localStorage relacionado con la sesión
      if (address) {
        // Mantener los datos del usuario pero limpiar la sesión activa
        localStorage.removeItem('starknet-last-wallet');
        localStorage.removeItem('wallet-connect-session');
      }

      // Forzar recarga de conectores para que pida selección de wallet
      window.location.reload();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    } finally {
      setIsDisconnecting(false);
    }
  };

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : undefined;

  const value: AccountContextType = {
    address,
    isConnected: isConnected ?? false,
    isConnecting,
    isDisconnecting,
    connect,
    disconnect,
    shortAddress,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
}