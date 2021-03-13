import { action, makeObservable, observable } from 'mobx';
import type { BuildingNames, ResourceNames, s } from '../../types';
import { initialBuildings } from './initialBuildings';
import type { RootStore } from '../rootStore';

type BuildingProduct = {
  name: ResourceNames;
  quantity: number;
};

export type Building = {
  name: BuildingNames;
  quantity: number;
  products: BuildingProduct[];
};

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
