import { AxiosResponse } from 'axios'
import { Action, ActionContext } from 'vuex'

import { Status } from '../constants/status.constant'
import { ResourceActions } from '../enums/resourceActions.enum'
import { ResourceMutations } from '../enums/resourceMutations.enum'
import { parsePath } from '../helpers/path.helpers'
import { IPaginatedData } from '../interfaces/paginatedData.interface'
import { IResourceOptions } from '../interfaces/resourceOptions'
import { ActionsList, ActionsListApi, ActionsSingle, ActionsSingleApi } from '../types/actions.type'
import { RootStateType } from '../types/rootState.type'
import {
    State,
    StateList,
    StateListContext,
    StateListKey,
    StateListKeyApi,
    StateListKeyContext,
    StateListKeyContextApi,
    StateSingle,
    StateSingleApi,
    StateSingleContext,
    StateSingleContextApi,
} from '../types/state.type'

export const wrapApiCall = <T, S, R>(actionContext?: ActionContext<S, R>) => {
    actionContext.commit(ResourceMutations.setStatus, { data: Status.FETCHING })
    return async (
        promise: Promise<AxiosResponse<T>>,
        callback: (data: T) => void | Promise<void>,
    ): Promise<T> => {
        try {
            const res = await promise
            const cb = callback(res.data)
            if (cb && cb instanceof Promise) {
                await cb
            }
            actionContext.commit(ResourceMutations.setStatus, { data: Status.READY })
            return res.data
        } catch (err) {
            actionContext.commit(ResourceMutations.setStatus, { data: Status.ERROR })
            throw err
        }
    }
}

function createActionsSingleContextApi<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<
        keyof ActionsSingleApi<T>,
        Action<StateSingleContextApi<T>, R>
    >> = actions as any

    const c = options.context

    const co = (context: ActionContext<StateSingleContextApi<T>, R>, mut: ResourceMutations) => (
        data: any,
        id?: string,
    ) => context.commit(mut, { data, id, context: c(id, data) })

    type P<K extends keyof ActionsSingleApi<T>> = Parameters<ActionsSingleApi<T>[K]>[0]
    type Ret<K extends keyof ActionsSingleApi<T>> = ReturnType<ActionsSingleApi<T>[K]>

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        return wrapApiCall<T, StateSingleContextApi<T>, R>(actionContext)(
            options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data),
            co(actionContext, ResourceMutations.create),
        )
    }

    a.clear = async (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
    }

    a.delete = (actionContext): Ret<'delete'> => {
        return wrapApiCall<T[], StateSingleContextApi<T>, R>(actionContext)(
            options.axios.delete(parsePath(options.path, 'delete')),
            co(actionContext, ResourceMutations.delete),
        ).then(() => true)
    }

    a.getItem = (actionContext): Ret<'getItem'> => {
        return wrapApiCall<T, StateSingleContextApi<T>, R>(actionContext)(
            options.axios.get(parsePath(options.path, 'delete')),
            co(actionContext, ResourceMutations.create),
        )
    }
    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        return wrapApiCall<T, StateSingleContextApi<T>, R>(actionContext)(
            options.axios.patch(
                parsePath(options.path, 'update', null, payload.data),
                payload.data,
            ),
            co(actionContext, ResourceMutations.update),
        )
    }
}

