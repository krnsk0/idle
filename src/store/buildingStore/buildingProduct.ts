import { makeObservable, observable } from 'mobx';
import { serializable } from 'serializr';
import type { ResourceNames } from '../../gameData';
import type { s } from '../../types';
import type { RootStore } from '../rootStore';

export class BuildingProduct {
  @serializable resourceName: ResourceNames;
  @serializable quantityPerSecond: s.UnitsPerSecond;

  constructor(
    readonly root: RootStore,
    resourceName: ResourceNames,
    quantityPerSecond: s.UnitsPerSecond
  ) {
    // initialize
    this.resourceName = resourceName;
    this.quantityPerSecond = quantityPerSecond;

    makeObservable(this, {
      quantityPerSecond: observable,
    });
  }
}
