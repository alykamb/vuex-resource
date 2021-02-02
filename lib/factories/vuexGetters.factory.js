export function createGetters(options) {
    const getters = {};
    if (options.axios && options.path) {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    const g = getters;
                    g.item = (state) => {
                        const c = options.context();
                        return state.data.get(state.selected.get(c));
                    };
                    g.items = (state) => {
                        const c = options.context();
                        return Array.from(state.list.get(c)?.values() || []).map((k) => state.data.get(k));
                    };
                    g.selected = (state) => {
                        const c = options.context();
                        return state.selected.get(c);
                    };
                    g.status = (state) => {
                        return state.status;
                    };
                }
                else {
                    const g = getters;
                    g.item = (state) => {
                        const c = options.context();
                        return state.data.get(c)?.[state.selected.get(c)];
                    };
                    g.items = (state) => {
                        const c = options.context();
                        return state.data.get(c);
                    };
                    g.selected = (state) => {
                        const c = options.context();
                        return state.selected.get(c) + '';
                    };
                    g.status = (state) => {
                        return state.status;
                    };
                }
            }
            else {
                const g = getters;
                g.item = (state) => {
                    const c = options.context();
                    return state.data.get(c);
                };
                g.status = (state) => {
                    return state.status;
                };
            }
        }
        else {
            // has api but no context
            if (options.list) {
                if (options.key) {
                    const g = getters;
                    g.item = (state) => {
                        return state.data.get(state.selected);
                    };
                    g.items = (state) => {
                        return Array.from(state.list.values()).map((key) => state.data.get(key));
                    };
                    g.selected = (state) => {
                        return state.selected;
                    };
                    g.status = (state) => {
                        return state.status;
                    };
                }
                else {
                    const g = getters;
                    g.item = (state) => {
                        return state.data[state.selected];
                    };
                    g.items = (state) => {
                        return state.data;
                    };
                    g.selected = (state) => {
                        return state.selected + '';
                    };
                    g.status = (state) => {
                        return state.status;
                    };
                }
            }
            else {
                //single
                const g = getters;
                g.item = (state) => {
                    return state.data;
                };
                g.status = (state) => {
                    return state.status;
                };
            }
        }
    }
    else {
        // no api
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    const g = getters;
                    g.item = (state) => {
                        const c = options.context();
                        return state.data.get(state.selected.get(c));
                    };
                    g.items = (state) => {
                        const c = options.context();
                        return Array.from(state.list.get(c)?.values() || []).map((k) => state.data.get(k));
                    };
                    g.selected = (state) => {
                        const c = options.context();
                        return state.selected.get(c);
                    };
                }
                else {
                    const g = getters;
                    g.item = (state) => {
                        const c = options.context();
                        return state.data.get(c)?.[state.selected.get(c)];
                    };
                    g.items = (state) => {
                        const c = options.context();
                        return state.data.get(c);
                    };
                    g.selected = (state) => {
                        const c = options.context();
                        return state.selected.get(c) + '';
                    };
                }
            }
            else {
                const g = getters;
                g.item = (state) => {
                    const c = options.context();
                    return state.data.get(c);
                };
            }
        }
        else {
            if (options.list) {
                if (options.key) {
                    const g = getters;
                    g.item = (state) => {
                        return state.data.get(state.selected);
                    };
                    g.items = (state) => {
                        return Array.from(state.list.values() || []).map((key) => state.data.get(key));
                    };
                    g.selected = (state) => {
                        return state.selected;
                    };
                }
                else {
                    const g = getters;
                    g.item = (state) => {
                        return state.data[state.selected];
                    };
                    g.items = (state) => {
                        return state.data;
                    };
                    g.selected = (state) => {
                        return state.selected + '';
                    };
                }
            }
            else {
                const g = getters;
                g.item = (state) => {
                    return state.data;
                };
            }
        }
    }
    return getters;
}
//# sourceMappingURL=vuexGetters.factory.js.map