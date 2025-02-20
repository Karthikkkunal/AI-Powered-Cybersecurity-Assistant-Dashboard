import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function Terminal({ isVisible, onClose }: TerminalProps) {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const command = currentCommand.trim();
      
      // Add command to history
      setCommandHistory(prev => [...prev, `$ ${command}`]);
      
      // Simulate command output
      let output = '';
      switch (command.toLowerCase()) {
        case 'help':
          output = `Available commands:
- scan: Run a security scan
- clear: Clear terminal
- help: Show this help message
- status: Show system status`;
          break;
        case 'scan':
          output = 'Initiating security scan...\nScanning ports...\nChecking vulnerabilities...\nScan complete.';
          break;
        case 'clear':
          setCommandHistory([]);
          setCurrentCommand('');
          return;
        case 'status':
          output = 'System Status: Online\nCPU Usage: 45%\nMemory: 62%\nActive Scans: 1';
          break;
        default:
          output = `Command not found: ${command}. Type 'help' for available commands.`;
      }
      
      setCommandHistory(prev => [...prev, output]);
      setCurrentCommand('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[600px] h-[400px] bg-gray-900 rounded-lg shadow-xl overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <TerminalIcon className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-white font-mono">Security Terminal</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>
      
      <div
        ref={terminalRef}
        className="h-[calc(100%-40px)] overflow-y-auto p-4 font-mono text-sm"
      >
        <div className="text-green-500 mb-4">
          Welcome to CSAA Security Terminal v1.0.0
          Type 'help' for available commands.
        </div>
        
        {commandHistory.map((line, i) => (
          <div
            key={i}
            className={`mb-1 ${
              line.startsWith('$') ? 'text-blue-400' : 'text-gray-300'
            }`}
          >
            {line}
          </div>
        ))}
        
        <div className="flex items-center text-white">
          <span className="text-green-500 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}