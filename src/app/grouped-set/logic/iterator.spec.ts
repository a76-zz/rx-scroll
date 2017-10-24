import { State } from '../model';
import { createIterator } from './iterator';
import { generateArray } from './generate-array';

describe('grouped set iterator', () => {
    it('different groups', () => {
        const state: State = {
            keys: ['first', 'second'],
            reverseMap: undefined,
            position: 0,
            expanded: ['second'],
            start: {
                index: 0,
                groupPosition: 0,
                itemIndex: -1,
                shift: 0
            },
            end: {
                index: 1,
                groupPosition: 2,
                itemIndex: 5,
                shift: 0
            },
            height: 104,
            allItems: {
                first: {
                    count: 10
                },
                second: {
                    count: 100
                }
            },
            itemHeight: 1,
            headerHeight: 2,
            containerHeight: 10
        };

        const result = createIterator(state, group => generateArray(group.count, index => index));

        expect(result).toEqual([{ count: 10 }, { count: 100 }, 0, 1, 2, 3, 4, 5]);
    });

    it('the same group', () => {
        const state: State = {
            keys: ['first', 'second'],
            position: 0,
            reverseMap: undefined,
            expanded: ['second'],
            start: {
                index: 1,
                groupPosition: 2,
                itemIndex: 47,
                shift: 0
            },
            end: {
                index: 1,
                groupPosition: 4,
                itemIndex: 55,
                shift: 0
            },
            height: 104,
            allItems: {
                first: {
                    count: 10
                },
                second: {
                    count: 100
                }
            },
            itemHeight: 1,
            headerHeight: 2,
            containerHeight: 10
        };

        const result = createIterator(state, group => generateArray(group.count, index => index));

        expect(result).toEqual([{ count: 100 }, 47, 48, 49, 50, 51, 52, 53, 54 ]);
    });
});
