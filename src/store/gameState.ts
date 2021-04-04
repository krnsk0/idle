import { makeObservable, observable } from 'mobx';
import { createModelSchema, object, primitive } from 'serializr';
import { CityStore } from './cityStore/cityStore';
import type { s } from '../semanticTypes';
import type { Resource } from './cityStore/resource';
import type { City } from './cityStore/city';

type TickingEntity = Resource | City;

/**
 * Root of state tree; top level contains timing/gameloop
 */
export class GameState {
  lastSeenTimestamp: s.Milliseconds;
  saveInterval: s.Milliseconds = 1000;

  // stores
  cityStore: CityStore;

  // tickable entity list
  tickingEntities: TickingEntity[] = [];

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

  tick(now: s.Milliseconds): void {
    // calculate delta
    const delta = now - this.lastSeenTimestamp;
    this.lastSeenTimestamp = now;

    // execute ticks
    this.cityStore.cities.forEach((city) => {
      city.resources.forEach((resource) => {
        resource.tick(delta);
      });
    });
  }
}

createModelSchema<GameState>(GameState, {
  lastSeenTimestamp: primitive(),
  saveInterval: primitive(),
  cityStore: object(CityStore),
});
