import { action, computed, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid';
import { identifier, serializable } from 'serializr';
import type { ResourceNames } from '../../gameData';
import type { s } from '../../types';
import type { RootStore } from '../rootStore';

export class Resource {
  @serializable quantity: s.Units = 0;
  @serializable readonly resourceName: ResourceNames;

  constructor(readonly root: RootStore, resourceName: ResourceNames) {
    // initialize
    this.resourceName = resourceName;

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
    return this.root.buildingStore.buildings.reduce(
      (outerSum, building) =>
        outerSum + building.productionPerSecond(this.resourceName),
      0
    );
  }
}
