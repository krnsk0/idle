import { makeObservable, observable } from 'mobx';
import { createModelSchema, object, primitive } from 'serializr';
import { CityStore } from './cityStore/cityStore';
import type { s } from '../semanticTypes';
export const saveKey = 'idleSave';

/**
 * Root of state tree; top level contains timing/gameloop
 */
export class GameState {
  lastSeenTimestamp: s.Milliseconds;
  saveInterval: s.Milliseconds = 1000;

  // stores
  cityStore: CityStore;

  constructor() {
    this.cityStore = new CityStore(this);
    this.lastSeenTimestamp = Date.now();

    makeObservable(this, {
      lastSeenTimestamp: observable,
    });
  }

  initializeNewGame(): void {
    this.cityStore.addCity();
  }
}

createModelSchema<GameState>(GameState, {
  lastSeenTimestamp: primitive(),
  saveInterval: primitive(),
  cityStore: object(CityStore),
});
