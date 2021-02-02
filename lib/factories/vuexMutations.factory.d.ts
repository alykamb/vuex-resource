import { Mutation } from 'vuex';
import { ResourceMutations } from '../enums/resourceMutations.enum';
import { IResourceOptions } from '../interfaces/resourceOptions';
import { RootStateType } from '../types/rootState.type';
import { State } from '../types/state.type';
export declare function createMutations<T = any, S extends State<T> = State<T>, R = RootStateType>(options: IResourceOptions<T, S, R>): Partial<Record<ResourceMutations, Mutation<S>>>;
