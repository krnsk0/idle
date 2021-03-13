import { action, makeObservable, observable } from 'mobx';
import { BuildingNames, ResourceNames, s } from '../types';
import type { RootStore } from './rootStore';

type BuildingProduct = {
  name: ResourceNames;
  quantity: number;
};

type Building = {
  name: BuildingNames;
  quantity: number;
  products: BuildingProduct[];
};

const initialBuildings: Building[] = [
  {
    name: BuildingNames.farm,
    quantity: 5,
    products: [
      {
        name: ResourceNames.grain,
        quantity: 1,
      },
    ],
  },
  {
    name: BuildingNames.mine,
    quantity: 1,
    products: [
      {
        name: ResourceNames.minerals,
        quantity: 1,
      },
    ],
  },
  {
    name: BuildingNames.lab,
    quantity: 2,
    products: [
      {
        name: ResourceNames.knowledge,
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
