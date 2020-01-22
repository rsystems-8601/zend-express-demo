import { PermissionsModel } from "./permissions-bearer.model";

export class Customercontract extends PermissionsModel {
        id: number;
        dateCompleted: string;
        contractFilePath: string;
        provisioningRequestId : string;
        customerName: string;
        cid: number;
        createdAt: string;
        stage: string;
        deploymentScheduleViews: DeploymentScheduleViews;
}

export class DeploymentScheduleViews {
        id: number;
        endDate: string;
        type : string;
}




    