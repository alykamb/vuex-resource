import { Status } from '../constants/status.constant';
export declare class ResourceStateContext<T = any> {
    data: Map<string, T>;
    selected: Map<string, string>;
    list: Map<string, Set<string>>;
    status: Map<string, Status>;
}
