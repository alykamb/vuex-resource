import { ResourceActions } from '../enums/resourceActions.enum';
import { ResourceData } from '../enums/resourceData.enum';
import { ResourceGetters } from '../enums/resourceGetters.enum';
import { ResourceMethods } from '../enums/resourceMethods.enum';
import { ResourceMutations } from '../enums/resourceMutations.enum';
export declare const resourceName: (name: string, type: keyof typeof ResourceData | keyof typeof ResourceMutations | keyof typeof ResourceActions | keyof typeof ResourceMethods | keyof typeof ResourceGetters) => string;
