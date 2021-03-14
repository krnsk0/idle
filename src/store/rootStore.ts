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

export class RootStore {
  lastTimestamp: s.Milliseconds = 0;

  // stores
  buildingStore: BuildingStore;
  resourceStore: ResourceStore;

  constructor() {
    this.buildingStore = new BuildingStore(this);
    this.resourceStore = new ResourceStore(this);

    makeObservable(this, {
      lastTimestamp: observable,
      tick: action,
    });
  }

  tick(now: s.Milliseconds) {
    const delta = now - this.lastTimestamp;
    this.buildingStore.tick(delta);
    this.resourceStore.tick(delta);
    this.lastTimestamp = now;
  }
}
