import { Status } from '../constants/status.constant';
function createStateSingle() {
    return {
        data: null,
    };
}
function createStateSingleApi() {
    return {
        data: null,
        status: Status.INIT,
    };
}
function createStateSingleContext() {
    return {
        data: new Map(),
    };
}
function createStateSingleContextApi() {
    return {
        data: new Map(),
        status: Status.INIT,
    };
}
function createStateList() {
    return {
        data: [],
        selected: null,
    };
}
function createStateListApi() {
    return {
        data: [],
        status: Status.INIT,
        selected: null,
    };
}
function createStateListContext() {
    return {
        data: new Map(),
        selected: new Map(),
    };
}
function createStateListContextApi() {
    return {
        data: new Map(),
        status: Status.INIT,
        selected: new Map(),
    };
}
function createStateListKey() {
    return {
        data: new Map(),
        selected: null,
        list: new Set(),
    };
}
function createStateListKeyApi() {
    return {
        data: new Map(),
        selected: null,
        list: new Set(),
        status: Status.INIT,
    };
}
function createStateListKeyContext() {
    return {
        data: new Map(),
        selected: new Map(),
        list: new Map(),
    };
}
function createStateListKeyContextApi() {
    return {
        data: new Map(),
        selected: new Map(),
        list: new Map(),
        status: Status.INIT,
    };
}
export function createState(options) {
    if (options.axios && options.path) {
        if (options.context) {
            if (options.list) {
                if (options.key) {
                    return createStateListKeyContextApi();
                }
                return createStateListContextApi();
            }
            return createStateSingleContextApi();
        }
        if (options.list) {
            if (options.key) {
                return createStateListKeyApi();
            }
            return createStateListApi();
        }
        return createStateSingleApi();
    }
    if (options.context) {
        if (options.list) {
            if (options.key) {
                return createStateListKeyContext();
            }
            // list + context
            return createStateListContext();
        }
        //single + context
        return createStateSingleContext();
    }
    if (options.list) {
        if (options.key) {
            return createStateListKey();
        }
        return createStateList();
    }
    return createStateSingle();
}
//# sourceMappingURL=vuexState.factory.js.map