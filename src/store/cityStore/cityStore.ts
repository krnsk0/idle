import { action, computed, makeObservable, observable } from 'mobx';
import type { RootStore } from '../rootStore';
import type { s } from '../../semanticTypes';
import { City } from './city';
import { computedFn } from 'mobx-utils';

export class CityStore {
  rootRef: RootStore;
  cities: City[] = [];

  constructor(rootRef: RootStore) {
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
    this.cities.push(new City(this.rootRef));
  }

  getCityById = computedFn((id: s.UUID): City | undefined => {
    return this.cities.find((city) => city.id === id);
  });
}
