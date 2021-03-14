import { BuildingStore } from './buildingStore/buildingStore';
import { ResourceStore } from './resourceStore/resourceStore';
import type { s } from '../types';

export class RootStore {
  lastTimestamp: s.Milliseconds = 0;

  // stores
  buildingStore: BuildingStore;
  resourceStore: ResourceStore;

  constructor() {
    this.buildingStore = new BuildingStore(this);
    this.resourceStore = new ResourceStore(this);
  }

  tick(now: s.Milliseconds) {
    const delta = now - this.lastTimestamp;
    this.buildingStore.tick(delta);
    this.resourceStore.tick(delta);
    this.lastTimestamp = now;
  }
}
