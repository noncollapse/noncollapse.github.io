import React, { useEffect, useState } from 'react';
import { CommandLink, EggFrame, type EggProps } from './EasterEggs';
import { useDiscovery } from './Discovery';
import { ARM_NAMES, BANDIT_ROUNDS, banditSummary, createBandit, pullBandit } from './egg-logic';

export const BanditGame: React.FC<EggProps> = ({ onCommand }) => {
  const [game, setGame] = useState(() => createBandit());
  const { discover } = useDiscovery();
  const finished = game.pulls.length === BANDIT_ROUNDS;
  const summary = banditSummary(game);
  const lastPull = game.pulls.at(-1);

  useEffect(() => { if (finished) discover('bandit'); }, [finished, discover]);

  const pull = (arm: number) => {
    // Generate the draw outside the updater so React can replay it safely.
    const roll = Math.random();
    setGame(current => pullBandit(current, arm, roll));
  };

  return <EggFrame onCommand={onCommand}>
    <h2 className="egg-heading">Explore. Exploit. Ten chances.</h2>
    <p className="text-gray-400">Three arms, three hidden odds. Each pull can earn +1 reward. Find your favorite.</p>
    <div className="egg-scoreboard" aria-live="polite" aria-atomic="true">
      <span>Pulls <strong>{game.pulls.length}/{BANDIT_ROUNDS}</strong></span>
      <span>Reward <strong>+{summary.rewards}</strong></span>
    </div>
    <div className="egg-bandit-arms">
      {ARM_NAMES.map((name, arm) => {
        const pulls = game.pulls.filter(pull => pull.arm === arm);
        return <button type="button" key={name} className="egg-button egg-bandit-arm" disabled={finished} aria-label={`Pull arm ${name}`} onClick={() => pull(arm)}>
          <span className="egg-arm-letter">{name}</span>
          <span className="egg-arm-stats">{pulls.length} pulls · {pulls.filter(pull => pull.won).length} rewards</span>
        </button>;
      })}
    </div>
    <div className="egg-pull-history" aria-label="Pull history">
      {Array.from({ length: BANDIT_ROUNDS }, (_, index) => {
        const pull = game.pulls[index];
        const label = pull ? `Pull ${index + 1}: ${ARM_NAMES[pull.arm]}, ${pull.won ? '+1' : '+0'}` : `Pull ${index + 1}: waiting`;
        return <span key={index} className={`egg-pull ${pull?.won ? 'egg-pull-win' : ''}`} title={label} aria-label={label}>{pull ? ARM_NAMES[pull.arm] : '·'}</span>;
      })}
    </div>
    <div className="egg-game-message" role="status">
      {lastPull ? `Arm ${ARM_NAMES[lastPull.arm]}: ${lastPull.won ? '+1. A little luck.' : '+0. Even good odds can disappoint.'}` : 'Explore a little. Or trust your first guess.'}
    </div>
    {finished && <div className="egg-bandit-results">
      <h3 className="egg-heading">The odds, revealed.</h3>
      <div className="egg-odds">
        {ARM_NAMES.map((name, arm) => <span key={name}>{name}: <strong>{game.probabilities[arm] * 100}%</strong>{arm === summary.bestArm ? ' ★' : ''}</span>)}
      </div>
      <p className="mt-3">Best odds: arm {ARM_NAMES[summary.bestArm]}. Your reward: {summary.rewards}/10.</p>
      <p className="mt-2 text-gray-400">Expected reward gap: {summary.expectedGap.toFixed(2)}.</p>
      <p className="mt-1 text-xs text-gray-500">The expected difference from choosing the best arm every time, rather than the rewards lost to luck.</p>
      <p className="mt-3 text-pink-200">Ten pulls. A little evidence. Still some uncertainty.</p>
      <button type="button" className="egg-button mt-4" onClick={() => setGame(createBandit())}>Play again</button>
      <p className="mt-3 text-gray-400">Another kind of reward: <CommandLink command="reward" onCommand={onCommand} /></p>
    </div>}
  </EggFrame>;
};
