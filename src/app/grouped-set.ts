import { State, Action, Scroll, Toggle } from './model';

export function groupedSetStateFunc<T>(state: State<T>, action: Action) {

  if (action instanceof Scroll) {
    return processScroll(state, action);
  }

  if (action instanceof Toggle) {
    return processToggle(state, action);
  }

  // To support reusability
  return state;
}

function processScroll<T>(state: State<T>, action: Scroll) {
  return state;
}

function processToggle<T>(state: State<T>, action: Toggle) {
  return state;
}
