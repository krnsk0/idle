import { BuildingStore } from './buildingStore';
import { ResourceStore } from './resourceStore';
import React, { createContext, ReactNode, useContext } from 'react';

export class RootStore {
  resourceStore: ResourceStore;
  buildingStore: BuildingStore;

  constructor() {
    this.resourceStore = new ResourceStore(this);
    this.buildingStore = new BuildingStore(this);
  }
}

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);

// provider
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

// hook
export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};