function createActionsListKeyContextApi<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<
        keyof ActionsListApi<T>,
        Action<StateListKeyContextApi<T>, R>
    >> = actions as any

    const c = options.context

    const co = (context: ActionContext<StateListKeyContextApi<T>, R>, mut: ResourceMutations) => (
        data: any,
        id?: string,
    ) => context.commit(mut, { data, id, context: c(id, data) })

    type P<K extends keyof ActionsListApi<T>> = Parameters<ActionsListApi<T>[K]>[0]
    type Ret<K extends keyof ActionsListApi<T>> = ReturnType<ActionsListApi<T>[K]>

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        return wrapApiCall<T, StateSingleContextApi<T>, R>(actionContext)(
            options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data),
            co(actionContext, ResourceMutations.create),
        )
    }

    a.clear = async (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
    }

    a.delete = (actionContext, payload: P<'delete'>): Ret<'delete'> => {
        return wrapApiCall<T[], StateSingleContextApi<T>, R>(actionContext)(
            options.axios.delete(parsePath(options.path, 'delete', payload.id)),
            co(actionContext, ResourceMutations.delete),
        ).then(() => true)
    }

    a.getItem = (actionContext, payload: P<'getItem'>): Ret<'getItem'> => {
        return wrapApiCall<T, StateSingleContextApi<T>, R>(actionContext)(
            options.axios.get(parsePath(options.path, 'delete', payload.id)),
            co(actionContext, ResourceMutations.create),
        )
    }
    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        return wrapApiCall<T, StateSingleContextApi<T>, R>(actionContext)(
            options.axios.patch(
                parsePath(options.path, 'update', payload.id, payload.data),
                payload.data,
            ),
            co(actionContext, ResourceMutations.update),
        )
    }

    a.createMany = (actionContext, payload: P<'createMany'>): Ret<'createMany'> => {
        return wrapApiCall<T[], StateListKeyContextApi<T>, R>(actionContext)(
            options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data),
            co(actionContext, ResourceMutations.createMany),
        )
    }

    a.getPage = (actionContext, payload: P<'getPage'>): Ret<'getPage'> => {
        return wrapApiCall<IPaginatedData<T>, StateListKeyContextApi<T>, R>(actionContext)(
            options.axios.get(parsePath(options.path, 'delete', null, payload), {
                params: payload,
            }),
            (data) => co(actionContext, ResourceMutations.createMany)(data.rows),
        )
    }

    a.select = (actionContext, payload: P<'select'>): Ret<'select'> => {
        actionContext.commit(ResourceMutations.select, { id: payload.id, context: c(payload.id) })
        return Promise.resolve(actionContext.getters['item'])
    }
}

function createActionsListContextApi<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    createActionsListKeyContextApi<T, S, R>(options, actions)
}

function createActionsSingleApi<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<
        keyof ActionsSingleApi<T>,
        Action<StateSingleApi<T>, R>
    >> = actions as any

    type P<K extends keyof ActionsSingleApi<T>> = Parameters<ActionsSingleApi<T>[K]>[0]
    type Ret<K extends keyof ActionsSingleApi<T>> = ReturnType<ActionsSingleApi<T>[K]>

    const co = (context: ActionContext<StateSingleApi<T>, R>, mut: ResourceMutations) => (
        data: any,
        id?: string,
    ) => context.commit(mut, { data, id })

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        return wrapApiCall<T, StateSingleApi<T>, R>(actionContext)(
            options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data),
            co(actionContext, ResourceMutations.create),
        )
    }

    a.clear = async (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
    }

    a.delete = (actionContext): Ret<'delete'> => {
        return wrapApiCall<T[], StateSingleApi<T>, R>(actionContext)(
            options.axios.delete(parsePath(options.path, 'delete', null)),
            co(actionContext, ResourceMutations.delete),
        ).then(() => true)
    }

    a.getItem = (actionContext): Ret<'getItem'> => {
        return wrapApiCall<T, StateSingleApi<T>, R>(actionContext)(
            options.axios.get(parsePath(options.path, 'delete', null)),
            co(actionContext, ResourceMutations.create),
        )
    }
    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        return wrapApiCall<T, StateSingleApi<T>, R>(actionContext)(
            options.axios.patch(
                parsePath(options.path, 'update', null, payload.data),
                payload.data,
            ),
            co(actionContext, ResourceMutations.update),
        )
    }
}

function createActionsListKeyApi<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<
        keyof ActionsListApi<T>,
        Action<StateListKeyApi<T>, R>
    >> = actions as any

    const co = (context: ActionContext<StateListKeyApi<T>, R>, mut: ResourceMutations) => (
        data: any,
        id?: string,
    ) => context.commit(mut, { data, id })

    type P<K extends keyof ActionsListApi<T>> = Parameters<ActionsListApi<T>[K]>[0]
    type Ret<K extends keyof ActionsListApi<T>> = ReturnType<ActionsListApi<T>[K]>

    createActionsSingleApi(options, actions)

    a.createMany = (actionContext, payload: P<'createMany'>): Ret<'createMany'> => {
        return wrapApiCall<T[], StateListKeyApi<T>, R>(actionContext)(
            options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data),
            co(actionContext, ResourceMutations.createMany),
        )
    }

    a.getPage = (actionContext, payload: P<'getPage'>): Ret<'getPage'> => {
        return wrapApiCall<IPaginatedData<T>, StateListKeyApi<T>, R>(actionContext)(
            options.axios.get(parsePath(options.path, 'delete', null, payload), {
                params: payload,
            }),
            (data) => co(actionContext, ResourceMutations.createMany)(data.rows),
        )
    }

    a.select = (actionContext, payload: P<'select'>): Ret<'select'> => {
        actionContext.commit(ResourceMutations.select, { id: payload.id })
        return Promise.resolve(actionContext.state.data.get(payload.id))
    }
}

