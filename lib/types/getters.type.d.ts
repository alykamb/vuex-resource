import { Status } from '../constants/status.constant';
import { RootStateType } from './rootState.type';
import { State } from './state.type';
export declare type WithStatus<T> = T & {
    status: Status;
};
export declare type GetterSingle<T> = {
    readonly item: T;
};
export declare type GetterSingleStatus<T> = WithStatus<GetterSingle<T>>;
export declare type GetterList<T> = {
    readonly items: T[];
    readonly selected: string;
} & GetterSingle<T>;
export declare type GetterListStatus<T> = WithStatus<GetterList<T>>;
export declare type GetterType<T> = GetterSingle<T> | GetterSingleStatus<T> | GetterList<T> | GetterListStatus<T>;
export declare type VuexGetter<T, S = State<T>, R = RootStateType, Ret = any> = (state: S, getters: any, rootState: R, rootGetters: any) => Ret;
