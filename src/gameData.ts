import type { s } from './semanticTypes';

/**
 * Constant names for game entity types
 */
export enum ResourceNames {
  grain = 'grain',
  wood = 'wood',
  minerals = 'minerals',
}

export enum BuildingNames {
  farm = 'farm',
  woodcutter = 'woodcutter',
  mine = 'mine',
}

/**
 * Initial building outputs
 */
export type tBuildingOutput = {
  [key in ResourceNames]?: s.UnitsPerSecond;
};
export const initialBuildingOutputs: {
  [key in BuildingNames]: tBuildingOutput;
} = {
  [BuildingNames.farm]: {
    [ResourceNames.grain]: 1,
  },
  [BuildingNames.woodcutter]: {
    [ResourceNames.wood]: 1,
  },
  [BuildingNames.mine]: {
    [ResourceNames.minerals]: 1,
  },
};

/**
 * Initial costs of buildings
 */
export type tBuildingCostResourceRow = {
  resourceName: ResourceNames;
  cost: s.Units;
};
export type tBuildingBuildCosts = {
  multiplier: s.multiplier;
  resources: tBuildingCostResourceRow[];
};
export const initialBuildingBuildCosts: {
  [key in BuildingNames]: tBuildingBuildCosts;
} = {
  [BuildingNames.farm]: {
    multiplier: 1.1,
    resources: [{ resourceName: ResourceNames.wood, cost: 1 }],
  },
  [BuildingNames.woodcutter]: {
    multiplier: 1.1,
    resources: [{ resourceName: ResourceNames.wood, cost: 1 }],
  },
  [BuildingNames.mine]: {
    multiplier: 1.1,
    resources: [
      { resourceName: ResourceNames.wood, cost: 1 },
      { resourceName: ResourceNames.grain, cost: 2 },
    ],
  },
};
