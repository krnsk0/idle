import { action, computed, makeObservable, observable } from 'mobx';
import { CityStore, tCityStoreSave } from './cityStore/cityStore';
import type { s } from '../semanticTypes';
import './config';

export type tRootSave = {
  cityStore: tCityStoreSave;
  lastTimestamp: s.Milliseconds;
  saveInterval: s.Milliseconds;
};

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
      serialize: computed,
      load: action,
    });

    this.load();
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

  get serialize(): tRootSave {
    return {
      cityStore: this.cityStore.serialize,
      lastTimestamp: this.lastTimestamp,
      saveInterval: this.saveInterval,
    };
  }

  /**
   * Serialize and save; tell caller if succeeded
   */
  save(): boolean {
    console.log('saved');
    try {
      window.localStorage.setItem('save', JSON.stringify(this.serialize));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  load(): boolean {
    console.log('loading save');
    try {
      const saveString = window.localStorage.getItem('save');
      if (saveString) {
        const saveData = <tRootSave>JSON.parse(saveString);

        // parse save and populate
        this.saveInterval = saveData.saveInterval;
        this.cityStore.load(saveData.cityStore);

        // run missing time
        // // this.lastTimestamp = saveData.lastTimestamp;
        // this.tick(performance.now());

        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  clearSave(): boolean {
    try {
      console.log('clearing save');
      window.localStorage.removeItem('save');
      this.load();
    } catch (e) {
      console.log(e);
    }
    return false;
  }
}
