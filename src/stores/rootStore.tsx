class RootStore {
  buildingsStore: BuildingsStore;
  resourceStore: ResourceStore;

  constructor() {
    this.buildingsStore = new BuildingsStore(this);
    this.resourceStore = new ResourceStore(this);
  }
}

class BuildingsStore {
  constructor(private rootStore: RootStore) {}
}

class ResourceStore {
  constructor(private rootStore: RootStore) {}
}
