import { Module } from 'vuex'

import { IResourceOptions } from '../interfaces/resourceOptions'
import { RootStateType } from '../types/rootState.type'
import { State } from '../types/state.type'
import { createActions } from './vuexActions.factory'
import { createGetters } from './vuexGetters.factory'
import { createMutations } from './vuexMutations.factory'
import { createState } from './vuexState.factory'

export function createModule<T = any, S extends State<T> = State<T>, R = RootStateType>(
    options: IResourceOptions<T, S, R>,
): Module<S, R> {
    return {
        namespaced: true,
        state: () => createState<T, S, R>(options) as S,
        getters: createGetters<T, S, R>(options),
        actions: createActions<T, S, R>(options),
        mutations: createMutations<T, S, R>(options),
    }
}
