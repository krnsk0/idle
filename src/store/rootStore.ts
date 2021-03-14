import { action, configure, makeObservable, observable } from 'mobx';
import { CityStore } from './cityStore/cityStore';
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
  cityStore: CityStore;

  constructor() {
    // member initialization
    this.cityStore = new CityStore(this);

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
    this.cityStore.tick(delta);
    this.lastTimestamp = now;

    // run save if needed
    const timeSinceSave = now - this.lastSaved;
    if (timeSinceSave > this.saveInterval) {
      const saveSucceeded = this.save();
      if (saveSucceeded) this.lastSaved = now;
    }
  }

  /**
   * Serialize and save; tell caller if succeeded
   */
  save(): boolean {
    const json = 'test';
    try {
      window.localStorage.setItem('save', JSON.stringify(json));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
