import {Injectable} from "@angular/core";
import {isUndefined as _isUndefined} from "lodash";

@Injectable({
    providedIn:"root"
})
export class StatusService {
    getStatuses(): Array<string> {
        return Status.VALUES;
    }

    statusOf(enabled: boolean): string {
        if (_isUndefined(enabled)) {
            return undefined;
        }
        return enabled ? Status.ACTIVE : Status.INACTIVE;
    }

    valueOfStatus(status: string): boolean {
        return status === Status.ACTIVE ? true :
            (status === Status.INACTIVE ? false : null);
    }
}

class Status {
    static ACTIVE = "active";
    static INACTIVE = "inactive";
    static VALUES = [Status.ACTIVE, Status.INACTIVE];
}