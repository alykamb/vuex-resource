import { ContextType } from './context.type'

export type PathObjectOptions<T = any> = {
    strings: TemplateStringsArray
    contexts?: Array<ContextType<T> | string>
}

export type PathOptions<T = any> = string | PathObjectOptions<T>
