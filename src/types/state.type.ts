import { Status } from '../constants/status.constant'
export type WithApi<T> = T & { status: Status }

export type StateSingle<T> = {
    data: T
}
export type StateSingleApi<T> = WithApi<StateSingle<T>>

export type StateSingleContext<T> = {
    data: Map<string, T>
}
export type StateSingleContextApi<T> = WithApi<StateSingleContext<T>>

export type StateList<T> = {
    data: T[]
    selected: number
}

export type StateListApi<T> = WithApi<StateList<T>>

export type StateListContext<T> = {
    data: Map<string, T[]>
    selected: Map<string, number>
}

export type StateListContextApi<T> = WithApi<StateListContext<T>>

export type StateListKey<T> = {
    data: Map<string, T>
    list: Set<string>
    selected: string
}

export type StateListKeyApi<T> = WithApi<StateListKey<T>>

export type StateListKeyContext<T> = {
    data: Map<string, T>
    list: Map<string, Set<string>>
    selected: Map<string, string>
}

export type StateListKeyContextApi<T> = WithApi<StateListKeyContext<T>>

export type StateContext<T = any> =
    | StateSingleContext<T>
    | StateSingleContextApi<T>
    | StateListContext<T>
    | StateListContextApi<T>
    | StateListKeyContext<T>
    | StateListKeyContextApi<T>

export type StateApi<T = any> =
    | StateSingleApi<T>
    | StateSingleContextApi<T>
    | StateListApi<T>
    | StateListKeyApi<T>
    | StateListKeyContextApi<T>

export type State<T = any> =
    | StateSingle<T>
    | StateSingleApi<T>
    | StateSingleContext<T>
    | StateSingleContextApi<T>
    | StateList<T>
    | StateListApi<T>
    | StateListContext<T>
    | StateListContextApi<T>
    | StateListKey<T>
    | StateListKeyApi<T>
    | StateListKeyContext<T>
    | StateListKeyContextApi<T>
