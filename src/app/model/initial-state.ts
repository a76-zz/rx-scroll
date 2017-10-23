import { Group } from './group';
export interface InitialState {
  allItems: {[id: string]: Group};
  itemHeight: number;
  headerHeight: number;
  containerHeight: number;
}
