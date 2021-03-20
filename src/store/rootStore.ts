import { action, makeObservable, observable } from 'mobx';
import { createModelSchema, object, primitive, serialize } from 'serializr';
import { CityStore } from './cityStore/cityStore';
import type { s } from '../semanticTypes';
import './config';
export const saveKey = 'idleSave';

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
      this.save();
      this.lastSaved = now;
    }
  }

  /**
   * Serialize and save; tell caller if succeeded
   */
  save() {
    console.log('saved');
    try {
      const json = JSON.stringify(serialize(RootStore, this));
      window.localStorage.setItem(saveKey, json);
    } catch (e) {
      console.log(e);
    }
  }
}

createModelSchema<RootStore>(RootStore, {
  lastTimestamp: primitive(),
  saveInterval: primitive(),
  cityStore: object(CityStore),
});
