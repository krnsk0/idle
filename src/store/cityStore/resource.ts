import { action, computed, makeObservable, observable } from 'mobx';
import type { ResourceNames } from '../../gameData';
import type { RootStore } from '../rootStore';
import type { s } from '../../semanticTypes';
import type { City } from './city';

export type tResourceSave = {
  quantity: s.Units;
  resourceName: ResourceNames;
};
export class Resource {
  rootRef: RootStore;
  cityRef: City;
  quantity: s.Units;
  resourceName: ResourceNames;

  constructor(
    rootRef: RootStore,
    cityRef: City,
    resourceName: ResourceNames,
    quantity: s.Units
  ) {
    // member initialization
    this.rootRef = rootRef;
    this.cityRef = cityRef;
    this.resourceName = resourceName;
    this.quantity = quantity;

    makeObservable(this, {
      quantity: observable,
      tick: action,
      productionPerSecond: computed,
    });
  }

  tick(delta: s.Milliseconds): void {
    const newProduction = this.productionPerSecond * (delta / 1000);
    this.quantity += newProduction;
  }

  /**
   * How much of this resource is produced per second?
   */
  get productionPerSecond(): s.UnitsPerSecond {
    return this.cityRef.buildings.reduce((acc, building) => {
      const perBuilding = building.outputs[this.resourceName];

      const allBuildings = (perBuilding ? perBuilding : 0) * building.quantity;

      return acc + allBuildings;
    }, 0);
  }
}
