import { State, Group, IteratorResult } from './model';

export function createIterator<T extends Group, TItem>(
    { start, end, keys, allItems, expanded }: State<T>,
    getChildren: (group: T) => TItem[])
    : IteratorResult<T, TItem>[] {
    const result: IteratorResult<T, TItem>[] = [];

    let key;
    let group;
    let children;

    for (let index = start.index; index <= end.index; ++index) {
      key = keys[index];
      group = allItems[key];
      result.push(group);

      if (expanded.indexOf(key) !== -1) {
        children = getChildren(group);

        if (index === start.index) {
          if (start.index !== end.index) {
            result.push(...children.slice(start.itemIndex));
          } else {
            result.push(...children.slice(start.itemIndex, end.itemIndex));
          }
        }

        if (index === end.index && index !== start.index) {
          result.push(...children.slice(0, end.itemIndex + 1));
        }

        if (index !== start.index && index !== end.index) {
          result.push(...children);
        }
      }
    }

    return result;
}
