import { action, computed, makeObservable, observable } from 'mobx';
import { Building, tBuildingSave } from './building';
import { BuildingNames, ResourceNames } from '../../gameData';
import { Resource, tResourceSave } from './resource';
import type { RootStore } from '../rootStore';
import type { s } from '../../semanticTypes';
import { nanoid } from 'nanoid';

export type tCitySave = {
  id: s.UUID;
  resources: tResourceSave[];
  buildings: tBuildingSave[];
};

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
      serialize: computed,
    });
  }

  tick(delta: s.Milliseconds): void {
    Object.values(this.buildings).map((building) => building.tick(delta));
    Object.values(this.resources).map((resource) => resource.tick(delta));
  }

  get serialize(): tCitySave {
    return {
      id: this.id,
      resources: this.resources.map((resource) => resource.serialize),
      buildings: this.buildings.map((building) => building.serialize),
    };
  }

  load(saveData: tCitySave): void {
    this.id = saveData.id;

    // load saved resources
    this.resources.map((resource) => {
      console.log('loading resource: ', resource.resourceName);
      const savedResource = saveData.resources.find(
        (savedResource) => savedResource.resourceName === resource.resourceName
      );
      if (savedResource) {
        resource.load(savedResource);
      }
    });

    // load saved buildings
    this.buildings.map((building) => {
      const savedbuilding = saveData.buildings.find(
        (savedbuilding) => savedbuilding.buildingName === building.buildingName
      );
      if (savedbuilding) {
        building.load(savedbuilding);
      }
    });
  }
}
