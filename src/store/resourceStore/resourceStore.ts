import { action, makeObservable, observable } from 'mobx';
import { list, object, serializable } from 'serializr';
import { ResourceNames } from '../../gameData';
import type { s } from '../../types';
import type { RootStore } from '../rootStore';
import { Resource } from './resource';

export class ResourceStore {
  @serializable(list(object(Resource))) readonly resources: Resource[] = [];

  constructor(readonly root: RootStore) {
    // initialize all resources
    Object.values(ResourceNames).forEach((resourceName) => {
      this.resources.push(new Resource(this.root, resourceName));
    });

    makeObservable(this, {
      resources: observable,
      tick: action,
    });
  }

  tick(delta: s.Milliseconds): void {
    this.resources.forEach((resource) => {
      resource.tick(delta);
    });
  }
}
