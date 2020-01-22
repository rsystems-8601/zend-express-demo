import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { VrrpgroupService } from '../../pods/vrrp-group/vrrp-group.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-editsettingdialog',
  templateUrl: './editsettingdialog.component.html',
  styleUrls: ['./editsettingdialog.component.scss']
})
export class EditsettingdialogComponent implements OnInit {

  subscription: Subscription;
  clusterId: number;
  public ownerForm: FormGroup;
  submitted = false;
  toppings = new FormControl();
  toppingList: string[] = ['ROLE_ADMIN'];
  userInfo: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditsettingdialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserProfileService
    // private vrrpGroupservice: VrrpgroupService
  ) {
    // Category Id to delete
    this.clusterId = data.id;

  }

  ngOnInit() {
    this.ownerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      role: ['', Validators.required]
    });

    this.userInfo = this.userService.userDetail;

  }

  get f() {
    return this.ownerForm.controls;
  }

  // public hasError = (controlName: string, errorName: string) => {
  //   return this.ownerForm.controls[controlName].hasError(errorName);
  // }


  updateUser() {
    this.submitted = true;
    if (this.ownerForm.valid) {

      this.updateUserApi();
    } else {

      alert('Please fill a valid value');
      return;
    }
  }

  updateUserApi() {

    this.submitted = false;
    alert('All value are valid');
    console.log('User update successfully');
    // return this.vrrpGroupservice.deleteVrrpgroup(this.clusterId).subscribe(data => {
    //   if (data === true) {
    //     this.vrrpGroupservice.getReloaddata(true);
    //   }
    // });

  }


  cancelClicked() {
    this.ownerForm.reset();
    this.dialogRef.close();
  }

}
