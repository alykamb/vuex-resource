import { Module } from 'vuex';
import { IResourceOptions } from '../interfaces/resourceOptions';
import { RootStateType } from '../types/rootState.type';
import { State } from '../types/state.type';
export declare function createModule<T = any, S extends State<T> = State<T>, R = RootStateType>(options: IResourceOptions<T, S, R>): Module<S, R>;
