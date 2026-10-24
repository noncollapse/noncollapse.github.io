export const DISCOVERIES = [
  'file:.ideas', 'file:.coffee_history', 'file:.secret',
  'collapse', 'coffee', 'reward', 'reviewer2', 'rebuttal', 'bandit', 'seed',
] as const;
export type Discovery = typeof DISCOVERIES[number];

export const hasFoundEverything = (found: readonly Discovery[]) => DISCOVERIES.every(item => found.includes(item));

export function readDiscoveries(raw: string | null): Discovery[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(parsed) ? DISCOVERIES.filter(item => parsed.includes(item)) : [];
  } catch {
    return [];
  }
}

// Hash the original string: leading zeroes are part of a seed's identity.
export function seededRandom(seed: string) {
  let state = 2166136261;
  for (const character of seed) state = Math.imul(state ^ character.charCodeAt(0), 16777619);
  return () => {
    state += 0x6D2B79F5;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export const isValidSeed = (seed: string) => /^\d{1,32}$/.test(seed);

export function createStars(seed: string) {
  const random = seededRandom(seed);
  return Array.from({ length: 145 }, (_, index) => ({
    x: 12 + Math.floor(random() * 87) * 8,
    y: 12 + Math.floor(random() * 51) * 8,
    radius: index < 10 ? 3 : 1.3 + random() * 1.2,
    opacity: .45 + random() * .5,
  }));
}

export const BANDIT_ROUNDS = 10;
export const ARM_NAMES = ['A', 'B', 'C'] as const;
export type BanditPull = { arm: number; won: boolean };
export type BanditState = { probabilities: number[]; pulls: BanditPull[] };

export function createBandit(random = Math.random): BanditState {
  const probabilities = [.25, .5, .75];
  for (let index = probabilities.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [probabilities[index], probabilities[other]] = [probabilities[other], probabilities[index]];
  }
  return { probabilities, pulls: [] };
}

export function pullBandit(state: BanditState, arm: number, roll: number): BanditState {
  if (state.pulls.length >= BANDIT_ROUNDS || !Number.isInteger(arm) || arm < 0 || arm >= ARM_NAMES.length) return state;
  return { ...state, pulls: [...state.pulls, { arm, won: roll < state.probabilities[arm] }] };
}

export function banditSummary(state: BanditState) {
  const bestProbability = Math.max(...state.probabilities);
  return {
    bestArm: state.probabilities.indexOf(bestProbability),
    rewards: state.pulls.filter(pull => pull.won).length,
    expectedGap: state.pulls.reduce((gap, pull) => gap + bestProbability - state.probabilities[pull.arm], 0),
  };
}
