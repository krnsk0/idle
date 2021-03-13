import { action, makeObservable, observable } from 'mobx';
import { ResourceNames, s } from '../types';
import type { RootStore } from './rootStore';

type Resource = {
  name: ResourceNames;
  quantity: number;
};

const initialResources: Resource[] = [
  { name: ResourceNames.grain, quantity: 0 },
  { name: ResourceNames.minerals, quantity: 0 },
  { name: ResourceNames.knowledge, quantity: 0 },
];

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

  tick(delta: s.Milliseconds): void {}
}
