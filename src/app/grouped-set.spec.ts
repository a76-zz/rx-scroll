import { groupedSetStateFunc } from './grouped-set';
import { InitialState, Initialize, Group, Toggle, Scroll, State } from './model';

describe('grouped set', () => {
    it('initialize case 1', () => {
        const action = new Initialize({
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
        });

        const { start, end } = groupedSetStateFunc(undefined, action);

        expect(start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(end).toEqual({
            index: 1,
            groupPosition: 2,
            itemIndex: -1,
            shift: 6
        });
    });

    it('initialize case 2', () => {
        const action = new Initialize({
            allItems: {
                first: {
                    count: 10
                },
                second: {
                    count: 100
                }
            },
            itemHeight: 1,
            headerHeight: 4,
            containerHeight: 6
        });

        const { start, end } = groupedSetStateFunc(undefined, action);

        expect(start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(end).toEqual({
            index: 1,
            groupPosition: 4,
            itemIndex: -1,
            shift: -2
        });
    });

    it('initialize case 3', () => {
        const action = new Initialize({
            allItems: {
                first: {
                    count: 10
                },
                second: {
                    count: 100
                }
            },
            itemHeight: 1,
            headerHeight: 4,
            containerHeight: 4
        });

        const { start, end } = groupedSetStateFunc(undefined, action);

        expect(start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(end).toEqual({
            index: 1,
            groupPosition: 4,
            itemIndex: -1,
            shift: 0
        });
    });

    it('expand case 1', () => {
        const state: State = {
            allItems: {
                first: {
                    count: 10
                },
                second: {
                    count: 100
                }
            },

            itemHeight: 1,
            headerHeight: 4,
            containerHeight: 4,

            position: 0,
            expanded: [],
            height: 8,
            keys: ['first', 'second'],
            reverseMap: undefined,

            start: {
                index: 0,
                groupPosition: 0,
                itemIndex: -1,
                shift: 0
            },
            end: undefined
        };

        const { expanded, height, start, end } = groupedSetStateFunc(state, new Toggle('second'));

        expect(expanded).toEqual(['second']);
        expect(height).toEqual(108);

        expect(start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(end).toEqual({
            index: 1,
            groupPosition: 4,
            itemIndex: -1,
            shift: 0
        });
    });

    it('expand case 2', () => {
        const state: State = {
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
            containerHeight: 10,

            position: 0,
            expanded: [],
            height: 8,
            keys: ['first', 'second'],
            reverseMap: undefined,

            start: {
                index: 0,
                groupPosition: 0,
                itemIndex: -1,
                shift: 0
            },
            end: undefined
        };

        const { expanded, height, start, end } = groupedSetStateFunc(state, new Toggle('first'));

        expect(expanded).toEqual(['first']);
        expect(height).toEqual(18);

        expect(start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(end).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: 7,
            shift: 0
        });
    });

    it('expand case 3', () => {
        const state: State = {
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
            containerHeight: 10,

            position: 0,
            expanded: [],
            height: 4,
            keys: ['first', 'second'],
            reverseMap: undefined,

            start: {
                index: 0,
                groupPosition: 0,
                itemIndex: -1,
                shift: 0
            },
            end: undefined
        };

        const { expanded, height, start, end } = groupedSetStateFunc(state, new Toggle('second'));
        expect(expanded).toEqual(['second']);

        expect(start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(end).toEqual({
            index: 1,
            groupPosition: 2,
            itemIndex: 5,
            shift: 0
        });

        expect(height).toEqual(104);
    });

    it('scroll case 1', () => {
        const state: State = {
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
            containerHeight: 10,

            position: 0,
            expanded: ['second'],
            height: 104,
            keys: ['first', 'second'],
            reverseMap: undefined,

            start: {
                index: 0,
                groupPosition: 0,
                itemIndex: -1,
                shift: 0
            },
            end: undefined
        };

        const { start, end, position } = groupedSetStateFunc(state, new Scroll(52));

        expect(start).toEqual({
            index: 1,
            groupPosition: 2,
            itemIndex: 47,
            shift: 0
        });

        expect(end).toEqual({
            index: 1,
            groupPosition: 2,
            itemIndex: 57,
            shift: 0
        });

        expect(position).toEqual(52);
    });

    it('scroll case 2', () => {
        const state: State = {
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
            containerHeight: 10,

            position: 0,
            expanded: ['first'],
            height: 18,
            keys: ['first', 'second'],
            reverseMap: undefined,

            start: {
                index: 0,
                groupPosition: 0,
                itemIndex: -1,
                shift: 0
            },
            end: {
                index: 0,
                groupPosition: 0,
                itemIndex: 7,
                shift: 0
            }
        };

        const { expanded, height, start, end } = groupedSetStateFunc(state, new Scroll(5));

        expect(height).toEqual(18);

        expect(start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: 2,
            shift: 0
        });

        expect(end).toEqual({
            index: 1,
            groupPosition: 12,
            itemIndex: -1,
            shift: 1
        });
    });
});
