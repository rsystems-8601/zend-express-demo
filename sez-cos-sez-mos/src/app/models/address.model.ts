export class Address {
     addressId: number;
     address1: string;
     address2: string;
     cityView: cityView;
     address: string;
     zipCode: number;
}

export class cityView {
     cityId: number;
     cityName: string;
     stateView: stateView;
}

export class stateView {
     stateId:number;
     stateName:string;
     countryView: countryView;
     postalCode: string;
}

export class countryView {
     countryId: number;
     countryName:string;
}


