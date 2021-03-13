import { action, makeObservable, observable } from 'mobx';
import type { s } from '../../types';
import { BuildingNames, ResourceNames, initialProducts } from '../../gameData';
import type { RootStore } from '../rootStore';

type Product = {
  name: ResourceNames;
  quantity: s.UnitsPerSecond;
};

export class Building {
  quantity: s.Units = 0;
  products: Product[];

  constructor(readonly name: BuildingNames, readonly root: RootStore) {
    this.products = initialProducts[name];

    makeObservable(this, {
      quantity: observable,
    });
  }

  getProductionPerSecond(resourceName: ResourceNames): s.UnitsPerSecond {
    return this.products.reduce((acc, product) => {
      const production = product.name === resourceName ? product.quantity : 0;
      return acc + production;
    }, 0);
  }
}

export class BuildingStore {
  readonly buildings: Building[] = [];

  constructor(readonly root: RootStore) {
    // initialize buildings
    Object.values(BuildingNames).forEach((buildingName) => {
      this.buildings.push(new Building(buildingName, this.root));
    });

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
        outerSum + building.getProductionPerSecond(resourceName),
      0
    );
  }
}
