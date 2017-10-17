export interface InitialState<T> {
  allItems: {[id: string]: T};
  itemHeight: number;
  headerHeight: number;
  containerHeight: number;
}
