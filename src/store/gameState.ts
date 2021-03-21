import { action, makeObservable, observable } from 'mobx';
import { createModelSchema, object, primitive } from 'serializr';
import { CityStore } from './cityStore/cityStore';
import type { s } from '../semanticTypes';
export const saveKey = 'idleSave';

/**
 * Root of state tree; top level contains timing/gameloop
 */
export class GameState {
  lastTimestamp: s.Milliseconds;
  saveInterval: s.Milliseconds = 1000;

  // stores
  cityStore: CityStore;

  constructor() {
    // member initialization
    this.cityStore = new CityStore(this);

    // initialize timestamps
    this.lastTimestamp = Date.now();

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
  }
}

createModelSchema<GameState>(GameState, {
  lastTimestamp: primitive(),
  saveInterval: primitive(),
  cityStore: object(CityStore),
});
