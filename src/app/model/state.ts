import { InitialState } from './initial-state';
import { Group } from './group';

export interface State<T extends Group> extends InitialState<T> {
  items: {[id: string]: T};
  expanded: string[];
  height: number;
}