function createActionsListApi<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    createActionsListKeyApi(options, actions)
}

function createActionsSingleContext<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<
        keyof ActionsSingle<T>,
        Action<StateSingleContext<T>, R>
    >> = actions as any

    type P<K extends keyof ActionsSingle<T>> = Parameters<ActionsSingle<T>[K]>[0]
    type Ret<K extends keyof ActionsSingle<T>> = ReturnType<ActionsSingle<T>[K]>

    const c = options.context

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        })
        return Promise.resolve(payload.data)
    }

    a.clear = (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
        return Promise.resolve()
    }

    a.delete = (actionContext): Ret<'delete'> => {
        actionContext.commit(ResourceMutations.delete, { context: c() })
        return Promise.resolve(true)
    }

    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        const context = c(null, payload.data)
        actionContext.commit(ResourceMutations.delete, { context })
        return Promise.resolve(actionContext.state.data.get(context))
    }
}

function createActionsListKeyContext<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<
        keyof ActionsList<T>,
        Action<StateListKeyContext<T>, R>
    >> = actions as any

    type P<K extends keyof ActionsList<T>> = Parameters<ActionsList<T>[K]>[0]
    type Ret<K extends keyof ActionsList<T>> = ReturnType<ActionsList<T>[K]>

    const c = options.context

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        })
        return Promise.resolve(payload.data)
    }
    a.clear = (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
        return Promise.resolve()
    }

    a.delete = (actionContext, payload: P<'delete'>): Ret<'delete'> => {
        actionContext.commit(ResourceMutations.delete, { id: payload.id, context: c(payload.id) })
        return Promise.resolve(true)
    }

    a.createMany = (actionContext, payload: P<'createMany'>): Ret<'createMany'> => {
        actionContext.commit(ResourceMutations.createMany, {
            data: payload.data,
            context: c(null, payload.data),
        })
        return Promise.resolve(payload.data)
    }

    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        const context = c(payload.id, payload.data)
        actionContext.commit(ResourceMutations.update, {
            data: payload.data,
            id: payload.id,
            context,
        })

        return Promise.resolve(actionContext.state.data.get(payload.id))
    }

    a.select = (actionContext, payload: P<'select'>): Ret<'select'> => {
        const context = c(payload.id)
        actionContext.commit(ResourceMutations.select, {
            id: payload.id,
            context,
        })

        return Promise.resolve(actionContext.state.data.get(payload.id))
    }
}

function createActionsListContext<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<keyof ActionsList<T>, Action<StateListContext<T>, R>>> = actions as any

    type P<K extends keyof ActionsList<T>> = Parameters<ActionsList<T>[K]>[0]
    type Ret<K extends keyof ActionsList<T>> = ReturnType<ActionsList<T>[K]>

    const c = options.context

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        })
        return Promise.resolve(payload.data)
    }

    a.clear = (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
        return Promise.resolve()
    }

    a.createMany = (actionContext, payload: P<'createMany'>): Ret<'createMany'> => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        })
        return Promise.resolve(payload.data)
    }

    a.delete = (actionContext, payload: P<'delete'>): Ret<'delete'> => {
        actionContext.commit(ResourceMutations.create, {
            id: payload.id,
            context: c(payload.id),
        })
        return Promise.resolve(true)
    }

    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        const context = c(payload.id, payload.data)
        actionContext.commit(ResourceMutations.update, {
            data: payload.data,
            id: payload.id,
            context,
        })

        return Promise.resolve(actionContext.state.data.get(context)[+payload.id])
    }

    a.select = (actionContext, payload: P<'select'>): Ret<'select'> => {
        const context = c(payload.id)
        actionContext.commit(ResourceMutations.select, {
            id: payload.id,
            context,
        })

        return Promise.resolve(actionContext.state.data.get(context)[+payload.id])
    }
}

