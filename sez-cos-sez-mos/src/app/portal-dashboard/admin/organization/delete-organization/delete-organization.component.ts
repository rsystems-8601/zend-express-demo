import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductService } from '../../productrates/product.service';
import { OrganizationCosmosService } from 'src/app/services/organization-cosmos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-organization',
  templateUrl: './delete-organization.component.html',
  styleUrls: ['./delete-organization.component.scss']
})
export class DeleteOrganizationComponent implements OnInit {

  subscription: Subscription;
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private organizationService: OrganizationCosmosService,  private router: Router,
  private route: ActivatedRoute,
  public dialogRef: MatDialogRef<DeleteOrganizationComponent>
  ) {
    // Category Id to delete
    this.id = data.id;
    console.log("------>>>>>>",data)
  }

  ngOnInit() {
  }

  deleteSingleCustomer() {
    return this.organizationService.deleteOrganization(this.id).subscribe(data=>{
      console.log(data);
      this.dialogRef.close(data);
    }, err =>{
      this.dialogRef.close(err);
    })
  }

}
