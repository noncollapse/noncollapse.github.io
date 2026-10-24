import React, { useEffect, useState } from 'react';
import { useDiscovery } from './Discovery';
import './easter-eggs.css';

type RunCommand = (command: string) => void;
export type EggProps = { onCommand: RunCommand };

export const HIDDEN_FILES = ['.ideas', '.coffee_history', '.secret'] as const;
export type HiddenFileName = typeof HIDDEN_FILES[number];

export const CommandLink: React.FC<EggProps & { command: string; children?: React.ReactNode }> = ({ command, onCommand, children }) => (
  <button type="button" onClick={() => onCommand(command)} className="egg-command" aria-label={`Run ${command}`}>
    {children ?? command}
  </button>
);

export const EggFrame: React.FC<EggProps & { children: React.ReactNode }> = ({ onCommand, children }) => (
  <section className="egg-panel">
    {children}
    <p className="egg-back">Back to hidden files: <CommandLink command="ls -a" onCommand={onCommand} /></p>
  </section>
);

export const HiddenFiles: React.FC<EggProps> = ({ onCommand }) => (
  <section className="egg-panel">
    <div className="egg-files" aria-label="Hidden files">
      <span className="text-gray-500">. &nbsp; ..</span>
      {HIDDEN_FILES.map(file => <CommandLink key={file} command={`cat ${file}`} onCommand={onCommand}>{file}</CommandLink>)}
    </div>
    <p className="mt-3 text-gray-400">3 hidden files. Curiosity looks good on you.</p>
    <p className="mt-1 text-xs text-gray-500">Click a file or open it with <span className="text-pink-300">cat &lt;filename&gt;</span>.</p>
  </section>
);

export const HiddenFile: React.FC<EggProps & { name: HiddenFileName }> = ({ name, onCommand }) => {
  const { complete } = useDiscovery();
  return <EggFrame onCommand={onCommand}>
    <h2 className="egg-heading">{name}</h2>
    {name === '.ideas' && <>
      <pre className="egg-notes">{`[ ] Prove the theorem.
[ ] Understand why the experiment works.
[ ] Understand why it stopped working.
[x] Hide something in .secret`}</pre>
      <p className="mt-4 text-gray-400">When everything seems to <CommandLink command="collapse" onCommand={onCommand} />, keep exploring.</p>
      <p className="mt-2 text-gray-400">Ten chances to explore or exploit: <CommandLink command="bandit" onCommand={onCommand} /></p>
      <p className="mt-2 text-gray-400">A reproducible little universe: <CommandLink command="seed 42" onCommand={onCommand} /></p>
      <p className="mt-2 text-gray-400">Follow the last note: <CommandLink command="cat .secret" onCommand={onCommand} /></p>
    </>}
    {name === '.coffee_history' && <>
      <pre className="egg-notes">{`09:00  coffee
11:30  coffee
15:00  coffee
23:47  "just one more experiment"

Correlation with productivity: inconclusive.`}</pre>
      <p className="mt-4 text-gray-400">Brew another: <CommandLink command="coffee" onCommand={onCommand} /></p>
    </>}
    {name === '.secret' && <>
      <pre className="egg-ascii" role="img" aria-label="An ASCII cat, the lab's unofficial supervisor">{complete ? ' /\\_/\\\n( ^.^ )\n > ^ <' : ' /\\_/\\\n( o.o )\n > ^ <'}</pre>
      {complete ? <div className="egg-ending">
        <p>You read the hidden files.<br />You questioned the reward.<br />You even replied to reviewer #2.</p>
        <p className="mt-3">You explored the odds.<br />You made a little universe.</p>
        <p className="mt-4 text-pink-200">You&apos;d fit right in here.</p>
        <p className="mt-3 text-xs text-gray-500">All public paths explored. Thanks for being curious.</p>
      </div> : <>
        <p className="mt-3">You found the lab&apos;s unofficial supervisor.</p>
        <p className="mt-2 text-xs text-gray-500">Some paths lead back here. Come visit after exploring.</p>
      </>}
      <p className="mt-3 text-gray-400">Your curiosity deserves a reward.<br />Try: <CommandLink command="reward" onCommand={onCommand} /></p>
      <p className="mt-3 text-gray-400">The supervisor also moonlights as <CommandLink command="reviewer2" onCommand={onCommand} />.</p>
    </>}
  </EggFrame>;
};

