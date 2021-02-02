import { ContextType } from './context.type';
export declare type PathObjectOptions<T = any> = {
    strings: TemplateStringsArray;
    contexts?: Array<ContextType<T> | string>;
};
export declare type PathOptions<T = any> = string | PathObjectOptions<T>;
