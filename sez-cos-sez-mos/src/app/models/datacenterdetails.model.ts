
export class Datacenterdetails {
        public id?: number;
        public name?: string;
        public portalUrl?:string;
        public supportEmail?:string;
        public cage?:string;
        public workPhone?:string;
        public customerId?:number;
        public rackTypeID?:rackType;
        public powertypeId?:powerType;
        public environmentType?:string;
        public isBioMetric?:boolean;
        public isCamera?:boolean;
        public isComplaince?:boolean;
        public isNoncomplaince?:boolean;
        public maximumPodsCompliance?:number;
        public maximumPodsNoncompliance?:number;
        public address?:Address;
        public airportCode?:string;
        public dCenterNotationId?: string;
       
}

export class rackType {
     public id?:number;
     public name?:string;
}

export class powerType {
     public id?:number;
     public name?:string;
}

export class Address {
        public addressId?: number;
        public address1?: string;
        public address2?: string;
        public cityView?: cityView;
        public address?: string;
        public zipCode?: number;
   }
   
   export class cityView {
        public cityId?: number;
        public cityName?: string;
        public zipcode?:string[];
        public stateView?: stateView;
   }
   
   export class stateView {
        public stateId?:number;
        public stateName?:string;
        public countryView?: countryView;
        public postalCode?: string;
   }
   
   export class countryView {
        public countryId?: number;
        public countryName?:string;
   }
   


    