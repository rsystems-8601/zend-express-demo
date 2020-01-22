import {Organization} from "./organization.model";
import {PermissionsModel} from "./permissions-bearer.model";
import {ShortEntityInfo} from "./short-entity-info.model";

export class ApplicationGroup extends PermissionsModel {
    constructor(public id?: number,
                public name?: string,
                public organizations?: Array<Organization>,
                public owner?: ShortEntityInfo,
                public enabled = true) {
        super();
    }
}