import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { hasFoundEverything, readDiscoveries, type Discovery } from './egg-logic';

const STORAGE_KEY = 'research-station-discoveries-v1';
const DiscoveryContext = createContext<{
  complete: boolean;
  discover: (item: Discovery) => void;
} | null>(null);

export const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [found, setFound] = useState<Discovery[]>(() => {
    try { return readDiscoveries(window.localStorage.getItem(STORAGE_KEY)); }
    catch { return []; }
  });

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found)); }
    catch { /* The hunt still works for this visit if storage is unavailable. */ }
  }, [found]);

  const discover = useCallback((item: Discovery) => {
    setFound(current => current.includes(item) ? current : [...current, item]);
  }, []);

  return <DiscoveryContext.Provider value={{ complete: hasFoundEverything(found), discover }}>{children}</DiscoveryContext.Provider>;
};

export function useDiscovery() {
  const context = useContext(DiscoveryContext);
  if (!context) throw new Error('Easter eggs require DiscoveryProvider');
  return context;
}
