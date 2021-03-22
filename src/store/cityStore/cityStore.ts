import { action, makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';
import { createModelSchema, list, object, primitive } from 'serializr';
import type { s } from '../../semanticTypes';
import type { GameState } from '../gameState';
import { City } from './city';

export class CityStore {
  rootRef: GameState;
  cities: City[] = [];

  constructor(rootRef: GameState) {
    this.rootRef = rootRef;

    makeObservable(this, {
      cities: observable,
      tick: action,
      addCity: action,
    });
  }

  tick(delta: s.Milliseconds): void {
    Object.values(this.cities).map((city) => city.tick(delta));
  }

  addCity(): void {
    this.cities.push(new City(this.rootRef, this));
  }

  getCityById = computedFn((id: s.UUID): City | undefined => {
    return this.cities.find((city) => city.id === id);
  });
}

createModelSchema<CityStore>(
  CityStore,
  {
    id: primitive(),
    buildingName: primitive(),
    cities: list(object(City)),
  },
  (context) => {
    return new CityStore(context.rootContext.target);
  }
);