function createActionsListKey<T = any, S extends State<T> = State<T>, R = RootStateType>(
    _options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<keyof ActionsList<T>, Action<StateListKey<T>, R>>> = actions as any

    type P<K extends keyof ActionsList<T>> = Parameters<ActionsList<T>[K]>[0]
    type Ret<K extends keyof ActionsList<T>> = ReturnType<ActionsList<T>[K]>

    a.clear = (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
        return Promise.resolve()
    }

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        actionContext.commit(ResourceMutations.create, payload)
        return Promise.resolve(payload.data)
    }

    a.createMany = (actionContext, payload: P<'createMany'>): Ret<'createMany'> => {
        actionContext.commit(ResourceMutations.create, payload)
        return Promise.resolve(payload.data)
    }

    a.delete = (actionContext, payload: P<'delete'>): Ret<'delete'> => {
        actionContext.commit(ResourceMutations.delete, payload)
        return Promise.resolve(true)
    }

    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        actionContext.commit(ResourceMutations.update, payload)
        return Promise.resolve(actionContext.state.data.get(payload.id))
    }

    a.select = (actionContext, payload: P<'select'>): Ret<'select'> => {
        actionContext.commit(ResourceMutations.select, payload)
        return Promise.resolve(actionContext.state.data.get(payload.id))
    }
}

function createActionsList<T = any, S extends State<T> = State<T>, R = RootStateType>(
    _options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<keyof ActionsList<T>, Action<StateList<T>, R>>> = actions as any

    type P<K extends keyof ActionsList<T>> = Parameters<ActionsList<T>[K]>[0]
    type Ret<K extends keyof ActionsList<T>> = ReturnType<ActionsList<T>[K]>

    a.clear = (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
        return Promise.resolve()
    }

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        actionContext.commit(ResourceMutations.create, payload)
        return Promise.resolve(payload.data)
    }

    a.createMany = (actionContext, payload: P<'createMany'>): Ret<'createMany'> => {
        actionContext.commit(ResourceMutations.create, payload)
        return Promise.resolve(payload.data)
    }

    a.delete = (actionContext, payload: P<'delete'>): Ret<'delete'> => {
        actionContext.commit(ResourceMutations.delete, payload)
        return Promise.resolve(true)
    }

    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        actionContext.commit(ResourceMutations.update, payload)
        return Promise.resolve(actionContext.state.data[+payload.id])
    }

    a.select = (actionContext, payload: P<'select'>): Ret<'select'> => {
        actionContext.commit(ResourceMutations.select, payload)
        return Promise.resolve(actionContext.state.data[+payload.id])
    }
}

function createActionsSingle<T = any, S extends State<T> = State<T>, R = RootStateType>(
    _options: IResourceOptions<T, S, R>,
    actions: any,
): void {
    const a: Partial<Record<keyof ActionsSingle<T>, Action<StateSingle<T>, R>>> = actions as any

    type P<K extends keyof ActionsSingle<T>> = Parameters<ActionsSingle<T>[K]>[0]
    type Ret<K extends keyof ActionsSingle<T>> = ReturnType<ActionsSingle<T>[K]>

    a.clear = (actionContext): Ret<'clear'> => {
        actionContext.commit(ResourceMutations.clearState)
        return Promise.resolve()
    }

    a.create = (actionContext, payload: P<'create'>): Ret<'create'> => {
        actionContext.commit(ResourceMutations.create, payload)
        return Promise.resolve(payload.data)
    }

    a.delete = (actionContext): Ret<'delete'> => {
        actionContext.commit(ResourceMutations.delete)
        return Promise.resolve(true)
    }

    a.update = (actionContext, payload: P<'update'>): Ret<'update'> => {
        actionContext.commit(ResourceMutations.update, payload)
        return Promise.resolve(actionContext.state.data)
    }
}

export function createActions<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
): Partial<Record<ResourceActions, Action<S, R>>> {
    const actions: Partial<Record<ResourceActions, Action<S, R>>> = {}

    if (options.axios && options.path) {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    createActionsListKeyContextApi<T, S, R>(options, actions)
                } else {
                    createActionsListContextApi<T, S, R>(options, actions)
                }
            } else {
                createActionsSingleContextApi<T, S, R>(options, actions)
            }
        } else {
            if (options.list) {
                if (options.key) {
                    createActionsListKeyApi<T, S, R>(options, actions)
                } else {
                    createActionsListApi<T, S, R>(options, actions)
                }
            } else {
                createActionsSingleApi<T, S, R>(options, actions)
            }
        }
    } else {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    createActionsListKeyContext<T, S, R>(options, actions)
                } else {
                    createActionsListContext<T, S, R>(options, actions)
                }
            } else {
                createActionsSingleContext<T, S, R>(options, actions)
            }
        } else {
            if (options.list) {
                if (options.key) {
                    createActionsListKey<T, S, R>(options, actions)
                } else {
                    createActionsList<T, S, R>(options, actions)
                }
            } else {
                createActionsSingle<T, S, R>(options, actions)
            }
        }

        return actions
    }
}
