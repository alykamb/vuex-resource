import { AxiosInstance } from 'axios';
import { Store } from 'vuex';
import { ResourceModel } from './models/resource.model';
import { Resource } from './resourceType';
import { ContextType } from './types/context.type';
import { PathType } from './types/paths.type';
import { RootStateType } from './types/rootState.type';
import { State } from './types/state.type';
interface IFunctions<T = any, O extends keyof IFunctions<T> = undefined, P extends boolean = false> {
    useContext: <Type = T>(context: ContextType<T>) => Omit<IFunctions<Type, O | 'useContext', P>, O | 'useContext'>;
    useApi: <Type = T>(api: AxiosInstance, path: PathType<T>) => Omit<IFunctions<Type, O | 'useApi', true>, O | 'useApi'>;
    useChildren: <Type = T>(children: Record<string, ResourceModel>) => Omit<IFunctions<Type & Record<string, ResourceModel>, O | 'useChildren', P>, O | 'useChildren'>;
    useKey: <Type = T>(key: keyof (T extends Array<infer M> ? M : T)) => Omit<IFunctions<Type, O | 'useKey', true>, O | 'useKey'>;
    useList: <Type = T>() => Omit<IFunctions<Type[], O | 'useList', P>, //O extends 'useApi' ? ResourceApi<Type[]> : Resource<T[]>
    //O extends 'useApi' ? ResourceApi<Type[]> : Resource<T[]>
    O | 'useList'>;
    create: () => Resource<T, P>;
}
export declare function resource<T = any, S extends State<T> = State<T>, R = RootStateType>(name: string, store: Store<R>): IFunctions<T>;
export {};
