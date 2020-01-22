import {Organization} from "./organization.model";
import {ShortEntityInfo} from "./short-entity-info.model";

export class OrganizationGroup {
    constructor(public id?: number,
                public name?: string,
                public organizations?: Array<Organization>,
                public owner?: ShortEntityInfo) {
    }
}