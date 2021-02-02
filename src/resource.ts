/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios, { AxiosInstance } from 'axios'
// import { Vue } from 'vue-class-component'
// import { Vue } from 'vue-class-component'
// import { Getter, Module } from 'vuex'

import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

import { Status } from './constants/status.constant'
import { createModule } from './factories/vuexModule.factory'
import { IResourceOptions } from './interfaces/resourceOptions'
import { ResourceModel } from './models/resource.model'
import { Resource } from './resourceType'
import { ActionsListApi } from './types/actions.type'
import { ContextType } from './types/context.type'
import { PathType } from './types/paths.type'
import { RootStateType } from './types/rootState.type'
import { State } from './types/state.type'

interface IFunctions<
    T = any,
    O extends keyof IFunctions<T> = undefined,
    P extends boolean = false
> {
    useContext: <Type = T>(
        context: ContextType<T>,
    ) => Omit<IFunctions<Type, O | 'useContext', P>, O | 'useContext'>
    useApi: <Type = T>(
        api: AxiosInstance,
        path: PathType<T>,
    ) => Omit<IFunctions<Type, O | 'useApi', true>, O | 'useApi'>
    useChildren: <Type = T>(
        children: Record<string, ResourceModel>,
    ) => Omit<
        IFunctions<Type & Record<string, ResourceModel>, O | 'useChildren', P>,
        O | 'useChildren'
    >
    useKey: <Type = T>(
        key: keyof (T extends Array<infer M> ? M : T),
    ) => Omit<IFunctions<Type, O | 'useKey', true>, O | 'useKey'>
    useList: <Type = T>() => Omit<
        IFunctions<Type[], O | 'useList', P>, //O extends 'useApi' ? ResourceApi<Type[]> : Resource<T[]>
        O | 'useList'
    >
    create: () => Resource<T, P>
}

export function resource<T = any, S extends State<T> = State<T>, R = RootStateType>(
    name: string,
    store: Store<R>,
): IFunctions<T> {
    const options: IResourceOptions<T, S, R> = { name, store }
    function create<
        Type = T,
        Res extends Resource<Type> = Resource<Type>,
        M = T extends Array<infer M> ? M : T
    >(): Res {
        options.store.registerModule(options.name, createModule<T, any, R>(options))

        const a = (name: string, payload?: any): any => {
            return options.store.dispatch(`${options.name}/${name}`, payload)
        }
        const g = (name: string): any => {
            return options.store.getters[`${options.name}/${name}`]
        }

        type P<K extends keyof ActionsListApi<T>> = Parameters<ActionsListApi<T>[K]>[0]
        type Ret<K extends keyof ActionsListApi<T>> = ReturnType<ActionsListApi<T>[K]>

        const ret: Res = ({
            get item() {
                return g('item')
            },
            clear() {
                return a('clear')
            },
            create(payload: P<'create'>): Ret<'create'> {
                return a('create', payload)
            },
            delete(payload: P<'delete'>): Ret<'delete'> {
                return a('delete', payload)
            },
            update(payload: P<'update'>): Ret<'update'> {
                return a('update', payload)
            },
        } as any) as Res

        if (options.axios && options.path !== 'undefined') {
            Object.defineProperty(ret, 'status', {
                get(): Status {
                    return g('status')
                },
            })
            ;((ret as any) as Resource<M, true>).getItem = function getItem(
                payload: Parameters<ActionsListApi<M>['getItem']>[0],
            ): ReturnType<ActionsListApi<M>['getItem']> {
                return a('getItem', payload)
            }

            if (options.list) {
                ;((ret as any) as Resource<M[], true>).getPage = function getPage(
                    payload: Parameters<ActionsListApi<M>['getPage']>[0],
                ): ReturnType<ActionsListApi<M>['getPage']> {
                    return a('getPage', payload)
                }
            }
        }

        if (options.list) {
            const r: Resource<M[]> = ret as any

            Object.defineProperty(ret, 'items', {
                get(): M[] {
                    return g('items')
                },
            })

            Object.defineProperty(ret, 'selected', {
                get(): string {
                    return g('selected')
                },
            })

            r.createMany = function createMany(
                payload: Parameters<ActionsListApi<M>['createMany']>[0],
            ): ReturnType<ActionsListApi<M>['createMany']> {
                return a('createMany', payload)
            }

            r.select = function select(
                payload: Parameters<ActionsListApi<M>['select']>[0],
            ): ReturnType<ActionsListApi<M>['select']> {
                return a('select', payload)
            }
        }

        return ret
    }

    function useApi(api: AxiosInstance, path: PathType<T>) {
        options.axios = api
        options.path = path

        return getBase()
    }

    function useKey(key: keyof (T extends Array<infer M> ? M : T) & string) {
        options.key = key as any
        return getBase()
    }

    function useContext(context: ContextType<T>) {
        options.context = context

        return getBase()
    }

    function useChildren<Type = T, O = Record<string, ResourceModel>>(
        children: Record<string, ResourceModel>,
    ) {
        options.children = children
        return getBase()
    }

    function useList() {
        options.list = true
        return getBase()
    }

    function getBase<Type = T, O extends keyof IFunctions<Type, undefined> = undefined>(): Omit<
        IFunctions<Type, O>,
        O
    > {
        return ({
            create,
            useApi,
            useList,
            useContext,
            useChildren,
            useKey,
        } as any) as IFunctions<Type, O>
    }

    return getBase()
}
