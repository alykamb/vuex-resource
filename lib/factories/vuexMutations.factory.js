import { Status } from '../constants/status.constant';
function createMutationsContextListKey(options, mutations) {
    const m = mutations;
    m.create = (s, p) => {
        const id = p.data[options.key];
        s.data.set(id, p.data);
        const list = s.list.get(p.context) || new Set();
        list.add(id);
        s.list.set(p.context, list);
    };
    m.createMany = (s, p) => {
        p.data.forEach((data) => {
            const id = data[options.key];
            s.data.set(id, data);
            const list = s.list.get(p.context) || new Set();
            list.add(id);
            s.list.set(p.context, list);
        });
    };
    m.update = (s, p) => {
        let newData;
        if (p.data instanceof Object) {
            newData = { ...s.data.get(p.id), ...p.data };
        }
        else {
            newData = p.data;
        }
        s.data.set(p.id, newData);
    };
    m.delete = (s, p) => {
        s.list.get(p.context).delete(p.id);
        s.data.delete(p.id);
        if (s.selected.get(p.context) === p.id) {
            s.selected.delete(p.context);
        }
    };
    m.select = (s, p) => {
        s.selected.set(p.context, p.id);
    };
    m.clearState = (s) => {
        s.data = new Map();
        s.list = new Map();
        s.selected = new Map();
        s.status = Status.READY;
    };
}
function createMutationsContextList(options, mutations) {
    const m = mutations;
    // list context api
    m.create = (s, p) => {
        const data = s.data.get(p.context) || [];
        s.data.set(p.context, [...data, p.data]);
    };
    m.createMany = (s, p) => {
        const data = s.data.get(p.context) || [];
        s.data.set(p.context, [...data, ...p.data]);
    };
    m.update = (s, p) => {
        const data = s.data.get(p.context);
        s.data.set(p.context, [...data.slice(0, p.id), data[p.id], ...data.slice(p.id + 1)]);
    };
    m.delete = (s, p) => {
        s.data.set(p.context, s.data.get(p.context).filter((_, i) => i !== p.id));
    };
    m.select = (s, p) => {
        s.selected.set(p.context, p.id);
    };
    m.clearState = (s) => {
        s.data = new Map();
        s.selected = new Map();
        s.status = Status.READY;
    };
}
function createMutationsContextSingle(options, mutations) {
    const m = mutations;
    // single context api
    m.create = (s, p) => {
        s.data.set(p.context, p.data);
    };
    m.update = (s, p) => {
        let newData;
        if (p.data instanceof Object) {
            newData = { ...s.data.get(p.context), ...p.data };
        }
        else {
            newData = p.data;
        }
        s.data.set(p.context, newData);
    };
    m.delete = (s, p) => {
        s.data.delete(p.context);
    };
    m.clearState = (s) => {
        s.data = new Map();
        s.status = Status.READY;
    };
}
function createMutationsListKey(options, mutations) {
    const m = mutations;
    // list key api
    m.create = (s, p) => {
        const id = p.data[options.key];
        s.data.set(id, p.data);
        s.list.add(id);
    };
    m.createMany = (s, p) => {
        p.data.forEach((data) => {
            const id = data[options.key];
            s.data.set(id, data);
            s.list.add(id);
        });
        s.data;
    };
    m.update = (s, p) => {
        let newData;
        if (p.data instanceof Object) {
            newData = { ...s.data.get(p.id), ...p.data };
        }
        else {
            newData = p.data;
        }
        s.data.set(p.id, newData);
    };
    m.delete = (s, p) => {
        s.data.delete(p.id);
        s.list.delete(p.id);
        if (s.selected === p.id) {
            s.selected = null;
        }
    };
    m.select = (s, p) => {
        s.selected = p.id;
    };
    m.clearState = (s) => {
        s.data = new Map();
        s.list = new Set();
        s.selected = null;
    };
}
function createMutationsList(options, mutations) {
    const m = mutations;
    // list api
    m.create = (s, p) => {
        s.data = [...s.data, p.data];
    };
    m.createMany = (s, p) => {
        s.data = [...s.data, ...p.data];
    };
    m.update = (s, p) => {
        let newData;
        if (p.data instanceof Object) {
            newData = { ...s.data[p.id], ...p.data };
        }
        else {
            newData = p.data;
        }
        s.data = [...s.data.slice(0, p.id), newData, ...s.data.slice(p.id + 1)];
    };
    m.delete = (s, p) => {
        s.data = s.data.filter((_, i) => i !== p.id);
    };
    m.select = (s, p) => {
        s.selected = p.id;
    };
    m.clearState = (s) => {
        s.data = [];
        s.selected = null;
    };
}
function createMutationsSingle(options, mutations) {
    const m = mutations;
    // single api
    m.create = (s, p) => {
        s.data = p.data;
    };
    m.update = (s, p) => {
        if (p.data instanceof Object) {
            s.data = { ...s.data, ...p.data };
        }
        else {
            s.data = p.data;
        }
    };
    m.delete = (s) => {
        s.data = null;
    };
    m.clearState = (s) => {
        s.data = null;
    };
}
export function createMutations(options) {
    const mutations = {};
    if (options.axios && options.path) {
        ;
        mutations.setStatus = (s, p) => {
            s.status = p.data;
        };
    }
    if (options.context) {
        if (options.list) {
            if (options.key) {
                createMutationsContextListKey(options, mutations);
            }
            else {
                createMutationsContextList(options, mutations);
            }
        }
        else {
            createMutationsContextSingle(options, mutations);
        }
    }
    else {
        if (options.list) {
            if (options.key) {
                createMutationsListKey(options, mutations);
            }
            else {
                createMutationsList(options, mutations);
            }
        }
        else {
            createMutationsSingle(options, mutations);
        }
    }
    return mutations;
}
//# sourceMappingURL=vuexMutations.factory.js.map