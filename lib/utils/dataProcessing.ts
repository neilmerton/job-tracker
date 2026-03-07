export function countByStatus<T extends Record<string, any>>(
    items: T[],
    statusKey: keyof T = "status" as keyof T
): Record<string, number> {
    return items.reduce<Record<string, number>>((acc, item) => {
        const status = item[statusKey] as string;
        if (status) {
            acc[status] = (acc[status] ?? 0) + 1;
        }
        return acc;
    }, {});
}
