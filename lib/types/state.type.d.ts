import { Status } from '../constants/status.constant';
export declare type WithApi<T> = T & {
    status: Status;
};
export declare type StateSingle<T> = {
    data: T;
};
export declare type StateSingleApi<T> = WithApi<StateSingle<T>>;
export declare type StateSingleContext<T> = {
    data: Map<string, T>;
};
export declare type StateSingleContextApi<T> = WithApi<StateSingleContext<T>>;
export declare type StateList<T> = {
    data: T[];
    selected: number;
};
export declare type StateListApi<T> = WithApi<StateList<T>>;
export declare type StateListContext<T> = {
    data: Map<string, T[]>;
    selected: Map<string, number>;
};
export declare type StateListContextApi<T> = WithApi<StateListContext<T>>;
export declare type StateListKey<T> = {
    data: Map<string, T>;
    list: Set<string>;
    selected: string;
};
export declare type StateListKeyApi<T> = WithApi<StateListKey<T>>;
export declare type StateListKeyContext<T> = {
    data: Map<string, T>;
    list: Map<string, Set<string>>;
    selected: Map<string, string>;
};
export declare type StateListKeyContextApi<T> = WithApi<StateListKeyContext<T>>;
export declare type StateContext<T = any> = StateSingleContext<T> | StateSingleContextApi<T> | StateListContext<T> | StateListContextApi<T> | StateListKeyContext<T> | StateListKeyContextApi<T>;
export declare type StateApi<T = any> = StateSingleApi<T> | StateSingleContextApi<T> | StateListApi<T> | StateListKeyApi<T> | StateListKeyContextApi<T>;
export declare type State<T = any> = StateSingle<T> | StateSingleApi<T> | StateSingleContext<T> | StateSingleContextApi<T> | StateList<T> | StateListApi<T> | StateListContext<T> | StateListContextApi<T> | StateListKey<T> | StateListKeyApi<T> | StateListKeyContext<T> | StateListKeyContextApi<T>;
