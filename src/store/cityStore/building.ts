import { action, makeObservable, observable } from 'mobx';
import {
  BuildingNames,
  initialBuildingOutputs,
  tBuildingOutput,
} from '../../gameData';
import type { RootStore } from '../rootStore';
import type { s } from '../../types';
import type { City } from './city';
import { deepCopy } from 'deep-copy-ts';

export type tBuildingSave = {
  buildingName: BuildingNames;
  quantity: s.Units;
  outputs: tBuildingOutput;
};

export class Building {
  root: RootStore;
  city: City;
  quantity: s.Units;
  buildingName: BuildingNames;
  outputs: tBuildingOutput;

  constructor(
    root: RootStore,
    city: City,
    buildingName: BuildingNames,
    quantity: s.Units
  ) {
    // member initialization
    this.root = root;
    this.city = city;
    this.buildingName = buildingName;
    this.quantity = quantity;

    // data initialization
    this.outputs = deepCopy(initialBuildingOutputs[buildingName]);

    makeObservable(this, {
      quantity: observable,
      buy: action,
      tick: action,
      outputs: observable,
    });
  }

  buy(quantity: s.Units): void {
    // TODO: check and spend resources
    this.quantity += quantity;
  }

  tick(delta: s.Milliseconds): void {}

  get serialize(): tBuildingSave {
    return {
      buildingName: this.buildingName,
      quantity: this.quantity,
      outputs: deepCopy(this.outputs),
    };
  }

  load(saveData: tBuildingSave): void {
    this.buildingName = saveData.buildingName;
    this.quantity = saveData.quantity;
    this.outputs = saveData.outputs;
  }
}
