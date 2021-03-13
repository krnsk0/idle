import { action, makeObservable, observable } from 'mobx';
import type { BuildingNames, ResourceNames, s } from '../../types';
import { initialBuildings } from './initialBuildings';
import type { RootStore } from '../rootStore';

type Product = {
  name: ResourceNames;
  quantity: s.UnitsPerSecond;
};

export type Building = {
  name: BuildingNames;
  quantity: s.UnitsPerSecond;
  products: Product[];
};

export class BuildingStore {
  root: RootStore;
  buildings: Building[] = initialBuildings;

  constructor(root: RootStore) {
    this.root = root;

    makeObservable(this, {
      buildings: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {}

  /**
   * Calculates production per second of a resource
   */
  getProductionPerSecond(resourceName: ResourceNames): s.UnitsPerSecond {
    return this.buildings.reduce(
      (outerSum, building) =>
        outerSum +
        building.products.reduce((innerSum, product) => {
          const production =
            product.name === resourceName ? product.quantity : 0;
          return innerSum + production;
        }, 0),
      0
    );
  }
}
