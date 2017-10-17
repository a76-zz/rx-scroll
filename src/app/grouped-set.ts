import { State, Group, Action, Scroll, Toggle, Initialize } from './model';

export function groupedSetStateFunc<T extends Group>(state: State<T>, action: Action<T>): State<T> {

  if (action instanceof Initialize) {
    return processInitialize(state, action);
  }

  if (action instanceof Scroll) {
    return processScroll(state, action);
  }

  if (action instanceof Toggle) {
    return processToggle(state, action);
  }

  // To support reusability
  return state;
}

function processInitialize<T extends Group>(state: State<T>, action: Initialize<T>): State<T> {
  const { allItems, itemHeight, headerHeight, containerHeight } = action.state;

  const keys = Object.keys(allItems);
  const capacity = Math.min(Math.ceil(containerHeight / headerHeight), keys.length);

  const items = keys.slice(0, capacity)
    .reduce((result, key) => { result[key] = allItems[key]; return result; }, {});

  return {
    allItems,
    keys,
    items,
    height: keys.length * headerHeight,
    expanded: [],
    itemHeight,
    headerHeight,
    containerHeight
  };
}

function scrollFragment<T extends Group>(
  index: number,
  from: number,
  to: number,
  { allItems, height, expanded, itemHeight, headerHeight, containerHeight }: State<T>,
  tailIndex: number = -1):
  {tailIndex: number, index: number, position: number} {
    const keys = Object.keys(allItems);
    let key;
    let position = from;

    while (position < to) {
      key = keys[index];
      if (tailIndex === -1) {
        position += headerHeight;
      }

      if (position < to) {
        if (expanded.indexOf(key) === -1) {
          const capacity = Math.floor((to - position) / itemHeight);
          const count = allItems[key].count - Math.max(tailIndex, 0);

          position += Math.min(count, capacity) * itemHeight;
          if (capacity < count) {
            tailIndex = capacity - 1;
          }
        }
      } else {
        tailIndex = 0;
      }

      index++;
    }

    return {
      tailIndex,
      index,
      position
    };

}

function processScroll<T extends Group>(state: State<T>, action: Scroll): State<T> {
  const from = action.position * state.height;

  const { tailIndex, index, position } = scrollFragment(0, 0, from, state);

  const { endTailPosition, endIndex, endPosition} = scrollFragment(tailIndex )
}

function processToggle<T extends Group>(state: State<T>, action: Toggle): State<T> {
  return state;
}

function findGroupIndex<T extends Group>(
  { keys, allItems, headerHeight, itemHeight, expanded }: State<T>, position: number, to: number, index: number = -1):
  { index: number, groupPosition: number } {
  let key;
  let groupPosition = position;
  while (position < to) {
    index++;
    groupPosition = position;
    key = keys[index];

    position += headerHeight;
    if (position < to) {
      if (expanded.indexOf(key) !== -1) {
        position += allItems[key].count * itemHeight;
      }
    }
  }

  return {
    index,
    groupPosition
  };
}

function findItemIndex<T extends Group>(

)

// https://jsfiddle.net/u8100v8u/14/
