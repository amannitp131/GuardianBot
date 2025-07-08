'use client';

import ChatInterface from '../components/chat/chat-interface';
import WalletConnect from '../components/wallet/transaction-monitor';
import TransactionMonitor from '../components/wallet/wallet-connect';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">GuardianBot</h1>
              <p className="text-gray-300">AI-Powered Blockchain Security</p>
            </div>
          </div>
          <WalletConnect />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

          {/* Transaction Monitor */}
          <div className="lg:col-span-1">
            {isConnected ? (
              <TransactionMonitor />
            ) : (
              <div className="bg-slate-800 rounded-lg p-6 text-center">
                <p className="text-gray-400">Connect your wallet to monitor transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}