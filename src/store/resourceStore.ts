import { makeObservable, observable } from 'mobx';
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
    });
  }
}
