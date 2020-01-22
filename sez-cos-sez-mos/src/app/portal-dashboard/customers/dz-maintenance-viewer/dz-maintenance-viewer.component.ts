import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {MaintenanceService} from "./maintenance.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DzMaintenanceContentComponent} from "./dz-maintenance-content/dz-maintenance-content.component";
import {MatDialog} from "@angular/material";

@Component({template: ""})
export class DzMaintenanceViewerComponent {
    constructor(private maintenanceService: MaintenanceService,
                private activeRoute: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private location: Location) {
        const id = +this.activeRoute.snapshot.params["eventId"];
        const startDate = this.activeRoute.snapshot.queryParams["startDate"];
        this.maintenanceService.getMaintenanceEventInstance(id, startDate).subscribe(event => {
            const dialogRef = this.dialog.open(DzMaintenanceContentComponent, {data: event});
            dialogRef
                .afterClosed()
                .subscribe((result) => {
                    if (!result || !result.stopRedirect) {
                        this.location.back();
                    }
                });
            this.router.events.subscribe(event => {
                if (event instanceof NavigationStart) {
                    dialogRef.close({stopRedirect: true});
                }
            })
        });
    }
}
