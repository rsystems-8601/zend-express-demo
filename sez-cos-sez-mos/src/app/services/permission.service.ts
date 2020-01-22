import {Injectable} from "@angular/core";
import {AuthHolderService} from "./auth-holder.service";
import { Permission } from '../models/permission.model';


@Injectable({
    providedIn:"root"
})
export class PermissionService {

    constructor(private authHolderService: AuthHolderService) {
    }

    public hasAccess(url: string) {
        url = url.replace("/console/", "");
        return true;
        /*
        switch (url) {
            case "app-dashboard":
                return this.authHolderService.hasPermission(Permission.VIEW_APPLICATIONS);
            case "organization-groups":
                return this.authHolderService.hasPermission(Permission.VIEW_ORGANIZATION_GROUP_MANAGEMENT);
            case "calendar":
                return this.authHolderService.hasPermission(Permission.VIEW_NOTIFICATIONS);
            case "applications":
                return this.authHolderService.hasPermission(Permission.VIEW_APPLICATION_MANAGEMENT);
            case "app-groups":
                return this.authHolderService.hasPermission(Permission.VIEW_APPLICATION_GROUP_MANAGEMENT);
            case "users":
                return this.authHolderService.hasPermission(Permission.VIEW_USER_MANAGEMENT);
            case "organizations":
                return this.authHolderService.hasPermission(Permission.VIEW_ORGANIZATION_MANAGEMENT);
            case "notifications":
                return this.authHolderService.hasPermission(Permission.VIEW_NOTIFICATION_MANAGEMENT);
            case "maintenance-windows":
                return this.authHolderService.hasPermission(Permission.VIEW_MAINTENANCE_EVENT_MANAGEMENT);
            case "announcements":
                return this.authHolderService.hasPermission(Permission.VIEW_ANNOUNCEMENT_MANAGEMENT);
            case "utilization":
                return this.authHolderService.hasPermission(Permission.VIEW_STATISTICS);
            case "communications":
                return this.authHolderService.hasPermission(Permission.EMERGENCY_COMMUNICATION);
            case "dizzion-teams":
                return this.authHolderService.hasPermission(Permission.DIZZION_TEAMS_MANAGEMENT);
            case "tickets":
                return this.authHolderService.hasPermission(Permission.VIEW_TICKETS);
            case "dizzion-team-dashboard":
                return this.authHolderService.isMemberOfDizzionTeams() && !this.authHolderService.isScopeEnabled();
            case "roles":
                return this.authHolderService.hasPermission(Permission.ROLE_MANAGEMENT);
            case "scheduled-jobs-timeline":
                return this.authHolderService.isPortalAdmin();
            case "monitoring":
                return this.authHolderService.hasPermission(Permission.MONITORING);
            case "reports":
                return (this.authHolderService.hasPermission(Permission.VIEW_PENDING_REPORTS)
            || this.authHolderService.hasPermission(Permission.VIEW_MONITORING_REPORTS) || this.authHolderService.hasPermission(Permission.VIEW_BILLING_REPORTS)
            || this.authHolderService.hasPermission(Permission.VIEW_COMPLIANCE_REPORTS));
            case "reports/viewreports":
                return (this.authHolderService.hasPermission(Permission.VIEW_MONITORING_REPORTS) || this.authHolderService.hasPermission(Permission.VIEW_BILLING_REPORTS)
                || this.authHolderService.hasPermission(Permission.VIEW_COMPLIANCE_REPORTS));
            case "reports/viewreports/monitoring":
                return (this.authHolderService.hasPermission(Permission.VIEW_MONITORING_REPORTS));
            case "reports/viewreports/billing":
                return (this.authHolderService.hasPermission(Permission.VIEW_BILLING_REPORTS));
            case "reports/viewreports/compliance":
                return (this.authHolderService.hasPermission(Permission.VIEW_COMPLIANCE_REPORTS));
            case "reports/archived/released":
                return (this.authHolderService.hasPermission(Permission.VIEW_MONITORING_REPORTS) || this.authHolderService.hasPermission(Permission.VIEW_BILLING_REPORTS)
                || this.authHolderService.hasPermission(Permission.VIEW_COMPLIANCE_REPORTS));
            case "reports/pendingreports":
                return this.authHolderService.hasPermission(Permission.VIEW_PENDING_REPORTS);
            case "reports/archived/unreleased":
                return this.authHolderService.hasPermission(Permission.VIEW_PENDING_REPORTS);
            default:
                return true;
        }
        */
    }
}