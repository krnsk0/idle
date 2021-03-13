import { action, makeObservable, observable } from 'mobx';
import type { s } from 'src/types';
import type { RootStore } from './rootStore';

type BuildingProduct = {
  name: string;
  quantity: number;
};

type Building = {
  name: string;
  quantity: number;
  products: BuildingProduct[];
};

const initialBuildings: Building[] = [
  {
    name: 'farm',
    quantity: 5,
    products: [
      {
        name: 'grain',
        quantity: 1,
      },
    ],
  },
  {
    name: 'mine',
    quantity: 1,
    products: [
      {
        name: 'minerals',
        quantity: 1,
      },
    ],
  },
  {
    name: 'lab',
    quantity: 2,
    products: [
      {
        name: 'knowledge',
        quantity: 1,
      },
    ],
  },
];

export class BuildingStore {
  root: RootStore;
  buildings: Building[] = initialBuildings;

  constructor(root: RootStore) {
    this.root = root;

    makeObservable(this, {
      buildings: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {}
}
