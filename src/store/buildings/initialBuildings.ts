import { BuildingNames, ResourceNames } from '../../types';
import type { Building } from './buildingStore';

export const initialBuildings: Building[] = [
  {
    name: BuildingNames.farm,
    quantity: 5,
    products: [
      {
        name: ResourceNames.grain,
        quantity: 1,
      },
    ],
  },
  {
    name: BuildingNames.mine,
    quantity: 1,
    products: [
      {
        name: ResourceNames.minerals,
        quantity: 1,
      },
    ],
  },
  {
    name: BuildingNames.lab,
    quantity: 2,
    products: [
      {
        name: ResourceNames.knowledge,
        quantity: 1,
      },
    ],
  },
];
