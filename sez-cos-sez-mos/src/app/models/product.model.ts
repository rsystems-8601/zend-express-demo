import { PermissionsModel } from "./permissions-bearer.model";

export class Product extends PermissionsModel {
        
        public id:number;
        public name: string;
        public description : string;
        public price: number;
        public productPriceL1: number;
        public productPriceL2: number;
        public productPriceL3: number;
        public inStock: boolean;
        public automationBluprint: Automationblueprint;
        public productCategoryView: Productcategoryview;
}

export class Automationblueprint {
        id: number;
        name: string;
        description: string;
        jobName: string;
        createdBy: number;
        isDeleted: boolean;
}

export class Productcategoryview {
        id: number;
        categoryName: string;
        categoryDefinition: string;
}




    