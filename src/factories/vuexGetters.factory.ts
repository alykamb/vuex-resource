import { Getter } from 'vuex'

import { ResourceGetters } from '../enums/resourceGetters.enum'
import { IResourceOptions } from '../interfaces/resourceOptions'
import {
    GetterList,
    GetterListStatus,
    GetterSingle,
    GetterSingleStatus,
} from '../types/getters.type'
import { RootStateType } from '../types/rootState.type'
import {
    State,
    StateList,
    StateListApi,
    StateListContext,
    StateListContextApi,
    StateListKey,
    StateListKeyApi,
    StateListKeyContext,
    StateListKeyContextApi,
    StateSingle,
    StateSingleApi,
    StateSingleContext,
    StateSingleContextApi,
} from '../types/state.type'

export function createGetters<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
): Partial<Record<ResourceGetters, Getter<S, R>>> {
    const getters: Partial<Record<ResourceGetters, Getter<S, R>>> = {}
    if (options.axios && options.path) {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    const g: Partial<Record<
                        keyof GetterListStatus<T>,
                        Getter<StateListKeyContextApi<T>, R>
                    >> = getters as any
                    g.item = (state): GetterListStatus<T>['item'] => {
                        const c = options.context()
                        return state.data.get(state.selected.get(c))
                    }

                    g.items = (state): GetterListStatus<T>['items'] => {
                        const c = options.context()
                        return Array.from(state.list.get(c)?.values() || []).map((k) =>
                            state.data.get(k),
                        )
                    }

                    g.selected = (state): GetterListStatus<T>['selected'] => {
                        const c = options.context()
                        return state.selected.get(c)
                    }

                    g.status = (state): GetterListStatus<T>['status'] => {
                        return state.status
                    }
                } else {
                    const g: Partial<Record<
                        keyof GetterListStatus<T>,
                        Getter<StateListContextApi<T>, R>
                    >> = getters as any
                    g.item = (state): GetterListStatus<T>['item'] => {
                        const c = options.context()
                        return state.data.get(c)?.[state.selected.get(c)]
                    }

                    g.items = (state): GetterListStatus<T>['items'] => {
                        const c = options.context()
                        return state.data.get(c)
                    }

                    g.selected = (state): GetterListStatus<T>['selected'] => {
                        const c = options.context()
                        return state.selected.get(c) + ''
                    }
                    g.status = (state): GetterListStatus<T>['status'] => {
                        return state.status
                    }
                }
            } else {
                const g: Partial<Record<
                    keyof GetterSingleStatus<T>,
                    Getter<StateSingleContextApi<T>, R>
                >> = getters as any

                g.item = (state): GetterSingleStatus<T>['item'] => {
                    const c = options.context()
                    return state.data.get(c)
                }

                g.status = (state): GetterSingleStatus<T>['status'] => {
                    return state.status
                }
            }
        } else {
            // has api but no context
            if (options.list) {
                if (options.key) {
                    const g: Partial<Record<
                        keyof GetterListStatus<T>,
                        Getter<StateListKeyApi<T>, R>
                    >> = getters as any

                    g.item = (state): GetterListStatus<T>['item'] => {
                        return state.data.get(state.selected)
                    }

                    g.items = (state): GetterListStatus<T>['items'] => {
                        return Array.from(state.list.values()).map((key) => state.data.get(key))
                    }

                    g.selected = (state): GetterListStatus<T>['selected'] => {
                        return state.selected
                    }

                    g.status = (state): GetterListStatus<T>['status'] => {
                        return state.status
                    }
                } else {
                    const g: Partial<Record<
                        keyof GetterListStatus<T>,
                        Getter<StateListApi<T>, R>
                    >> = getters as any

                    g.item = (state): GetterListStatus<T>['item'] => {
                        return state.data[state.selected]
                    }

                    g.items = (state): GetterListStatus<T>['items'] => {
                        return state.data
                    }

                    g.selected = (state): GetterListStatus<T>['selected'] => {
                        return state.selected + ''
                    }

                    g.status = (state): GetterListStatus<T>['status'] => {
                        return state.status
                    }
                }
            } else {
                //single

                const g: Partial<Record<
                    keyof GetterSingleStatus<T>,
                    Getter<StateSingleApi<T>, R>
                >> = getters as any

                g.item = (state): GetterListStatus<T>['item'] => {
                    return state.data
                }

                g.status = (state): GetterListStatus<T>['status'] => {
                    return state.status
                }
            }
        }
    } else {
        // no api
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    const g: Partial<Record<
                        keyof GetterList<T>,
                        Getter<StateListKeyContext<T>, R>
                    >> = getters as any
                    g.item = (state): GetterList<T>['item'] => {
                        const c = options.context()
                        return state.data.get(state.selected.get(c))
                    }

                    g.items = (state): GetterList<T>['items'] => {
                        const c = options.context()
                        return Array.from(state.list.get(c)?.values() || []).map((k) =>
                            state.data.get(k),
                        )
                    }

                    g.selected = (state): GetterList<T>['selected'] => {
                        const c = options.context()
                        return state.selected.get(c)
                    }
                } else {
                    const g: Partial<Record<
                        keyof GetterList<T>,
                        Getter<StateListContext<T>, R>
                    >> = getters as any

                    g.item = (state): GetterList<T>['item'] => {
                        const c = options.context()
                        return state.data.get(c)?.[state.selected.get(c)]
                    }

                    g.items = (state): GetterList<T>['items'] => {
                        const c = options.context()
                        return state.data.get(c)
                    }

                    g.selected = (state): GetterList<T>['selected'] => {
                        const c = options.context()
                        return state.selected.get(c) + ''
                    }
                }
            } else {
                const g: Partial<Record<
                    keyof GetterSingle<T>,
                    Getter<StateSingleContext<T>, R>
                >> = getters as any

                g.item = (state): GetterSingle<T>['item'] => {
                    const c = options.context()
                    return state.data.get(c)
                }
            }
        } else {
            if (options.list) {
                if (options.key) {
                    const g: Partial<Record<
                        keyof GetterList<T>,
                        Getter<StateListKey<T>, R>
                    >> = getters as any

                    g.item = (state): GetterListStatus<T>['item'] => {
                        return state.data.get(state.selected)
                    }

                    g.items = (state): GetterListStatus<T>['items'] => {
                        return Array.from(state.list.values() || []).map((key) =>
                            state.data.get(key),
                        )
                    }

                    g.selected = (state): GetterListStatus<T>['selected'] => {
                        return state.selected
                    }
                } else {
                    const g: Partial<Record<
                        keyof GetterList<T>,
                        Getter<StateList<T>, R>
                    >> = getters as any

                    g.item = (state): GetterList<T>['item'] => {
                        return state.data[state.selected]
                    }

                    g.items = (state): GetterList<T>['items'] => {
                        return state.data
                    }

                    g.selected = (state): GetterList<T>['selected'] => {
                        return state.selected + ''
                    }
                }
            } else {
                const g: Partial<Record<
                    keyof GetterSingle<T>,
                    Getter<StateSingle<T>, R>
                >> = getters as any

                g.item = (state): GetterSingle<T>['item'] => {
                    return state.data
                }
            }
        }
    }
    return getters
}
