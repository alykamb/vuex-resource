import { AxiosResponse } from 'axios';
import { Action, ActionContext } from 'vuex';
import { ResourceActions } from '../enums/resourceActions.enum';
import { IResourceOptions } from '../interfaces/resourceOptions';
import { RootStateType } from '../types/rootState.type';
import { State } from '../types/state.type';
export declare const wrapApiCall: <T, S, R>(actionContext?: ActionContext<S, R>) => (promise: Promise<AxiosResponse<T>>, callback: (data: T) => void | Promise<void>) => Promise<T>;
export declare function createActions<T = any, S extends State<T> = State<T>, R = RootStateType>(options: IResourceOptions<T, S, R>): Partial<Record<ResourceActions, Action<S, R>>>;
