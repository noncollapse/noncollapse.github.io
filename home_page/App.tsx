import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from './types';
import {
  AboutSection,
  PubsSection,
  PreprintsSection,
  TalksSection,
  TeachingsSection,
  HelpSection,
  NewsSection
} from './components/CommandOutput';
import { Terminal as TerminalIcon, Battery, Wifi, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [bootSequence, setBootSequence] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open long results at their heading, so the newest items are visible first.
  useEffect(() => {
    if (scrollRef.current) {
      const latest = history[history.length - 1];
      const result = scrollRef.current.lastElementChild?.previousElementSibling;
      if (latest?.type === 'component' && result instanceof HTMLElement) {
        scrollRef.current.scrollTop = result.offsetTop - scrollRef.current.offsetTop;
      } else {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [history, bootSequence]);

  // Boot sequence effect
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const bootSteps = [
      "INITIALIZING KERNEL...",
      "WELCOME TO Kai Ye's RESEARCH STATION",
      "Kai Ye - PhD Student at LSE | CTO at Stats-Powered AI",
      "Contact k.ye1@lse.ac.uk for collaboration inquiries.",
    ];

    let delay = 0;
    bootSteps.forEach((step, index) => {
      delay += Math.random() * 500 + 300;
      timers.push(setTimeout(() => {
        setHistory(prev => [...prev, {
          id: `boot-${index}`,
          type: 'system',
          content: <div className="text-gray-500">{`[BOOT] ${step}`}</div>
        }]);
        if (index === bootSteps.length - 1) {
            setBootSequence(false);
            // Add News line
            setHistory(prev => [...prev, {
                id: 'news',
                type: 'system',
                content: <NewsSection />
            }]);
            setHistory(prev => [...prev, {
                id: 'init-help',
                type: 'system',
                content: (
                  <div className="mt-4 text-pink-400">
                    Type <span className="text-white font-bold">help</span> or use <span className="text-white font-bold">'Enter'</span> to get recommended command help, or type <span className="text-white font-bold">gui</span> to open the graphical homepage.

                  </div>
                )
            }]);
        }
      }, delay));
    });
    return () => timers.forEach(clearTimeout);
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
        // Keep the welcome, news, and command hint
        setHistory(prev => prev.filter(line => line.id.startsWith('boot-') || line.id === 'init-help' || line.id === 'news'));
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
    <div className="w-full h-[100dvh] bg-black flex items-center justify-center p-2 md:p-8 relative">
      {/* Background Visuals */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-black to-black pointer-events-none"></div>
      <div className="fixed inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 105, 180, .3) 25%, rgba(255, 105, 180, .3) 26%, transparent 27%, transparent 74%, rgba(255, 105, 180, .3) 75%, rgba(255, 105, 180, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 105, 180, .3) 25%, rgba(255, 105, 180, .3) 26%, transparent 27%, transparent 74%, rgba(255, 105, 180, .3) 75%, rgba(255, 105, 180, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
      </div>

      {/* CRT Overlays */}
      <div className="crt-scanline"></div>
      <div className="crt-flicker"></div>

      {/* Main Terminal Window */}
      <div className="w-full max-w-5xl h-[calc(100dvh-2rem)] sm:h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] max-h-[800px] bg-[#0c0c0c] border border-pink-800 shadow-[0_0_20px_rgba(255,105,180,0.15)] flex flex-col relative z-40 rounded-lg overflow-hidden mx-2 sm:mx-4">

        {/* Title Bar */}
        <div className="bg-[#1a1a1a] border-b border-pink-900 px-4 py-2 flex justify-between items-center select-none">
          <div className="flex items-center space-x-2 text-pink-600">
            <TerminalIcon size={16} />
            <span className="font-bold text-xs sm:text-sm">Kai_Ye@research-station:~</span>
          </div>
          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex space-x-2 text-gray-500">
                <Wifi size={14} />
                <Battery size={14} />
                <Cpu size={14} />
             </div>
             <a href="/legacy/" className="text-xs text-pink-300 underline underline-offset-4">GUI ↗</a>
          </div>
        </div>

        <nav aria-label="Terminal commands" className="flex flex-wrap gap-1 px-3 py-2 border-b border-pink-900/50">
          {['about', 'pubs', 'preprints', 'talks', 'teaching', 'help'].map(command => (
            <button key={command} disabled={bootSequence} onClick={() => handleCommand(command)} className="px-2 py-1 text-xs text-pink-300 hover:bg-pink-900/30 disabled:opacity-40">{command}</button>
          ))}
        </nav>

        {/* Terminal Content Area */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto font-mono text-pink-400 text-sm md:text-base leading-relaxed"
          onClick={event => {
            if (!(event.target as HTMLElement).closest('a, button, input') && !window.getSelection()?.toString()) inputRef.current?.focus();
          }}
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
              <div className="relative flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  aria-label="Terminal command"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-white font-mono glow-text caret-pink-400"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />

              </div>
            </div>
          )}
        </div>

        {/* Footer Status Bar */}
        <div className="bg-[#111] border-t border-pink-900 px-4 py-1 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 justify-between font-mono select-none">
           <span>Address: Room 5.02 Columbia House, 69 Aldwych, London WC2B 4RR</span>
           <a href="mailto:k.ye1@lse.ac.uk" className="text-pink-300">k.ye1@lse.ac.uk</a>
           <span className="hidden md:inline">UPDATED: OCT 2026</span>
        </div>
      </div>
    </div>
  );
};

export default App;
