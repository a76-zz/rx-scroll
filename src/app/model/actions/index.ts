import { Scroll } from './scroll';
import { Toggle } from './toggle';
import { Initialize } from './initialize';
import { Resize } from './resize';

export { Scroll, Toggle, Initialize, Resize };

export type Action = Scroll | Toggle | Resize | Initialize;
