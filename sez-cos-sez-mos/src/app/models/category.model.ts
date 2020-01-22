import { PermissionsModel } from "./permissions-bearer.model";

export class Category extends PermissionsModel {
        public id?: number;
        public categoryName: string;
        public categoryDefinition: string;
        public notes?: string;
}




