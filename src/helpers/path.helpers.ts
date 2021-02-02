import { ContextType } from '../types/context.type'
import { PathObjectOptions } from '../types/pathOptions.type'
import { PathRoutesType, PathType } from '../types/paths.type'

function handlePathObjectOptions<T = any>(path: PathObjectOptions, id?: string, data?: T) {
    return path.strings
        .map(
            (s, i) =>
                s +
                (path.contexts[i]
                    ? path.contexts[i] instanceof Function
                        ? (path.contexts[i] as ContextType)(id, data)
                        : path.contexts[i]
                    : ''),
        )
        .join('')
}

export function parsePath<T = any>(
    path: PathType,
    key: keyof Omit<PathRoutesType, 'default'>,
    id?: string,
    data?: T,
): string {
    let p = ''
    if (typeof path === 'string') {
        p = path + (id ? `/${id}` : '')
    } else if ((path as PathObjectOptions).strings) {
        p = handlePathObjectOptions(path as PathObjectOptions, id, data)
    } else if (!(path as PathRoutesType)[key] && (path as PathRoutesType).default) {
        if (typeof (path as PathRoutesType).default === 'string') {
            p = ((path as PathRoutesType).default as string) + (id ? `/${id}` : '')
        } else {
            p = handlePathObjectOptions(
                (path as PathRoutesType).default as PathObjectOptions,
                id,
                data,
            )
        }
    }

    if (p.length) {
        return p.replace(/\/\//g, '/')
    }

    if (!key || !(path as PathRoutesType)[key]) {
        throw new Error(`${key} not found in ${path}`)
    }
    if (typeof (path as PathRoutesType)[key] === 'string') {
        return (path as PathRoutesType)[key] as string
    }
    return handlePathObjectOptions((path as PathRoutesType)[key] as PathObjectOptions, id, data)
}
