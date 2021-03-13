import { BuildingStore } from './buildingStore';
import { ResourceStore } from './resourceStore';

export class RootStore {
  resourceStore: ResourceStore;
  buildingStore: BuildingStore;

  constructor() {
    this.resourceStore = new ResourceStore(this);
    this.buildingStore = new BuildingStore(this);
  }
}
