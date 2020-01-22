import {Organization} from "./organization.model";
import {map as _map} from "lodash";

export class Announcement {
    editable = true;

    constructor(public id?: number,
                public title?: string,
                public pages?: string[],
                public startDate?: string,
                public endDate?: string,
                public organizations?: Organization[]) {
    }
}

export class AnnouncementCreateUpdateRequest {
    constructor(public title?: string,
                public pages?: string[],
                public startDate?: string,
                public endDate?: string,
                public organizationIds?: number[]) {
    }

    static from(announcement: Announcement): AnnouncementCreateUpdateRequest {
        
        return new AnnouncementCreateUpdateRequest(
            announcement.title,
            announcement.pages,
            announcement.startDate,
            announcement.endDate,
            _map(announcement.organizations, org => org.id)
        );
    }
}