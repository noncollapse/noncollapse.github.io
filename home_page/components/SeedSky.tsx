import React, { useEffect, useState } from 'react';
import { EggFrame, type EggProps } from './EasterEggs';
import { useDiscovery } from './Discovery';
import { createStars } from './egg-logic';
import fieldA from '../assets/terminal/.resources/textures/atlas/f7c2a9.png';
import fieldB from '../assets/terminal/.resources/textures/atlas/b4e8d1.png';

// Ship the finished dot portraits; the original photographs stay outside the site.
const memories: Record<string, { src: string; width: number; height: number; caption: string; alt: string }> = {
  '0726': { src: fieldA, width: 939, height: 1676, caption: 'Two people. One little universe.', alt: 'A dot-matrix portrait of us together' },
  '0916': { src: fieldB, width: 1086, height: 1448, caption: 'My favorite constellation.', alt: 'A dot-matrix portrait of her' },
};

export const SeedSky: React.FC<EggProps & { seed: string }> = ({ seed, onCommand }) => {
  const [nextSeed, setNextSeed] = useState(seed);
  const { discover } = useDiscovery();
  const stars = createStars(seed);
  const memory = memories[seed];

  useEffect(() => { discover('seed'); }, [discover]);

  return <EggFrame onCommand={onCommand}>
    <h2 className="egg-heading">seed {seed}</h2>
    <div className="egg-sky">
      {memory
        ? <img className="egg-memory" src={memory.src} width={memory.width} height={memory.height} alt={memory.alt} decoding="async" />
        : <svg viewBox="0 0 720 432" role="img" aria-label={`A pink starfield generated from seed ${seed}`}>
          <rect width="720" height="432" fill="#09080c" />
          {stars.map((star, index) => <g key={index} opacity={star.opacity} fill="#f9a8d4">
            <circle cx={star.x} cy={star.y} r={star.radius} />
            {index < 10 && <path d={`M${star.x - 4},${star.y}h8M${star.x},${star.y - 4}v8`} stroke="#f9a8d4" strokeWidth=".5" />}
          </g>)}
        </svg>}
    </div>
    <p className="mt-3 text-pink-200">{memory ? memory.caption : 'Same seed. Same universe.'}</p>
    <form className="egg-seed-form" onSubmit={event => { event.preventDefault(); onCommand(`seed ${nextSeed}`); }}>
      <label className="text-xs text-gray-400">Choose a seed
        <input className="egg-seed-input" aria-label="Starfield seed" type="text" inputMode="numeric" pattern="[0-9]{1,32}" maxLength={32} required value={nextSeed} onChange={event => setNextSeed(event.target.value)} autoComplete="off" spellCheck={false} />
      </label>
      <button type="submit" className="egg-button">Generate</button>
    </form>
  </EggFrame>;
};
