export default class RootStore {
  resources: ResourceStore;
  buildings: BuildingStore;

  constructor() {
    this.resources = new ResourceStore(this)
    this.buildings = new BuildingStore(this)
  }
}

class ResourceStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root;
  }
}

class BuildingStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root;
  }
}
