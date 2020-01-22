import { Address } from "./address.model";
import { PermissionsModel } from "./permissions-bearer.model";

// Partner Model
export class Partner extends PermissionsModel {
        public partnerId?: number;
        public partnerName?: string;
        public phoneNumber?: number;
        public partnerEmail?: string;
        public pid?: string;
        public address?: Address;
}



