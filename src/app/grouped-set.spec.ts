import { groupedSetStateFunc } from './grouped-set';
import { InitialState, Initialize, Group, Toggle, Scroll } from './model';

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

        const result = groupedSetStateFunc(undefined, action);

        expect(result.start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(result.end).toEqual({
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

        const result = groupedSetStateFunc(undefined, action);

        expect(result.start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(result.end).toEqual({
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

        const result = groupedSetStateFunc(undefined, action);

        expect(result.start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(result.end).toEqual({
            index: 1,
            groupPosition: 4,
            itemIndex: -1,
            shift: 0
        });
    });

    it('expand case 1', () => {
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

        const state = groupedSetStateFunc(undefined, action);
        const toggle = new Toggle('second');

        const result = groupedSetStateFunc(state, toggle);

        expect(result.expanded).toEqual(['second']);
        expect(result.height).toEqual(108);

        expect(result.start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(result.end).toEqual({
            index: 1,
            groupPosition: 4,
            itemIndex: -1,
            shift: 0
        });
    });

    it('expand case 2', () => {
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

        const state = groupedSetStateFunc(undefined, action);
        const toggle = new Toggle('second');

        const result = groupedSetStateFunc(state, toggle);

        expect(result.expanded).toEqual(['second']);
        expect(result.height).toEqual(104);

        expect(result.start).toEqual({
            index: 0,
            groupPosition: 0,
            itemIndex: -1,
            shift: 0
        });

        expect(result.end).toEqual({
            index: 1,
            groupPosition: 2,
            itemIndex: 5,
            shift: 0
        });
    });

    it('scroll case 1', () => {
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

        const state = groupedSetStateFunc(undefined, action);
        const toggle = new Toggle('second');

        const toggleResult = groupedSetStateFunc(state, toggle);

        const scroll = new Scroll(0.5);

        const result = groupedSetStateFunc(toggleResult, scroll);

        expect(result.start).toEqual({
            index: 1,
            groupPosition: 2,
            itemIndex: 47,
            shift: 0
        });

        expect(result.end).toEqual({
            index: 1,
            groupPosition: 4,
            itemIndex: 55,
            shift: 0
        });
    });
});
