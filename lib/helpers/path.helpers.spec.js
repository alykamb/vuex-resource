import { path } from '../parsePath';
import { parsePath } from './path.helpers';
describe('parsePath', () => {
    const s = 'path/to/test';
    describe('string path', () => {
        it('should return the path it self for string and create', () => {
            expect(parsePath(s, 'create')).toBe(s);
        });
        it('should return the path with id for string and id', () => {
            expect(parsePath(s, 'create', 'ads')).toBe(s + '/' + 'ads');
        });
    });
    describe('object context path', () => {
        it('should append id to path for string path, getItem method, and id', () => {
            expect(parsePath(path `${s}/${(id) => id}`, 'getItem', 'ads')).toBe(s + '/' + 'ads');
        });
        it('should use data property in path', () => {
            expect(parsePath(path `${s}/${(_, d) => d.a}`, 'update', null, { a: 'hi' })).toBe(`${s}/hi`);
        });
        test('context should be called', () => {
            const c = () => 'context';
            expect(parsePath(path `path/${c}`, 'delete')).toBe(`path/${c()}`);
        });
    });
    describe('object param with routes paths', () => {
        test('default should be used in absence of create', () => {
            expect(parsePath({
                default: s,
            }, 'create')).toBe(s);
        });
        test('should throw with empty object', () => {
            expect(() => parsePath({}, 'create')).toThrow();
        });
        test('default should not be used if all paths exist', () => {
            const options = {
                default: `${s}/default`,
                create: `${s}/create`,
                update: `${s}/update/id`,
                getPage: `${s}/getPage`,
                getItem: `${s}/getItem/id`,
                delete: `${s}/delete/id`,
            };
            Object.keys(options).forEach((key) => {
                if (key === 'default') {
                    return;
                }
                expect(parsePath(options, key, 'id')).toBe(options[key]);
            });
        });
    });
});
//# sourceMappingURL=path.helpers.spec.js.map