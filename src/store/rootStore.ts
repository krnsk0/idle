import { action, configure, makeObservable, observable } from 'mobx';

import { BuildingStore } from './buildingStore/buildingStore';
import { ResourceStore } from './resourceStore/resourceStore';
import type { s } from '../types';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

/**
 * Root of state tree; top level contains timing/gameloop
 */
export class RootStore {
  lastTimestamp: s.Milliseconds;
  lastSaved: s.Milliseconds;
  saveInterval: s.Milliseconds = 1000;

  // stores
  buildingStore: BuildingStore;
  resourceStore: ResourceStore;

  constructor() {
    // initialize the substores
    this.buildingStore = new BuildingStore(this);
    this.resourceStore = new ResourceStore(this);

    // initialize timestamps
    this.lastTimestamp = performance.now();
    this.lastSaved = performance.now();

    makeObservable(this, {
      lastTimestamp: observable,
      tick: action,
    });
  }

  tick(now: s.Milliseconds): void {
    // run child state ticks
    const delta = now - this.lastTimestamp;
    this.buildingStore.tick(delta);
    this.resourceStore.tick(delta);
    this.lastTimestamp = now;

    // run save if needed
    const timeSinceSave = now - this.lastSaved;
    if (timeSinceSave > this.saveInterval) {
      this.save();
      this.lastSaved = now;
    }
  }

  save(): void {
    console.log('saving');
  }
}
