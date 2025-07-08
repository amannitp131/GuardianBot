'use client';

import { useState } from 'react';
import ConnectButton from '../ConnectButton';

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  // Mock connection for demo - replace with actual wallet connection logic
  const handleConnect = () => {
    setIsConnected(true);
    setAddress('0x1234...5678');
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress('');
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-slate-800 px-3 py-2 rounded-lg">
          <p className="text-sm text-gray-300">Connected</p>
          <p className="text-xs font-mono text-white">
            {address}
          </p>
        </div>
        <button 
          onClick={handleDisconnect}
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-sm transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <ConnectButton />
      {/* Demo connect button for testing */}
      <button 
        onClick={handleConnect}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
      >
        Connect Wallet
      </button>
    </div>
  );
}