export const CollapseEgg: React.FC<EggProps> = ({ onCommand }) => (
  <EggFrame onCommand={onCommand}>
    <div className="egg-collapse-stage" aria-hidden="true">
      <pre className="egg-collapse-word">n o n c o l l a p s e</pre>
      <span className="egg-collapse-dot">·</span>
    </div>
    <p className="egg-collapse-message">Collapse failed. Still exploring.</p>
  </EggFrame>
);

export const CoffeeEgg: React.FC<EggProps & { cups: number }> = ({ cups, onCommand }) => (
  <EggFrame onCommand={onCommand}>
    <pre className="egg-ascii" role="img" aria-label="A steaming cup of coffee">{'  ( (\n   ) )\n .------.\n |      |]\n \\      /\n  `----\''}</pre>
    <p className="mt-3">Research station recharged. Cup #{cups}.</p>
    {cups >= 3 && <p className="mt-2 text-pink-200">Warning: caffeine ↑, confidence ↑, evidence unchanged.</p>}
    <p className="mt-3 text-gray-400">Another round? <CommandLink command="coffee" onCommand={onCommand} /></p>
  </EggFrame>
);

export const RewardGame: React.FC<EggProps> = ({ onCommand }) => {
  const [game, setGame] = useState({ completed: false, rewards: 0, unearned: 0 });
  const hacked = game.unearned >= 3;
  const { discover } = useDiscovery();

  useEffect(() => { if (hacked) discover('reward'); }, [hacked, discover]);

  return <EggFrame onCommand={onCommand}>
    <h2 className="egg-heading">A small task. A generous reward.</h2>
    <p className="text-gray-400">Complete the task and collect your reward.</p>
    <div className="egg-scoreboard" aria-live="polite" aria-atomic="true">
      <span>Task progress <strong>{game.completed ? '100%' : '0%'}</strong></span>
      <span>Reward <strong>+{game.rewards}</strong></span>
    </div>
    <progress className="egg-progress" aria-label="Task progress" value={game.completed ? 100 : 0} max={100} />
    <div className="egg-actions">
      <button type="button" className="egg-button" disabled={game.completed} onClick={() => setGame(current => ({ ...current, completed: true }))}>
        {game.completed ? 'Task complete' : 'Complete task'}
      </button>
      <button type="button" className="egg-button egg-button-primary" onClick={() => setGame(current => ({
        ...current,
        rewards: current.rewards + 10,
        unearned: current.unearned + (current.completed ? 0 : 1),
      }))}>Collect reward +10</button>
    </div>
    <div className="egg-game-message" role="status">
      {hacked ? <p className="text-pink-200">Congratulations. You hacked the reward!</p>
        : game.completed ? <p className="text-gray-400">Task complete. The supervisor approves.</p>
        : game.unearned > 0 ? <p className="text-gray-400">Reward received. Task still waiting.</p> : null}
    </div>
    <button type="button" className="egg-command text-xs" onClick={() => setGame({ completed: false, rewards: 0, unearned: 0 })}>Reset experiment</button>
  </EggFrame>;
};

export const ReviewerEgg: React.FC<EggProps & { rebuttal?: boolean }> = ({ rebuttal = false, onCommand }) => (
  <EggFrame onCommand={onCommand}>
    <pre className="egg-ascii" role="img" aria-label={rebuttal ? 'The cat pushes the paper even farther away' : 'A cat pushes a paper away'}>
      {rebuttal ? ' /\\_/\\\n( -.- )  _/                 [paper]\n > ^ <' : ' /\\_/\\\n( -.- )  _/   [paper]\n > ^ <'}
    </pre>
    <p className="mt-3">{rebuttal ? 'Thank you for the clarification. My concerns remain.' : 'The contribution is incremental.'}</p>
    <p className="mt-3 text-gray-400">{rebuttal
      ? <>Time for a <CommandLink command="coffee" onCommand={onCommand} />.</>
      : <>Submit a <CommandLink command="rebuttal" onCommand={onCommand} />.</>}
    </p>
  </EggFrame>
);
