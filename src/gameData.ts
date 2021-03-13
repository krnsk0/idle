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

export const initialProducts = {
  [BuildingNames.farm]: [
    {
      name: ResourceNames.grain,
      quantity: 1,
    },
  ],
  [BuildingNames.mine]: [
    {
      name: ResourceNames.minerals,
      quantity: 1,
    },
  ],
  [BuildingNames.lab]: [
    {
      name: ResourceNames.knowledge,
      quantity: 1,
    },
  ],
};
