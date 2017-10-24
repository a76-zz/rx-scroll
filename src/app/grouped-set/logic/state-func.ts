import { State, InitialState, Group, Action, Scroll, Toggle, Index, Initialize, Resize } from '../model';

export function groupedSetStateFunc(state: State, action: Action): State {

  if (action instanceof Initialize) {
    return processInitialize(state, action.state);
  }

  if (action instanceof Scroll) {
    return processScroll(state, action.position);
  }

  if (action instanceof Toggle) {
    return processToggle(state, action.id);
  }

  if (action instanceof Resize) {
    return processResize(state, action.containerHeight);
  }

  // To support reusability
  return state;
}

function toReverseMap(items: {[id: string]: Group}, keys: string[]): Map<Group, string> {
  const result = new Map<Group, string>();

  for (const key of keys) {
    result.set(items[key], key);
  }
  return result;
}

function processInitialize<T extends Group>(_: State, state: InitialState): State {
  const { allItems, headerHeight } = state;

  const keys = Object.keys(allItems);
  const expanded = [];
  const position = 0;
  const height = keys.length * headerHeight;
  const reverseMap = toReverseMap(allItems, keys);
  const result: State = { keys, reverseMap, expanded, position, height, ...state };

  return processScroll(result, position);
}

function processScroll(state: State, position: number): State {
  const { height, headerHeight, itemHeight, containerHeight } = state;
  const to = position + containerHeight;

  const start: Index = findIndex(state, 0, position, Math.floor);
  const end: Index = findIndex(state, 0, to, Math.ceil);

  return Object.assign({}, state, {start, end, position});
}

function processResize(state: State, containerHeight: number): State {
  const result: State = Object.assign({}, state, { containerHeight });
  const { position, height } = result;

  result.position = Math.min(Math.max(height - containerHeight, 0), position);
  result.end = findIndex(result, 0, result.position + containerHeight, Math.ceil);

  return result;
}

function processToggle(state: State, id: string): State {
  const { expanded, keys, itemHeight, allItems, height, containerHeight } = state;
  const index = expanded.indexOf(id);
  const found = index !== -1;

  const nextExpanded = found ? [...expanded.slice(0, index), ...expanded.slice(index + 1)] : [id, ...expanded];
  const itemsHeight = allItems[id].count * itemHeight;

  const nextHeight = found ? height - itemsHeight : height + itemsHeight;
  const result: State = Object.assign({}, state, {expanded: nextExpanded, height: nextHeight});

  result.end = findIndex(result, 0, result.position + containerHeight, Math.ceil);
  return result;
}

function findIndex(
  { keys, allItems, headerHeight, itemHeight, expanded }: State,
  position: number, to: number, roundFunc: (number) => number, index: number = -1): Index {

  let key;
  let groupPosition = position;
  while (position <= to && index < (keys.length - 1)) {
    index++;
    groupPosition = position;
    key = keys[index];

    position += headerHeight;
    if (position <= to) {
      if (expanded.indexOf(key) !== -1) {
        position += allItems[key].count * itemHeight;
      }
    }
  }

  const capacity = expanded.indexOf(key) !== -1 ? Math.max(0, roundFunc((to - groupPosition - headerHeight) / itemHeight)) : 0;
  const shift = to > groupPosition ? to - (groupPosition + headerHeight + capacity * itemHeight) : 0;

  return {
    index,
    groupPosition,
    itemIndex: capacity - 1,
    shift
  };
}

// https://jsfiddle.net/u8100v8u/14/
