import { PermissionsModel } from 'src/app/models/permissions-bearer.model';
import { AddressView } from '../address1.model';

export class ProvisonCustomerInformation extends PermissionsModel {
    constructor(public id:number = null,
        public customer: provisionCustomerID = null,
        public projectName: string ="",
        public customerContacts:Array<CustomerContact>,
        public address: AddressView,
        public contractPath:string = "",
        public contractExecutionDate: string = "",
        public contractDueDate: string = "",
        public salesUserId: number = null,
        public salesEngineerUserId: number = null,
        public projectCoordinatorUserId: number = null,
        public engineerUserId: number = null,
        public vsaUserId: number = null,
        public vseUserId: number = null,
        public crmUserId: number = null,
        public sdmUserId: number = null,
        public loeUserId: number = null) {
        super();
    }
}

interface provisionCustomerID {
    custId?:number
}

interface CustomerContact {
    id?:number,
   contactType :contactType,
    firstName?:string,
    lastName: string,
    email?: string,
    phone?: string,
    isDelete: boolean,
    contactId?:null
}

interface contactType{
    id?: number,
    typeName?: string
}



