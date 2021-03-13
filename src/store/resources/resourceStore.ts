import { action, makeObservable, observable } from 'mobx';
import { ResourceNames, s } from '../../types';
import type { RootStore } from '../rootStore';

export class Resource {
  quantity: s.Units = 0;

  constructor(readonly name: ResourceNames, readonly root: RootStore) {
    makeObservable(this, {
      quantity: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {
    const perSecond = this.root.buildingStore.getProductionPerSecond(this.name);
    this.quantity += perSecond * (delta / 1000);
  }
}

export class ResourceStore {
  readonly resources: Resource[] = [];

  constructor(readonly root: RootStore) {
    // initialize all resources
    Object.values(ResourceNames).forEach((resourceName) => {
      this.resources.push(new Resource(resourceName, this.root));
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
