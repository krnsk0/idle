import { action, computed, makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';
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
      buy: action,
    });
  }

  /**
   * How much if any does this building produce of a given resource?
   *
   * (Note: a memoizable derivation but takes an argument, so must be
   * handled with `computedFn` rather than marked as `computed` in constructor)
   */
  productionPerSecond = computedFn(
    (resourceName: ResourceNames): s.UnitsPerSecond => {
      const singleBuilding = this.products.reduce((acc, product) => {
        const production =
          product.resourceName === resourceName ? product.quantityPerSecond : 0;
        return acc + production;
      }, 0);

      return singleBuilding * this.quantity;
    }
  );

  /**
   * Increments building, decrements costs
   */
  buy(quantity: s.Units) {
    // TODO: check and spend resources
    this.quantity += quantity;
  }
}
