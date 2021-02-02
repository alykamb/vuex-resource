import { Status } from '../constants/status.constant';
import { ResourceMutations } from '../enums/resourceMutations.enum';
import { parsePath } from '../helpers/path.helpers';
export const wrapApiCall = (actionContext) => {
    actionContext.commit(ResourceMutations.setStatus, { data: Status.FETCHING });
    return async (promise, callback) => {
        try {
            const res = await promise;
            const cb = callback(res.data);
            if (cb && cb instanceof Promise) {
                await cb;
            }
            actionContext.commit(ResourceMutations.setStatus, { data: Status.READY });
            return res.data;
        }
        catch (err) {
            actionContext.commit(ResourceMutations.setStatus, { data: Status.ERROR });
            throw err;
        }
    };
};
function createActionsSingleContextApi(options, actions) {
    const a = actions;
    const c = options.context;
    const co = (context, mut) => (data, id) => context.commit(mut, { data, id, context: c(id, data) });
    a.create = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data), co(actionContext, ResourceMutations.create));
    };
    a.clear = async (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
    };
    a.delete = (actionContext) => {
        return wrapApiCall(actionContext)(options.axios.delete(parsePath(options.path, 'delete')), co(actionContext, ResourceMutations.delete)).then(() => true);
    };
    a.getItem = (actionContext) => {
        return wrapApiCall(actionContext)(options.axios.get(parsePath(options.path, 'delete')), co(actionContext, ResourceMutations.create));
    };
    a.update = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.patch(parsePath(options.path, 'update', null, payload.data), payload.data), co(actionContext, ResourceMutations.update));
    };
}
function createActionsListKeyContextApi(options, actions) {
    const a = actions;
    const c = options.context;
    const co = (context, mut) => (data, id) => context.commit(mut, { data, id, context: c(id, data) });
    a.create = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data), co(actionContext, ResourceMutations.create));
    };
    a.clear = async (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
    };
    a.delete = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.delete(parsePath(options.path, 'delete', payload.id)), co(actionContext, ResourceMutations.delete)).then(() => true);
    };
    a.getItem = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.get(parsePath(options.path, 'delete', payload.id)), co(actionContext, ResourceMutations.create));
    };
    a.update = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.patch(parsePath(options.path, 'update', payload.id, payload.data), payload.data), co(actionContext, ResourceMutations.update));
    };
    a.createMany = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data), co(actionContext, ResourceMutations.createMany));
    };
    a.getPage = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.get(parsePath(options.path, 'delete', null, payload), {
            params: payload,
        }), (data) => co(actionContext, ResourceMutations.createMany)(data.rows));
    };
    a.select = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.select, { id: payload.id, context: c(payload.id) });
        return Promise.resolve(actionContext.getters['item']);
    };
}
function createActionsListContextApi(options, actions) {
    createActionsListKeyContextApi(options, actions);
}
function createActionsSingleApi(options, actions) {
    const a = actions;
    const co = (context, mut) => (data, id) => context.commit(mut, { data, id });
    a.create = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data), co(actionContext, ResourceMutations.create));
    };
    a.clear = async (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
    };
    a.delete = (actionContext) => {
        return wrapApiCall(actionContext)(options.axios.delete(parsePath(options.path, 'delete', null)), co(actionContext, ResourceMutations.delete)).then(() => true);
    };
    a.getItem = (actionContext) => {
        return wrapApiCall(actionContext)(options.axios.get(parsePath(options.path, 'delete', null)), co(actionContext, ResourceMutations.create));
    };
    a.update = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.patch(parsePath(options.path, 'update', null, payload.data), payload.data), co(actionContext, ResourceMutations.update));
    };
}
function createActionsListKeyApi(options, actions) {
    const a = actions;
    const co = (context, mut) => (data, id) => context.commit(mut, { data, id });
    createActionsSingleApi(options, actions);
    a.createMany = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.post(parsePath(options.path, 'create', null, payload.data), payload.data), co(actionContext, ResourceMutations.createMany));
    };
    a.getPage = (actionContext, payload) => {
        return wrapApiCall(actionContext)(options.axios.get(parsePath(options.path, 'delete', null, payload), {
            params: payload,
        }), (data) => co(actionContext, ResourceMutations.createMany)(data.rows));
    };
    a.select = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.select, { id: payload.id });
        return Promise.resolve(actionContext.state.data.get(payload.id));
    };
}
function createActionsListApi(options, actions) {
    createActionsListKeyApi(options, actions);
}
function createActionsSingleContext(options, actions) {
    const a = actions;
    const c = options.context;
    a.create = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        });
        return Promise.resolve(payload.data);
    };
    a.clear = (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
        return Promise.resolve();
    };
    a.delete = (actionContext) => {
        actionContext.commit(ResourceMutations.delete, { context: c() });
        return Promise.resolve(true);
    };
    a.update = (actionContext, payload) => {
        const context = c(null, payload.data);
        actionContext.commit(ResourceMutations.delete, { context });
        return Promise.resolve(actionContext.state.data.get(context));
    };
}
function createActionsListKeyContext(options, actions) {
    const a = actions;
    const c = options.context;
    a.create = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        });
        return Promise.resolve(payload.data);
    };
    a.clear = (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
        return Promise.resolve();
    };
    a.delete = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.delete, { id: payload.id, context: c(payload.id) });
        return Promise.resolve(true);
    };
    a.createMany = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.createMany, {
            data: payload.data,
            context: c(null, payload.data),
        });
        return Promise.resolve(payload.data);
    };
    a.update = (actionContext, payload) => {
        const context = c(payload.id, payload.data);
        actionContext.commit(ResourceMutations.update, {
            data: payload.data,
            id: payload.id,
            context,
        });
        return Promise.resolve(actionContext.state.data.get(payload.id));
    };
    a.select = (actionContext, payload) => {
        const context = c(payload.id);
        actionContext.commit(ResourceMutations.select, {
            id: payload.id,
            context,
        });
        return Promise.resolve(actionContext.state.data.get(payload.id));
    };
}
function createActionsListContext(options, actions) {
    const a = actions;
    const c = options.context;
    a.create = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        });
        return Promise.resolve(payload.data);
    };
    a.clear = (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
        return Promise.resolve();
    };
    a.createMany = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, {
            data: payload.data,
            context: c(null, payload.data),
        });
        return Promise.resolve(payload.data);
    };
    a.delete = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, {
            id: payload.id,
            context: c(payload.id),
        });
        return Promise.resolve(true);
    };
    a.update = (actionContext, payload) => {
        const context = c(payload.id, payload.data);
        actionContext.commit(ResourceMutations.update, {
            data: payload.data,
            id: payload.id,
            context,
        });
        return Promise.resolve(actionContext.state.data.get(context)[+payload.id]);
    };
    a.select = (actionContext, payload) => {
        const context = c(payload.id);
        actionContext.commit(ResourceMutations.select, {
            id: payload.id,
            context,
        });
        return Promise.resolve(actionContext.state.data.get(context)[+payload.id]);
    };
}
function createActionsListKey(_options, actions) {
    const a = actions;
    a.clear = (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
        return Promise.resolve();
    };
    a.create = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, payload);
        return Promise.resolve(payload.data);
    };
    a.createMany = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, payload);
        return Promise.resolve(payload.data);
    };
    a.delete = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.delete, payload);
        return Promise.resolve(true);
    };
    a.update = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.update, payload);
        return Promise.resolve(actionContext.state.data.get(payload.id));
    };
    a.select = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.select, payload);
        return Promise.resolve(actionContext.state.data.get(payload.id));
    };
}
function createActionsList(_options, actions) {
    const a = actions;
    a.clear = (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
        return Promise.resolve();
    };
    a.create = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, payload);
        return Promise.resolve(payload.data);
    };
    a.createMany = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, payload);
        return Promise.resolve(payload.data);
    };
    a.delete = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.delete, payload);
        return Promise.resolve(true);
    };
    a.update = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.update, payload);
        return Promise.resolve(actionContext.state.data[+payload.id]);
    };
    a.select = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.select, payload);
        return Promise.resolve(actionContext.state.data[+payload.id]);
    };
}
function createActionsSingle(_options, actions) {
    const a = actions;
    a.clear = (actionContext) => {
        actionContext.commit(ResourceMutations.clearState);
        return Promise.resolve();
    };
    a.create = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.create, payload);
        return Promise.resolve(payload.data);
    };
    a.delete = (actionContext) => {
        actionContext.commit(ResourceMutations.delete);
        return Promise.resolve(true);
    };
    a.update = (actionContext, payload) => {
        actionContext.commit(ResourceMutations.update, payload);
        return Promise.resolve(actionContext.state.data);
    };
}
export function createActions(options) {
    const actions = {};
    if (options.axios && options.path) {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    createActionsListKeyContextApi(options, actions);
                }
                else {
                    createActionsListContextApi(options, actions);
                }
            }
            else {
                createActionsSingleContextApi(options, actions);
            }
        }
        else {
            if (options.list) {
                if (options.key) {
                    createActionsListKeyApi(options, actions);
                }
                else {
                    createActionsListApi(options, actions);
                }
            }
            else {
                createActionsSingleApi(options, actions);
            }
        }
    }
    else {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    createActionsListKeyContext(options, actions);
                }
                else {
                    createActionsListContext(options, actions);
                }
            }
            else {
                createActionsSingleContext(options, actions);
            }
        }
        else {
            if (options.list) {
                if (options.key) {
                    createActionsListKey(options, actions);
                }
                else {
                    createActionsList(options, actions);
                }
            }
            else {
                createActionsSingle(options, actions);
            }
        }
        return actions;
    }
}
//# sourceMappingURL=vuexActions.factory.js.map