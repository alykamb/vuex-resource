import { Status } from '../constants/status.constant';
import { ResourceMutations } from '../enums/resourceMutations.enum';
import { wrapApiCall } from './vuexActions.factory';
let commits = [];
let actions = [];
const actionContext = {
    commit: (type, payload) => {
        commits.push([type, payload]);
    },
    dispatch: async (type, payload) => {
        actions.push([type, payload]);
    },
    state: {},
    getters: {},
    rootState: {},
    rootGetters: {},
};
describe('wrapApiCall', () => {
    beforeEach(() => {
        commits = [];
        actions = [];
    });
    test('should commit with the context', () => {
        wrapApiCall(actionContext, () => 'context')(Promise.resolve({ data: 1 }), (data, c) => {
            expect(data).toBe(1);
            expect(c).toBe('context');
        });
    });
    test('should commit without the context', () => {
        wrapApiCall(actionContext)(Promise.resolve({ data: 1 }), (data, c) => {
            expect(data).toBe(1);
            expect(c).toBe(undefined);
        });
    });
    test('should change status to FETCHING', () => {
        wrapApiCall(actionContext)(Promise.resolve({ data: 1 }), () => {
            const commit = commits.find((c) => c[0] === ResourceMutations.setStatus && c[1].data === Status.FETCHING);
            expect(commit).toBeTruthy();
        });
    });
    test('should change status to READY', () => {
        wrapApiCall(actionContext)(Promise.resolve({ data: 1 }), () => {
            expect(true).toBe(true);
        }).then(() => {
            const commit = commits.find((c) => c[0] === ResourceMutations.setStatus && c[1].data === Status.READY);
            expect(commit).toBeTruthy();
        });
    });
    test('should change status to ERROR', () => {
        wrapApiCall(actionContext)(Promise.reject(new Error()), () => {
            expect(true).toBe(true);
        }).catch(() => {
            const commit = commits.find((c) => c[0] === ResourceMutations.setStatus && c[1].data === Status.ERROR);
            expect(commit).toBeTruthy();
        });
    });
});
describe('createActions', () => {
    test.todo('should commit with the context');
    test.todo('should commit without the context');
    test.todo('should change status to FETCHING');
    test.todo('should change status to FETCHED');
    test.todo('should change status to READY');
    test.todo('should call context function');
    test.todo('should create all methods for normalized');
    test.todo('should create all methods for list');
    test.todo('should create methods create, delete, update and getItem for single');
    test.todo('should');
});
//# sourceMappingURL=vuexActions.factory.spec.js.map