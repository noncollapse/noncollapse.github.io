import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from './types';
import { 
  AboutSection, 
  PubsSection, 
  PreprintsSection, 
  TalksSection, 
  TeachingsSection,
  HelpSection 
} from './components/CommandOutput';
import { Terminal as TerminalIcon, Battery, Wifi, Cpu, X, Minus, Square } from 'lucide-react';

const App: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [bootSequence, setBootSequence] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootInitialized = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, bootSequence]);

  // Focus input on click
  useEffect(() => {
    const handleGlobalClick = () => {
        if (!window.getSelection()?.toString()) {
             inputRef.current?.focus();
        }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Boot sequence effect
  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (bootInitialized.current) return;
    bootInitialized.current = true;

    const bootSteps = [
      "INITIALIZING KERNEL...",
      "WELCOME TO Kai Ye's RESEARCH STATION",
      "Connect k.ye1@lse.ac.uk for collaboration inquiries.",
    ];

    let delay = 0;
    bootSteps.forEach((step, index) => {
      delay += Math.random() * 500 + 300;
      setTimeout(() => {
        setHistory(prev => [...prev, {
          id: `boot-${index}`,
          type: 'system',
          content: <div className="text-gray-500">{`[BOOT] ${step}`}</div>
        }]);
        if (index === bootSteps.length - 1) {
            setBootSequence(false);
            setHistory(prev => [...prev, {
                id: 'init-help',
                type: 'system',
                content: (
                  <div className="mt-4 text-pink-400">
                    Type <span className="text-white font-bold">help</span> or <span className="text-white font-bold">'enter'</span> to view commands, or <a href="/legacy/" className="text-pink-300 underline hover:text-pink-100 transition-colors">click here</a> to enter Graphical User Interface.
                  </div>
                )
            }]);
        }
      }, delay);
    });
  }, []);

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newHistoryItem: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: 'input',
      content: cleanCmd
    };

    setHistory(prev => [...prev, newHistoryItem]);
    setInput('');

    switch (cleanCmd) {
      case 'help':
      case '':
        setHistory(prev => [...prev, { id: `res-${Date.now()}`, type: 'component', content: <HelpSection /> }]);
        break;
      case 'about':
        setHistory(prev => [...prev, { id: `res-${Date.now()}`, type: 'component', content: <AboutSection /> }]);
        break;
      case 'pubs':
      case 'publications':
      case 'papers': // keep papers as alias just in case
        setHistory(prev => [...prev, { id: `res-${Date.now()}`, type: 'component', content: <PubsSection /> }]);
        break;
      case 'preprints':
        setHistory(prev => [...prev, { id: `res-${Date.now()}`, type: 'component', content: <PreprintsSection /> }]);
        break;
      case 'talks':
        setHistory(prev => [...prev, { id: `res-${Date.now()}`, type: 'component', content: <TalksSection /> }]);
        break;
      case 'teachings':
      case 'teaching':
        setHistory(prev => [...prev, { id: `res-${Date.now()}`, type: 'component', content: <TeachingsSection /> }]);
        break;
      case 'gui':
      case 'graphical user interface':
        setHistory(prev => [...prev, { 
          id: `sys-${Date.now()}`, 
          type: 'system', 
          content: <span className="text-pink-400 animate-pulse">{">>"} INITIATING GUI SUBSYSTEM... REDIRECTING...</span> 
        }]);
        setTimeout(() => {
            window.location.href = '/legacy/';
        }, 1200);
        break;
      case 'clear':
        // Keep boot messages and init-help, clear everything else
        setHistory(prev => prev.filter(line => line.id.startsWith('boot-') || line.id === 'init-help'));
        break;
      default:
        setHistory(prev => [...prev, { 
          id: `err-${Date.now()}`, 
          type: 'system', 
          content: <span className="text-red-500">Command not found: {cleanCmd}. Type 'help' for available commands.</span> 
        }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center p-2 md:p-8 relative">
      {/* Background Visuals */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-black to-black pointer-events-none"></div>
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 105, 180, .3) 25%, rgba(255, 105, 180, .3) 26%, transparent 27%, transparent 74%, rgba(255, 105, 180, .3) 75%, rgba(255, 105, 180, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 105, 180, .3) 25%, rgba(255, 105, 180, .3) 26%, transparent 27%, transparent 74%, rgba(255, 105, 180, .3) 75%, rgba(255, 105, 180, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
      </div>
      
      {/* CRT Overlays */}
      <div className="crt-scanline"></div>
      <div className="crt-flicker"></div>

      {/* Main Terminal Window */}
      <div className="w-full max-w-5xl h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] max-h-[800px] bg-[#0c0c0c] border border-pink-800 shadow-[0_0_20px_rgba(255,105,180,0.15)] flex flex-col relative z-40 rounded-lg overflow-hidden mx-2 sm:mx-4">
        
        {/* Title Bar */}
        <div className="bg-[#1a1a1a] border-b border-pink-900 px-4 py-2 flex justify-between items-center select-none">
          <div className="flex items-center space-x-2 text-pink-600">
            <TerminalIcon size={16} />
            <span className="font-bold text-sm">Kai_Ye@research-station:~</span>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex space-x-2 text-gray-500">
                <Wifi size={14} />
                <Battery size={14} />
                <Cpu size={14} />
             </div>
             <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-600/50 hover:bg-yellow-500 cursor-pointer flex items-center justify-center"><Minus size={8} className="text-black"/></div>
                <div className="w-3 h-3 rounded-full bg-pink-600/50 hover:bg-pink-500 cursor-pointer flex items-center justify-center"><Square size={8} className="text-black"/></div>
                <div className="w-3 h-3 rounded-full bg-red-600/50 hover:bg-red-500 cursor-pointer flex items-center justify-center"><X size={8} className="text-black"/></div>
             </div>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto font-mono text-pink-400 text-sm md:text-base leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line) => (
            <div key={line.id} className="mb-2 break-words">
              {line.type === 'input' && (
                <div className="flex">
                  <span className="mr-2 text-pink-600 shrink-0 font-bold">Kai_Ye@lab:~$</span>
                  <span className="text-white glow-text">{line.content}</span>
                </div>
              )}
              {line.type === 'output' && (
                <div className="ml-0 md:ml-4 text-pink-300 opacity-90">{line.content}</div>
              )}
              {line.type === 'system' && (
                <div className="opacity-70 text-xs md:text-sm font-mono">{line.content}</div>
              )}
              {line.type === 'component' && (
                <div className="mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">{line.content}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          {!bootSequence && (
            <div className="flex items-center mt-2">
              <span className="mr-2 shrink-0 font-bold text-pink-600">
                Kai_Ye@lab:~$
              </span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-white font-mono glow-text caret-transparent"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
                {/* Custom Blinking Cursor positioned at the end of text */}
                <span 
                    className="absolute top-0 pointer-events-none text-white bg-pink-500/80 w-[10px] h-[1.2em] cursor-blink"
                    style={{ 
                        left: `${input.length}ch`,
                        display: 'inline-block' 
                    }}
                ></span>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Status Bar */}
        <div className="bg-[#111] border-t border-pink-900 px-4 py-1 text-xs text-gray-500 flex justify-between font-mono select-none">
           <span>Address: Room 5.02 Columbia House, 69 Aldwych, London WC2B 4RR</span>
           <span>STATUS: Dandan De Youshang</span>
           <span className="hidden md:inline">VERSION: 1.5.0</span>
        </div>
      </div>
    </div>
  );
};

export default App;