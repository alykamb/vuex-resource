import { Status } from '../constants/status.constant'
import { RootStateType } from './rootState.type'
import { State } from './state.type'

export type WithStatus<T> = T & { status: Status }
export type GetterSingle<T> = {
    readonly item: T
}

export type GetterSingleStatus<T> = WithStatus<GetterSingle<T>>

export type GetterList<T> = {
    readonly items: T[]
    readonly selected: string
} & GetterSingle<T>

export type GetterListStatus<T> = WithStatus<GetterList<T>>

export type GetterType<T> =
    | GetterSingle<T>
    | GetterSingleStatus<T>
    | GetterList<T>
    | GetterListStatus<T>

export type VuexGetter<T, S = State<T>, R = RootStateType, Ret = any> = (
    state: S,
    getters: any,
    rootState: R,
    rootGetters: any,
) => Ret
