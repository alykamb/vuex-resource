import { Status } from '../constants/status.constant'

export class ResourceState<T = any> {
    data = new Map<string, T>()
    list = new Set<string>()
    selected: string = null
    status: Status = Status.INIT
}
