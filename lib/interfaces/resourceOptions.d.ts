import { ComponentCustomProperties } from '@vue/runtime-core';
import { AxiosInstance } from 'axios';
import { Store } from 'vuex';
import { ResourceModel } from '../models/resource.model';
import { ResourceState } from '../models/resourceState.model';
import { ContextType } from '../types/context.type';
import { PathType } from '../types/paths.type';
import { ResourceProperty } from '../types/resourceProperty.type';
import { State } from '../types/state.type';
import { IModuleOptions } from './moduleOptions';
declare type ResourceData<T> = {
    [key: string]: ResourceProperty;
} & {
    [key in keyof ResourceState<T>]?: never;
};
export interface IResourceOptions<T = any, S extends State<T> = State<T>, R = ComponentCustomProperties['$store']['state']> {
    state?: S;
    store: Store<R>;
    axios?: AxiosInstance;
    module?: IModuleOptions;
    name: string;
    path?: PathType<T>;
    children?: Record<string, ResourceModel>;
    data?: ResourceData<T>;
    list?: boolean;
    key?: keyof T & string;
    context?: ContextType<T>;
}
export {};
