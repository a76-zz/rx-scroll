import { InitialState } from './initial-state';
import { Index } from './index.interface';
import { Group } from './group';

export interface State extends InitialState {
  start?: Index;
  end?: Index;
  keys: string[];
  reverseMap: Map<Group, string>;
  expanded: string[];
  height: number;
  position: number;
}
