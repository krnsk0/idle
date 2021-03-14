import { action, computed, makeObservable, observable } from 'mobx';
import type { s } from '../../types';
import {
  BuildingNames,
  ResourceNames,
  initialBuildingProducts,
} from '../../gameData';
import type { RootStore } from '../rootStore';

class BuildingProduct {
  constructor(
    readonly root: RootStore,
    readonly resourceName: ResourceNames,
    readonly quantityPerSecond: s.UnitsPerSecond
  ) {
    makeObservable(this, {
      quantityPerSecond: observable,
    });
  }
}

export class Building {
  quantity: s.Units = 1;
  products: BuildingProduct[] = [];

  constructor(readonly root: RootStore, readonly name: BuildingNames) {
    initialBuildingProducts[
      name
    ].forEach(({ resourceName, quantityPerSecond }) =>
      this.products.push(
        new BuildingProduct(this.root, resourceName, quantityPerSecond)
      )
    );

    makeObservable(this, {
      quantity: observable,
      productionPerSecond: computed,
      buy: action,
    });
  }

  // use closure to return memoized func that
  // can act as computed value
  get productionPerSecond() {
    return (resourceName: ResourceNames): s.UnitsPerSecond => {
      const singleBuilding = this.products.reduce((acc, product) => {
        const production =
          product.resourceName === resourceName ? product.quantityPerSecond : 0;
        return acc + production;
      }, 0);

      return singleBuilding * this.quantity;
    };
  }

  buy(quantity: s.Units) {
    // TODO: check and spend resources
    this.quantity += quantity;
  }
}

export class BuildingStore {
  readonly buildings: Building[] = [];

  constructor(readonly root: RootStore) {
    // initialize buildings
    Object.values(BuildingNames).forEach((buildingName) => {
      this.buildings.push(new Building(this.root, buildingName));
    });

    makeObservable(this, {
      buildings: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {}
}
