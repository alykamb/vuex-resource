import { Status } from '../constants/status.constant'
import { IPaginatedData } from '../interfaces/paginatedData.interface'
import { ResourcePagination } from './resourcePagination.model'

export class ResourceModel<T = any> {
    public create!: (data: T) => Promise<T>
    public delete!: (id: string) => Promise<boolean>
    public update!: (id: string, data: T) => Promise<T>
    public createMany!: (data: T[]) => Promise<T[]>
    public clear!: () => Promise<void>
    public getItem!: (id: string) => Promise<T>
    public getPage!: (payload?: {
        pagination?: ResourcePagination
        filter?: any
    }) => Promise<IPaginatedData<T>>

    public item!: T
    public items!: T[]
    public status!: Status
}
