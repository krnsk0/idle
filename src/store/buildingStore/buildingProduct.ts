import { makeObservable, observable } from 'mobx';
import type { ResourceNames } from '../../gameData';
import type { s } from '../../types';
import type { RootStore } from '../rootStore';

export class BuildingProduct {
  constructor(
    readonly root: RootStore,
    readonly resourceName: ResourceNames,
    readonly quantityPerSecond: s.UnitsPerSecond
  ) {
    makeObservable(this, {
      quantityPerSecond: observable,
    });
  }
}
