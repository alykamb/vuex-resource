/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios, { AxiosInstance } from 'axios'
// import { Vue } from 'vue-class-component'
// import { Vue } from 'vue-class-component'
// import { Getter, Module } from 'vuex'
import { createModule } from './factories/vuexModule.factory';
export function resource(name, store) {
    const options = { name, store };
    function create() {
        options.store.registerModule(options.name, createModule(options));
        const a = (name, payload) => {
            return options.store.dispatch(`${options.name}/${name}`, payload);
        };
        const g = (name) => {
            return options.store.getters[`${options.name}/${name}`];
        };
        const ret = {
            get item() {
                return g('item');
            },
            clear() {
                return a('clear');
            },
            create(payload) {
                return a('create', payload);
            },
            delete(payload) {
                return a('delete', payload);
            },
            update(payload) {
                return a('update', payload);
            },
        };
        if (options.axios && options.path !== 'undefined') {
            Object.defineProperty(ret, 'status', {
                get() {
                    return g('status');
                },
            });
            ret.getItem = function getItem(payload) {
                return a('getItem', payload);
            };
            if (options.list) {
                ;
                ret.getPage = function getPage(payload) {
                    return a('getPage', payload);
                };
            }
        }
        if (options.list) {
            const r = ret;
            Object.defineProperty(ret, 'items', {
                get() {
                    return g('items');
                },
            });
            Object.defineProperty(ret, 'selected', {
                get() {
                    return g('selected');
                },
            });
            r.createMany = function createMany(payload) {
                return a('createMany', payload);
            };
            r.select = function select(payload) {
                return a('select', payload);
            };
        }
        return ret;
    }
    function useApi(api, path) {
        options.axios = api;
        options.path = path;
        return getBase();
    }
    function useKey(key) {
        options.key = key;
        return getBase();
    }
    function useContext(context) {
        options.context = context;
        return getBase();
    }
    function useChildren(children) {
        options.children = children;
        return getBase();
    }
    function useList() {
        options.list = true;
        return getBase();
    }
    function getBase() {
        return {
            create,
            useApi,
            useList,
            useContext,
            useChildren,
            useKey,
        };
    }
    return getBase();
}
//# sourceMappingURL=resource.js.map