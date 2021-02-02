import { PathRoutesType, PathType } from '../types/paths.type';
export declare function parsePath<T = any>(path: PathType, key: keyof Omit<PathRoutesType, 'default'>, id?: string, data?: T): string;
