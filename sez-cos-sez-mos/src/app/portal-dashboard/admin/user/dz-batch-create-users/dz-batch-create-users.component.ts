import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {UserService} from "../user.service";

@Component({templateUrl: "./dz-batch-create-users.component.html"})
export class DzBatchCreateUsersComponent {
    constructor(public dialogRef: MatDialogRef<DzBatchCreateUsersComponent>,
                public userService: UserService) {
    }

    batchCreate(file: File) {
        if (file) {
            this.userService.batchSave(file).spinner().subscribe(() => this.dialogRef.close(true));
        }
    }
}