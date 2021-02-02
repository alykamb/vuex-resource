import { ActionsList, ActionsListApi, ActionsSingle, ActionsSingleApi } from './types/actions.type';
import { GetterList, GetterListStatus, GetterSingle, GetterSingleStatus } from './types/getters.type';
export declare type ResourceGetters<T = any> = T extends Array<infer Member> ? GetterList<Member> : GetterSingle<T>;
export declare type ResourceGettersApi<T = any> = T extends Array<infer Member> ? GetterListStatus<Member> : GetterSingleStatus<T>;
export declare type ResourceActions<T = any> = T extends Array<infer Member> ? ActionsList<Member> : ActionsSingle<T>;
export declare type ResourceActionsApi<T = any> = T extends Array<infer Member> ? ActionsListApi<Member> : ActionsSingleApi<T>;
export declare type Resource<T, P extends boolean = false> = P extends true ? ResourceGettersApi<T> & ResourceActionsApi<T> : ResourceGetters<T> & ResourceActions<T>;
