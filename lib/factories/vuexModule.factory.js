import { createActions } from './vuexActions.factory';
import { createGetters } from './vuexGetters.factory';
import { createMutations } from './vuexMutations.factory';
import { createState } from './vuexState.factory';
export function createModule(options) {
    return {
        namespaced: true,
        state: () => createState(options),
        getters: createGetters(options),
        actions: createActions(options),
        mutations: createMutations(options),
    };
}
//# sourceMappingURL=vuexModule.factory.js.map