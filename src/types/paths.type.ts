import { PathOptions } from './pathOptions.type'

export type PathRoutesType<T = any> = {
    default?: PathOptions<T>
    getItem?: PathOptions<T>
    getPage?: PathOptions<T>
    delete?: PathOptions<T>
    update?: PathOptions<T>
    create?: PathOptions<T>
}
export type PathType<T = any> = PathOptions<T> | PathRoutesType<T>
