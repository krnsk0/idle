import { action, makeObservable, observable } from 'mobx';
import type { ResourceNames, s } from '../../types';
import { initialResources } from './initialResources';
import type { RootStore } from '../rootStore';

export type Resource = {
  name: ResourceNames;
  quantity: s.Units;
};

export class ResourceStore {
  root: RootStore;
  resources: Resource[] = initialResources;

  constructor(root: RootStore) {
    this.root = root;

    makeObservable(this, {
      resources: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {
    this.resources.forEach((resource) => {
      const perSecond = this.root.buildingStore.getProductionPerSecond(
        resource.name
      );
      resource.quantity += perSecond * (delta / 1000);
    });
  }
}
