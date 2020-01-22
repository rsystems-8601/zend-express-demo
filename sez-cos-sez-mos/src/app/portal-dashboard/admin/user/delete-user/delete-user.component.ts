import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrganizationCosmosService } from 'src/app/services/organization-cosmos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteOrganizationComponent } from '../../organization/delete-organization/delete-organization.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements  OnInit {

  subscription: Subscription;
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private userService: UserService,  private router: Router,
  private route: ActivatedRoute,
  public dialogRef: MatDialogRef<DeleteOrganizationComponent>
  ) {
    // Category Id to delete
    this.id = data.id;
    console.log("------>>>>>>",data)
  }

  ngOnInit() {
  }

  deleteSingleUser() {
    return this.userService.deleteUser(this.id).subscribe(data=>{
      console.log(data);
      this.dialogRef.close(data);
    }, err =>{
      this.dialogRef.close(err);
    })
  }
}