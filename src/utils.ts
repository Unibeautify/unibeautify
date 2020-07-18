export function zipObject(keys: string[], values: string[]) {
    return keys.reduce(
        (acc, key, idx) => ({
            ...acc,
            [key]: values[idx],
        }),
        {}
    );
}

export function unique<T>(array: T[]): T[] {
    return array.reduce(
        (acc, val) => (acc.indexOf(val) === -1 ? acc.concat(val) : acc),
        [] as T[]
    );
}

export function filterMultiCriteria(array: any[], filters: any) {
    return array.filter(arr =>
        Object.keys(filters).some(key => {
            if (arr[key] || filters[key]) {
                if (Array.isArray(arr[key])) {
                    return (
                        filters[key] && arr[key].indexOf(filters[key]) !== -1
                    );
                }
                return arr[key] === filters[key];
            }
            return false;
        })
    );
}
