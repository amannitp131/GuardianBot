'use client';

import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  method: string;
  to: string;
  value: string;
  gasUsed: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  riskScore: number;
}

export default function TransactionMonitor() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading transactions
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        method: 'Transfer',
        to: '0xabcd...1234',
        value: '0.5',
        gasUsed: '21000',
        status: 'success',
        timestamp: new Date().toISOString(),
        riskScore: 15,
      },
      {
        id: '2',
        method: 'Approve',
        to: '0xef12...5678',
        value: '1000',
        gasUsed: '46000',
        status: 'pending',
        timestamp: new Date().toISOString(),
        riskScore: 75,
      },
      {
        id: '3',
        method: 'Swap',
        to: '0x9876...abcd',
        value: '2.3',
        gasUsed: '180000',
        status: 'success',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        riskScore: 25,
      },
    ];

    setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'failed':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Transaction Monitor</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Live</span>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading transactions...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No recent transactions</p>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="bg-slate-700 rounded-lg p-3 border border-slate-600">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-white font-medium">{tx.method}</p>
                      <p className="text-gray-400 text-sm font-mono">{tx.to}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                      <span className={`text-xs font-semibold ${getRiskColor(tx.riskScore)}`}>
                        Risk: {tx.riskScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Value:</span>
                      <span className="text-white ml-1">{tx.value} BDAG</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Gas:</span>
                      <span className="text-white ml-1">{tx.gasUsed}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-400">
                    {new Date(tx.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}