import { PermissionsModel } from "./permissions-bearer.model";

export class AddressView {
     addressId?: number;
     address1: string;
     address2: string;
     zipCode: number;
     cityView: cityView;

}

export class cityView {
     cityId: number;
     cityName?: string;
     zipcode?:string[];
     stateView?: stateView;
}


export class stateView {
     stateId?:number;
     stateName?:string;
     countryView?: countryView;
     postalCode?: string;
}

export class countryView {
     countryId: number;
     countryName?:string;
}


