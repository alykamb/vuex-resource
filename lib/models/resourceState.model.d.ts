import { Status } from '../constants/status.constant';
export declare class ResourceState<T = any> {
    data: Map<string, T>;
    list: Set<string>;
    selected: string;
    status: Status;
}
