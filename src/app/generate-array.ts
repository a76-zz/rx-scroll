export function generateArray<T>(length: number, createItem: (index: number) => T) {
    const result: T[] = [];
    for (let index = 0; index < length; ++index) {
        result[index] = createItem(index);
    }

    return result;
}
