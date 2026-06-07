/* Verst Carbon dMRV — lightweight data store.
   For now it wraps the in-memory VC_DATA mock and lets the UI mutate it
   (register a device) with React re-renders. This is the seam where a real
   API/data layer will plug in later: swap the bodies of addDevice / useDevices
   for fetch calls + async state and the screens won't need to change shape. */
import React from 'react';
import { VC_DATA } from './data.js';

const { createContext, useContext, useState, useCallback } = React;

const DataContext = createContext(null);

function DataProvider({ children }) {
  // `rev` bumps whenever the device collection changes so subscribers re-render.
  const [rev, setRev] = useState(0);

  const addDevice = useCallback((device) => {
    VC_DATA.DEVICES.unshift(device); // newest first
    setRev((r) => r + 1);
    return device;
  }, []);

  const value = { rev, addDevice };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within <DataProvider>');
  return ctx;
}

// Scoped device list that re-renders when the collection changes.
function useDevices(scope) {
  useData(); // subscribe to device-collection changes (rev)
  return VC_DATA.scopeDevices(scope);
}

export { DataProvider, useData, useDevices };
