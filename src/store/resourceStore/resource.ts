import { action, computed, makeObservable, observable } from 'mobx';
import type { ResourceNames } from '../../gameData';
import type { s } from '../../types';
import type { RootStore } from '../rootStore';

export class Resource {
  quantity: s.Units = 0;

  constructor(readonly root: RootStore, readonly name: ResourceNames) {
    makeObservable(this, {
      quantity: observable,
      tick: action,
      productionPerSecond: computed,
    });
  }

  tick(delta: s.Milliseconds): void {
    this.quantity += this.productionPerSecond * (delta / 1000);
  }

  get productionPerSecond(): s.UnitsPerSecond {
    return this.root.buildingStore.buildings.reduce(
      (outerSum, building) =>
        outerSum + building.productionPerSecond(this.name),
      0
    );
  }
}
