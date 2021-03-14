import { action, makeObservable, observable } from 'mobx';
import { BuildingNames } from '../../gameData';
import { Building } from './building';
import type { s } from '../../types';
import type { RootStore } from '../rootStore';
import { list, object, serializable } from 'serializr';

export class BuildingStore {
  @serializable(list(object(Building))) readonly buildings: Building[] = [];

  constructor(readonly root: RootStore) {
    // initialize buildings from game data
    Object.values(BuildingNames).forEach((buildingName) => {
      this.buildings.push(new Building(this.root, buildingName));
    });

    makeObservable(this, {
      buildings: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {}
}
