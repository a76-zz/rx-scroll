export interface State<T> {
  allItems: {[id: string]: T};
  items: {[id: string]: T};
  expanded: string[];
  height: number;
  itemHeight: number;
}
