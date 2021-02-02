import { Status } from '../constants/status.constant'
import { IResourceOptions } from '../interfaces/resourceOptions'
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

function createStateSingle<T = any>(): StateSingle<T> {
    return {
        data: null,
    }
}

function createStateSingleApi<T = any>(): StateSingleApi<T> {
    return {
        data: null,
        status: Status.INIT,
    }
}

function createStateSingleContext<T = any>(): StateSingleContext<T> {
    return {
        data: new Map<string, T>(),
    }
}

function createStateSingleContextApi<T = any>(): StateSingleContextApi<T> {
    return {
        data: new Map<string, T>(),
        status: Status.INIT,
    }
}

function createStateList<T = any>(): StateList<T> {
    return {
        data: [],
        selected: null,
    }
}

function createStateListApi<T = any>(): StateListApi<T> {
    return {
        data: [],
        status: Status.INIT,
        selected: null,
    }
}

function createStateListContext<T = any>(): StateListContext<T> {
    return {
        data: new Map<string, T[]>(),
        selected: new Map<string, number>(),
    }
}

function createStateListContextApi<T = any>(): StateListContextApi<T> {
    return {
        data: new Map<string, T[]>(),
        status: Status.INIT,
        selected: new Map<string, number>(),
    }
}

function createStateListKey<T = any>(): StateListKey<T> {
    return {
        data: new Map<string, T>(),
        selected: null,
        list: new Set<string>(),
    }
}

function createStateListKeyApi<T = any>(): StateListKeyApi<T> {
    return {
        data: new Map<string, T>(),
        selected: null,
        list: new Set<string>(),
        status: Status.INIT,
    }
}

function createStateListKeyContext<T = any>(): StateListKeyContext<T> {
    return {
        data: new Map<string, T>(),
        selected: new Map<string, string>(),
        list: new Map<string, Set<string>>(),
    }
}

function createStateListKeyContextApi<T = any>(): StateListKeyContextApi<T> {
    return {
        data: new Map<string, T>(),
        selected: new Map<string, string>(),
        list: new Map<string, Set<string>>(),
        status: Status.INIT,
    }
}

export function createState<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
): State<T> {
    if (options.axios && options.path) {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    return createStateListKeyContextApi<T>()
                }
                return createStateListContextApi<T>()
            }
            return createStateSingleContextApi<T>()
        }

        if (options.list) {
            if (options.key) {
                return createStateListKeyApi<T>()
            }
            return createStateListApi<T>()
        }
        return createStateSingleApi<T>()
    }

    if (options.context) {
        if (options.list) {
            if (options.key) {
                return createStateListKeyContext<T>()
            }

            // list + context
            return createStateListContext<T>()
        }

        //single + context
        return createStateSingleContext<T>()
    }

    if (options.list) {
        if (options.key) {
            return createStateListKey<T>()
        }
        return createStateList<T>()
    }
    return createStateSingle<T>()
}
