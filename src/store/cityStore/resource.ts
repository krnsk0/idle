import { action, computed, makeObservable, observable } from 'mobx';
import type { ResourceNames } from '../../gameData';
import type { RootStore } from '../rootStore';
import type { s } from '../../types';
import type { City } from './city';

export class Resource {
  root: RootStore;
  city: City;
  quantity: s.Units;
  resourceName: ResourceNames;

  constructor(
    root: RootStore,
    city: City,
    resourceName: ResourceNames,
    quantity: s.Units
  ) {
    // member initialization
    this.root = root;
    this.city = city;
    this.resourceName = resourceName;
    this.quantity = quantity;

    makeObservable(this, {
      quantity: observable,
      tick: action,
      productionPerSecond: computed,
    });
  }

  tick(delta: s.Milliseconds): void {
    this.quantity += this.productionPerSecond * (delta / 1000);
  }

  /**
   * How much of this resource is produced per second?
   */
  get productionPerSecond(): s.UnitsPerSecond {
    return this.city.buildings.reduce((acc, building) => {
      const perBuilding = building.outputs[this.resourceName];

      const allBuildings = (perBuilding ? perBuilding : 0) * building.quantity;

      return acc + allBuildings;
    }, 0);
  }
}
