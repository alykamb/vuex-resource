export type ContextType<T = any> = (
    id?: string,
    data?: T | Partial<T> | T[] | Array<Partial<T>>,
) => string
