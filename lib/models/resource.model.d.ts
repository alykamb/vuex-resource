import { Status } from '../constants/status.constant';
import { IPaginatedData } from '../interfaces/paginatedData.interface';
import { ResourcePagination } from './resourcePagination.model';
export declare class ResourceModel<T = any> {
    create: (data: T) => Promise<T>;
    delete: (id: string) => Promise<boolean>;
    update: (id: string, data: T) => Promise<T>;
    createMany: (data: T[]) => Promise<T[]>;
    clear: () => Promise<void>;
    getItem: (id: string) => Promise<T>;
    getPage: (payload?: {
        pagination?: ResourcePagination;
        filter?: any;
    }) => Promise<IPaginatedData<T>>;
    item: T;
    items: T[];
    status: Status;
}
