import { Getter } from 'vuex';
import { ResourceGetters } from '../enums/resourceGetters.enum';
import { IResourceOptions } from '../interfaces/resourceOptions';
import { RootStateType } from '../types/rootState.type';
import { State } from '../types/state.type';
export declare function createGetters<T = any, S extends State<T> = State<T>, R = RootStateType>(options: IResourceOptions<T, S, R>): Partial<Record<ResourceGetters, Getter<S, R>>>;
