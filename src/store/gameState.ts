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
    this.cityStore = new CityStore(this);
    this.lastTimestamp = Date.now();

    makeObservable(this, {
      lastTimestamp: observable,
      tick: action,
    });
  }

  initializeNewGame(): void {
    this.cityStore.addCity();
  }

  tick(now: s.Milliseconds): void {
    const delta = now - this.lastTimestamp;
    this.lastTimestamp = now;

    // run child state ticks
    this.cityStore.tick(delta);
  }
}

createModelSchema<GameState>(GameState, {
  lastTimestamp: primitive(),
  saveInterval: primitive(),
  cityStore: object(CityStore),
});
