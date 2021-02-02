import { ResourceMethods } from '../enums/resourceMethods.enum';
export interface IModuleOptions {
    name: string;
    methods?: Set<ResourceMethods>;
}
