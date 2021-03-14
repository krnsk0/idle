import { action, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid';
import { Building } from './building';
import { BuildingNames, ResourceNames } from '../../gameData';
import { Resource } from './resource';
import type { RootStore } from '../rootStore';
import type { s } from '../../types';

export class City {
  root: RootStore;
  id: s.UUID;
  buildings: Building[] = [];
  resources: Resource[] = [];

  constructor(root: RootStore) {
    this.root = root;
    this.id = nanoid();

    // initialize children
    Object.values(BuildingNames).forEach((buildingName) => {
      this.buildings.push(new Building(root, this, buildingName, 0));
    });
    Object.values(ResourceNames).forEach((resourceName) => {
      this.resources.push(new Resource(root, this, resourceName, 0));
    });

    makeObservable(this, {
      buildings: observable,
      resources: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {
    Object.values(this.buildings).map((building) => building.tick(delta));
    Object.values(this.resources).map((resource) => resource.tick(delta));
  }
}
