import { State, Group, IteratorResult } from './model';

export function createIterator<TItem>(
    { start, end, keys, allItems, expanded, position }: State,
    getChildren: (group: Group) => TItem[])
    : IteratorResult<TItem>[] {
    const result: IteratorResult<TItem>[] = [];

    let key;
    let group;
    let children;

    for (let index = start.index; index <= end.index; ++index) {
      key = keys[index];
      group = allItems[key];
      if (index === start.index && start.groupPosition >= position) {
        result.push(group);
      }

      if (index === end.index && index !== start.index && end.groupPosition >= position) {
        result.push(group);
      }

      if (index > start.index && index < end.index) {
        result.push(group);
      }

      if (expanded.indexOf(key) !== -1) {
        children = getChildren(group);

        if (index === start.index) {
          if (start.index !== end.index) {
            result.push(...children.slice(Math.max(start.itemIndex, 0)));
          } else {
            result.push(...children.slice(Math.max(start.itemIndex, 0), end.itemIndex));
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
