import { PermissionsModel } from 'src/app/models/permissions-bearer.model';

export class ProvisionList extends PermissionsModel {
    constructor(public id?: number,
    public executionDate?: string,
    public dueDate?: string ,
    public contractStart?: string,
    public contractEnd?: null,
    public contractFilePath?: string,
    public term?: string,
    public productId?: string,
    public deploymentScheduleViews?: string,
    public orderId?: string,
    public dateEntered?: string,
    public provisioningRequestId?: string,
    public partner?: number,
    public customerName?: string,
    public projectName?: string,
    public stage?: string,
    public contractStage?: string,
    public contractStatus?: string,
    public status?: string,
    public sdm?: string,
    public engineer?: string,
    public se?: string,
    public crm?: string,
    public sales?: string,
    public reminders?: string,
    public rejectReason?: string,
    public numberOfDesktops?: string) {
        super();
    }
}

