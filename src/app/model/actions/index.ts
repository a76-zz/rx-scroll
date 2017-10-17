import { Scroll } from './scroll';
import { Toggle } from './toggle';
import { Initialize } from './initialize';

export { Scroll, Toggle, Initialize };

export type Action<T> = Scroll | Toggle | Initialize<T>;
