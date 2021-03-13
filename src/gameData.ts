import type { s } from './types';

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

export const initialBuildingProducts: {
  [key in BuildingNames]: {
    resourceName: ResourceNames;
    quantityPerSecond: s.UnitsPerSecond;
  }[];
} = {
  [BuildingNames.farm]: [
    {
      resourceName: ResourceNames.grain,
      quantityPerSecond: 1,
    },
  ],
  [BuildingNames.mine]: [
    {
      resourceName: ResourceNames.minerals,
      quantityPerSecond: 1,
    },
  ],
  [BuildingNames.lab]: [
    {
      resourceName: ResourceNames.knowledge,
      quantityPerSecond: 1,
    },
  ],
};
