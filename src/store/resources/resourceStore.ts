import { action, computed, makeObservable, observable } from 'mobx';
import { ResourceNames } from '../../gameData';
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

export class ResourceStore {
  readonly resources: Resource[] = [];

  constructor(readonly root: RootStore) {
    // initialize all resources
    Object.values(ResourceNames).forEach((resourceName) => {
      this.resources.push(new Resource(this.root, resourceName));
    });

    makeObservable(this, {
      resources: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {
    this.resources.forEach((resource) => {
      resource.tick(delta);
    });
  }
}
