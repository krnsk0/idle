import { action, computed, makeObservable, observable } from 'mobx';
import {
  BuildingNames,
  ResourceNames,
  initialBuildingProducts,
} from '../../gameData';
import type { s } from '../../types';
import type { RootStore } from '../rootStore';
import { BuildingProduct } from './buildingProduct';

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
      products: observable,
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
