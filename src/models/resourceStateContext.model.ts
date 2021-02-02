import { Status } from '../constants/status.constant'

export class ResourceStateContext<T = any> {
    data = new Map<string, T>()
    selected = new Map<string, string>()
    list = new Map<string, Set<string>>()
    status = new Map<string, Status>()
}
