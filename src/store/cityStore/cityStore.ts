import { action, computed, makeObservable, observable } from 'mobx';
import type { RootStore } from '../rootStore';
import type { s } from '../../semanticTypes';
import { City, tCitySave } from './city';
import { computedFn } from 'mobx-utils';

export type tCityStoreSave = {
  cities: tCitySave[];
};

export class CityStore {
  root: RootStore;
  cities: City[] = [];

  constructor(root: RootStore) {
    this.root = root;

    makeObservable(this, {
      cities: observable,
      tick: action,
      addCity: action,
      serialize: computed,
      load: action,
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

  get serialize(): tCityStoreSave {
    return {
      cities: this.cities.map((city) => city.serialize),
    };
  }

  load(saveData: tCityStoreSave): void {
    saveData.cities.forEach((citySaveData) => {
      const newCity = new City(this.root);
      this.cities.push(newCity);
      newCity.load(citySaveData);
    });
  }
}
