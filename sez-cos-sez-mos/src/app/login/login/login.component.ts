import { Component, OnInit } from '@angular/core';
import { FormArray, NgForm } from '@angular/forms';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private authHolder : AuthHolderService) { 
    this.authHolder.removeToken();
  }

  ngOnInit() {
  }


  onSubmit(formData){
    // console.log(formData);
    // this.router.navigate(["/console"]);
    this.auth.userLogin(formData)
    .subscribe(res =>{
      console.log(res);
      this.authHolder.setJwtToken(res.token);
      this.testCosmosPortal();
      this.router.navigate(["/console"]);
    },err => {
      console.log(err);
    });

  }

  testCosmosPortal(){
    this.auth.getRole().subscribe(res => {
      console.log("sadsad");
    },err=>{
      console.log(err);
    })
  }
}
