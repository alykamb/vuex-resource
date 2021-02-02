import { IPaginatedData } from '../interfaces/paginatedData.interface'
import { ResourcePagination } from '../models/resourcePagination.model'

export type ActionsSingle<T> = {
    update: (payload: { data: Partial<T> }) => Promise<T>
    delete: () => Promise<boolean>
    create: (payload: { data: T }) => Promise<T>
    clear: () => Promise<void>
}

export type ActionsSingleApi<T> = {
    getItem: () => Promise<T>
} & ActionsSingle<T>

export type ActionsList<T> = {
    update: (payload: { data: Partial<T>; id: string }) => Promise<T>
    delete: (payload: { id: string }) => Promise<boolean>
    create: (payload: { data: T }) => Promise<T>
    createMany: (payload: { data: T[] }) => Promise<T[]>
    clear: () => Promise<void>
    select: (payload: { id: string }) => Promise<T>
}

export type ActionsListApi<T> = {
    getItem: (payload: { id: string }) => Promise<T>
    getPage: (payload: {
        pagination?: ResourcePagination
        filter?: any
    }) => Promise<IPaginatedData<T>>
} & ActionsList<T>
