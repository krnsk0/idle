import { action, makeObservable, observable } from 'mobx';
import {
  BuildingNames,
  initialBuildingBuildCosts,
  initialBuildingOutputs,
  tBuildingBuildCosts,
  tBuildingCostResourceRow,
  tBuildingOutput,
} from '../../gameData';
import type { s } from '../../semanticTypes';
import type { City } from './city';
import { deepCopy } from 'deep-copy-ts';
import { createModelSchema, primitive, raw } from 'serializr';
import type { GameState } from '../gameState';

export class Building {
  rootRef: GameState;
  city: City;
  quantity: s.Units;
  buildingName: BuildingNames;
  buildCosts: tBuildingBuildCosts;
  outputs: tBuildingOutput;

  constructor(
    rootRef: GameState,
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
}

createModelSchema<Building>(
  Building,
  {
    quantity: primitive(),
    buildingName: primitive(),
    buildCosts: raw(),
    outputs: raw(),
  },
  (context) => {
    return new Building(
      context.rootContext.target,
      (<{ target: City }>context.parentContext).target,
      <BuildingNames>'',
      0
    );
  }
);
