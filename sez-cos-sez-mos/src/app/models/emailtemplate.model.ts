import { PermissionsModel } from "./permissions-bearer.model";

export class EmailTemplate extends PermissionsModel {
        public id:number;
        public name: string;
}

export class EmailTemplatedetails {
  id: number;
  subject: EmailSubject;
  templateText: string;
}

export class EmailSubject {
        text: string;
        isEditable: boolean;
}




    