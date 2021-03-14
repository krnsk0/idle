import { action, makeObservable, observable } from 'mobx';
import type { RootStore } from '../rootStore';
import type { s } from '../../types';
import { City } from './city';
import { computedFn } from 'mobx-utils';

export class CityStore {
  root: RootStore;
  cities: City[] = [];

  constructor(root: RootStore) {
    this.root = root;

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
    this.cities.push(new City(this.root));
  }

  getCityById = computedFn((id: s.UUID): City | undefined => {
    return this.cities.find((city) => city.id === id);
  });
}
