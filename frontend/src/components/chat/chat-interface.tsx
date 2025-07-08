'use client';

import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  riskScore?: number;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Hello! I\'m GuardianBot, your AI blockchain security assistant. I can help you analyze transactions, check smart contract safety, and explain blockchain interactions in plain English.',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you want to: "${input}". Let me analyze this for security risks and provide recommendations.`,
        timestamp: new Date().toISOString(),
        riskScore: Math.floor(Math.random() * 100),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);

    setInput('');
  };

  // const getRiskColor = (score: number) => {
  //   if (score < 30) return 'text-green-500';
  //   if (score < 70) return 'text-yellow-500';
  //   return 'text-red-500';
  // };

  return (
    <div className="bg-slate-800 rounded-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">GuardianBot</h3>
            <p className="text-green-400 text-sm">Online & Monitoring</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-gray-100'
            }`}>
              <p className="text-sm">{message.content}</p>
              
              {/* Risk Score Display */}
              {message.riskScore !== undefined && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs">Risk Score:</span>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    message.riskScore < 30 
                      ? 'bg-green-500 text-white' 
                      : message.riskScore < 70 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {message.riskScore}/100
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
            <span>GuardianBot is analyzing...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about any transaction or smart contract..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}