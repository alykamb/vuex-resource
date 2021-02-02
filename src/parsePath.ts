import { ContextType } from './types/context.type'

export function path<T = any>(
    strings: TemplateStringsArray,
    ...contexts: Array<ContextType<T> | string>
) {
    return {
        strings,
        contexts,
    }
}
