import { ContextType } from './context.type'
import { PathType } from './paths.type'
import { State } from './state.type'

export type ResourceProperty<T = any> = {
    value?: any
    mapContext?: ContextType
    data?: Partial<Record<keyof State<T>, any>>
    paths?: PathType
    key?: string
}
