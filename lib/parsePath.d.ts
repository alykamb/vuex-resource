import { ContextType } from './types/context.type';
export declare function path<T = any>(strings: TemplateStringsArray, ...contexts: Array<ContextType<T> | string>): {
    strings: TemplateStringsArray;
    contexts: (string | ContextType<T>)[];
};
