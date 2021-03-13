import { action, makeObservable, observable } from 'mobx';
import type { s } from 'src/types';
import type { RootStore } from './rootStore';

type Resource = {
  name: string;
  quantity: number;
};

const initialResources: Resource[] = [
  { name: 'grain', quantity: 0 },
  { name: 'minerals', quantity: 0 },
  { name: 'knowledge', quantity: 0 },
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
