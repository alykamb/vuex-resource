import { Mutation } from 'vuex'

import { Status } from '../constants/status.constant'
import { ResourceMutations } from '../enums/resourceMutations.enum'
import { IResourceOptions } from '../interfaces/resourceOptions'
import { ContextType } from '../types/context.type'
import { RootStateType } from '../types/rootState.type'
import {
    State,
    StateApi,
    StateList,
    StateListApi,
    StateListContextApi,
    StateListKey,
    StateListKeyApi,
    StateListKeyContextApi,
    StateSingle,
    StateSingleApi,
    StateSingleContextApi,
} from '../types/state.type'

function createMutationsContextListKey<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    mutations: any,
): void {
    const m: Partial<Record<ResourceMutations, Mutation<StateListKeyContextApi<T>>>> = mutations

    m.create = (s, p: { data: T; context: ReturnType<ContextType<R>> }) => {
        const id: string = p.data[options.key] as any
        s.data.set(id, p.data)
        const list = s.list.get(p.context) || new Set()
        list.add(id)
        s.list.set(p.context, list)
    }

    m.createMany = (s, p: { data: T[]; context: ReturnType<ContextType<R>> }) => {
        p.data.forEach((data) => {
            const id: string = data[options.key] as any
            s.data.set(id, data)
            const list = s.list.get(p.context) || new Set()
            list.add(id)
            s.list.set(p.context, list)
        })
    }

    m.update = (s, p: { data: Partial<T>; context: ReturnType<ContextType<R>>; id: string }) => {
        let newData: T
        if (p.data instanceof Object) {
            newData = { ...s.data.get(p.id), ...p.data }
        } else {
            newData = p.data
        }
        s.data.set(p.id, newData)
    }

    m.delete = (s, p: { id: string; context: ReturnType<ContextType<R>> }) => {
        s.list.get(p.context).delete(p.id)
        s.data.delete(p.id)
        if (s.selected.get(p.context) === p.id) {
            s.selected.delete(p.context)
        }
    }

    m.select = (s, p: { id: string; context: ReturnType<ContextType<R>> }) => {
        s.selected.set(p.context, p.id)
    }

    m.clearState = (s) => {
        s.data = new Map()
        s.list = new Map()
        s.selected = new Map()
        s.status = Status.READY
    }
}

function createMutationsContextList<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    mutations: any,
): void {
    const m: Partial<Record<ResourceMutations, Mutation<StateListContextApi<T>>>> = mutations
    // list context api
    m.create = (s, p: { data: T; context: ReturnType<ContextType<R>> }) => {
        const data = s.data.get(p.context) || []
        s.data.set(p.context, [...data, p.data])
    }

    m.createMany = (s, p: { data: T[]; context: ReturnType<ContextType<R>> }) => {
        const data = s.data.get(p.context) || []
        s.data.set(p.context, [...data, ...p.data])
    }

    m.update = (s, p: { data: Partial<T>; context: ReturnType<ContextType<R>>; id: number }) => {
        const data = s.data.get(p.context)
        s.data.set(p.context, [...data.slice(0, p.id), data[p.id], ...data.slice(p.id + 1)])
    }

    m.delete = (s, p: { context: ReturnType<ContextType<R>>; id: number }) => {
        s.data.set(
            p.context,
            s.data.get(p.context).filter((_, i) => i !== p.id),
        )
    }

    m.select = (s, p: { context: ReturnType<ContextType<R>>; id: number }) => {
        s.selected.set(p.context, p.id)
    }

    m.clearState = (s) => {
        s.data = new Map()
        s.selected = new Map()
        s.status = Status.READY
    }
}

function createMutationsContextSingle<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    mutations: any,
): void {
    const m: Partial<Record<
        ResourceMutations,
        Mutation<StateSingleContextApi<T>>
    >> = mutations as any
    // single context api
    m.create = (s, p: { data: T; context: ReturnType<ContextType<R>> }) => {
        s.data.set(p.context, p.data)
    }

    m.update = (s, p: { data: Partial<T>; context: ReturnType<ContextType<R>> }) => {
        let newData: T
        if (p.data instanceof Object) {
            newData = { ...s.data.get(p.context), ...p.data }
        } else {
            newData = p.data
        }
        s.data.set(p.context, newData)
    }

    m.delete = (s, p: { context: ReturnType<ContextType<R>> }) => {
        s.data.delete(p.context)
    }

    m.clearState = (s) => {
        s.data = new Map()
        s.status = Status.READY
    }
}

