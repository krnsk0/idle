import type { s } from './semanticTypes';

export enum ResourceNames {
  grain = 'grain',
  minerals = 'minerals',
  knowledge = 'knowledge',
}

export enum BuildingNames {
  farm = 'farm',
  mine = 'mine',
  lab = 'lab',
}

export type tBuildingOutputs = {
  [key in BuildingNames]: tBuildingOutput;
};

export type tBuildingOutput = {
  [key in ResourceNames]?: s.UnitsPerSecond;
};

export const initialBuildingOutputs: tBuildingOutputs = {
  [BuildingNames.farm]: {
    [ResourceNames.grain]: 1,
  },
  [BuildingNames.mine]: {
    [ResourceNames.minerals]: 1,
  },
  [BuildingNames.lab]: {
    [ResourceNames.knowledge]: 1,
  },
};
