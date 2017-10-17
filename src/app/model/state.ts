import { InitialState } from './initial-state';
import { Group } from './group';

export interface State<T extends Group> extends InitialState<T> {
  items: {[id: string]: T};
  keys: string[];
  expanded: string[];
  height: number;
}
