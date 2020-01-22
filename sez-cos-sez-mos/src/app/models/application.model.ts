import {ApplicationGroup} from "./application-group.model";
import {PermissionsModel} from "./permissions-bearer.model";
import {ShortEntityInfo} from "./short-entity-info.model";

export class Application extends PermissionsModel {
    color: string;

    constructor(public id?: number,
                public name?: string,
                public description?: string,
                public url?: string,
                public applicationGroups?: Array<ApplicationGroup>,
                public owner?: ShortEntityInfo,
                public horizon = false,
                public starred = false) {
        super();
    }
}