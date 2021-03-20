import { action, computed, makeObservable, observable } from 'mobx';
import {
  BuildingNames,
  initialBuildingBuildCosts,
  initialBuildingOutputs,
  ResourceNames,
  tBuildingBuildCosts,
  tBuildingCostResourceRow,
  tBuildingOutput,
} from '../../gameData';
import type { RootStore } from '../rootStore';
import type { s } from '../../semanticTypes';
import type { City } from './city';
import { deepCopy } from 'deep-copy-ts';

export class Building {
  rootRef: RootStore;
  city: City;
  quantity: s.Units;
  buildingName: BuildingNames;
  buildCosts: tBuildingBuildCosts;
  outputs: tBuildingOutput;

  constructor(
    rootRef: RootStore,
    city: City,
    buildingName: BuildingNames,
    quantity: s.Units
  ) {
    // member initialization
    this.rootRef = rootRef;
    this.city = city;
    this.buildingName = buildingName;
    this.quantity = quantity;

    // data initialization
    this.outputs = deepCopy(initialBuildingOutputs[buildingName]);
    this.buildCosts = deepCopy(initialBuildingBuildCosts[buildingName]);

    makeObservable(this, {
      quantity: observable,
      buy: action,
      tick: action,
      outputs: observable,
    });
  }

  get buildingCosts(): tBuildingCostResourceRow[] {
    const multiplier = this.buildCosts.multiplier;
    return this.buildCosts.resources.map(({ resourceName, cost }) => {
      return {
        resourceName,
        cost: (cost ? cost : 0) * Math.pow(multiplier, this.quantity),
      };
    });
  }

  buy(quantity: s.Units): void {
    // TODO: check and spend resources
    this.quantity += quantity;
  }

  tick(delta: s.Milliseconds): void {}
}
