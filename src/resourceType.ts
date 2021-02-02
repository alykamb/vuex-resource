import { ActionsList, ActionsListApi, ActionsSingle, ActionsSingleApi } from './types/actions.type'
import {
    GetterList,
    GetterListStatus,
    GetterSingle,
    GetterSingleStatus,
} from './types/getters.type'

export type ResourceGetters<T = any> = T extends Array<infer Member>
    ? GetterList<Member>
    : GetterSingle<T>

export type ResourceGettersApi<T = any> = T extends Array<infer Member>
    ? GetterListStatus<Member>
    : GetterSingleStatus<T>

export type ResourceActions<T = any> = T extends Array<infer Member>
    ? ActionsList<Member>
    : ActionsSingle<T>

export type ResourceActionsApi<T = any> = T extends Array<infer Member>
    ? ActionsListApi<Member>
    : ActionsSingleApi<T>

export type Resource<T, P extends boolean = false> = P extends true
    ? ResourceGettersApi<T> & ResourceActionsApi<T>
    : ResourceGetters<T> & ResourceActions<T>
