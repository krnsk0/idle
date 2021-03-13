import { ResourceNames } from '../../types';
import type { Resource } from './resourceStore';

export const initialResources: Resource[] = [
  { name: ResourceNames.grain, quantity: 0 },
  { name: ResourceNames.minerals, quantity: 0 },
  { name: ResourceNames.knowledge, quantity: 0 },
];