function createMutationsListKey<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    mutations: any,
): void {
    const m: Partial<Record<
        ResourceMutations,
        Mutation<StateListKeyApi<T> | StateListKey<T>>
    >> = mutations as any
    // list key api
    m.create = (s, p: { data: T }) => {
        const id: string = p.data[options.key] as any
        s.data.set(id, p.data)
        s.list.add(id)
    }

    m.createMany = (s, p: { data: T[] }) => {
        p.data.forEach((data) => {
            const id: string = data[options.key] as any
            s.data.set(id, data)
            s.list.add(id)
        })
        s.data
    }

    m.update = (s, p: { data: Partial<T>; id: string }) => {
        let newData: T
        if (p.data instanceof Object) {
            newData = { ...s.data.get(p.id), ...p.data }
        } else {
            newData = p.data
        }
        s.data.set(p.id, newData)
    }

    m.delete = (s, p: { id: string }) => {
        s.data.delete(p.id)
        s.list.delete(p.id)
        if (s.selected === p.id) {
            s.selected = null
        }
    }

    m.select = (s, p: { id: string }) => {
        s.selected = p.id
    }

    m.clearState = (s) => {
        s.data = new Map()
        s.list = new Set()
        s.selected = null
    }
}
function createMutationsList<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    mutations: any,
): void {
    const m: Partial<Record<
        ResourceMutations,
        Mutation<StateListApi<T> | StateList<T>>
    >> = mutations as any
    // list api
    m.create = (s, p: { data: T }) => {
        s.data = [...s.data, p.data]
    }

    m.createMany = (s, p: { data: T[] }) => {
        s.data = [...s.data, ...p.data]
    }
    m.update = (s, p: { data: Partial<T>; id: number }) => {
        let newData: T
        if (p.data instanceof Object) {
            newData = { ...s.data[p.id], ...p.data }
        } else {
            newData = p.data
        }
        s.data = [...s.data.slice(0, p.id), newData, ...s.data.slice(p.id + 1)]
    }

    m.delete = (s, p: { id: number }) => {
        s.data = s.data.filter((_, i) => i !== p.id)
    }

    m.select = (s, p: { id: number }) => {
        s.selected = p.id
    }

    m.clearState = (s) => {
        s.data = []
        s.selected = null
    }
}

function createMutationsSingle<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
    mutations: any,
): void {
    const m: Partial<Record<
        ResourceMutations,
        Mutation<StateSingleApi<T> | StateSingle<T>>
    >> = mutations as any
    // single api
    m.create = (s, p: { data: T }) => {
        s.data = p.data
    }

    m.update = (s, p: { data: Partial<T> }) => {
        if (p.data instanceof Object) {
            s.data = { ...s.data, ...p.data }
        } else {
            s.data = p.data
        }
    }

    m.delete = (s) => {
        s.data = null
    }

    m.clearState = (s) => {
        s.data = null
    }
}

export function createMutations<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
): Partial<Record<ResourceMutations, Mutation<S>>> {
    const mutations: Partial<Record<ResourceMutations, Mutation<S>>> = {}

    if (options.axios && options.path) {
        ;(mutations.setStatus as Mutation<StateApi<T>>) = (s, p: { data: Status }) => {
            s.status = p.data
        }
    }

    if (options.context) {
        if (options.list) {
            if (options.key) {
                createMutationsContextListKey<T, S, R>(options, mutations)
            } else {
                createMutationsContextList<T, S, R>(options, mutations)
            }
        } else {
            createMutationsContextSingle<T, S, R>(options, mutations)
        }
    } else {
        if (options.list) {
            if (options.key) {
                createMutationsListKey<T, S, R>(options, mutations)
            } else {
                createMutationsList<T, S, R>(options, mutations)
            }
        } else {
            createMutationsSingle<T, S, R>(options, mutations)
        }
    }

    return mutations
}
