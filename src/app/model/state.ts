import { InitialState } from './initial-state';
import { Index } from './index.interface';
import { Group } from './group';

export interface State<T extends Group> extends InitialState<T> {
  start?: Index;
  end?: Index;
  keys: string[];
  expanded: string[];
  height: number;
  position: number;
}
