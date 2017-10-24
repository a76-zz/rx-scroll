export * from './actions';
export { State } from './state';
export { InitialState } from './initial-state';
export { Index } from './index.interface';

import { Group } from './group';
export { Group };

export type IteratorResult<TItem> = Group | TItem;
