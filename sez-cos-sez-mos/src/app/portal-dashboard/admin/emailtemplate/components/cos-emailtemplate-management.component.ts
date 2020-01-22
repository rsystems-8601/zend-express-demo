import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable }    from 'rxjs';
import { EmailtemplateService } from '../emailtemplate.service';


@Component({
  templateUrl: './cos-emailtemplate-management.component.html',
  styles: [`
  .content_email mat-label { font-weight: normal;float:left;clear: both;padding: 10px; }
  .content_email .mat-form-field { padding: 0 0 0 14px; }
  .content_email .diabled_text1 { display: block;text-align: center;padding: 20px 0 0 0; }
  .email_template_type { width:500px;margin:0 0 10px 10px;}
  `],
})
export class CosEmailtemplateManagementComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  emailtemplatename: any;
  emailStatus: boolean = false;
  templateBodytext: any = null;
  public editorValue: string = '';
  emailSubject: any;
  titleComponent:string = "Email Templates";
  
  constructor(private formBuilder: FormBuilder, public emailtemplateService: EmailtemplateService) {
      this.emailtemplateService.getEmailtemplatelist().subscribe((data)=> {
          this.emailtemplatename = data;
      })
   }

    ngOnInit() {
    this.createForm();
    this.setChangeValidate();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'emailbody':[null, Validators.required],
      'subject0': [null, Validators.required],
      'subject1': [null, Validators.required],
      'subject2': [null, Validators.required]
    });
  }

  setChangeValidate() {
      this.formGroup.get('name').setValidators(Validators.required);
      this.formGroup.get('name').updateValueAndValidity();
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }


  emailTemplateselect(event) {
    if(event.value) {
      this.emailtemplateService.getEmailtemplatebody(event.value).subscribe((data)=> {
        this.templateBodytext = data.templateText;
        this.emailSubject = data.subject;
        this.emailStatus = true;
        this.formGroup.get('emailbody').clearValidators();
        this.formGroup.get('emailbody').updateValueAndValidity();
        this.formGroup.get('subject0').clearValidators();
        this.formGroup.get('subject0').updateValueAndValidity();
        this.formGroup.get('subject1').clearValidators();
        this.formGroup.get('subject1').updateValueAndValidity();
        this.formGroup.get('subject2').clearValidators();
        this.formGroup.get('subject2').updateValueAndValidity();
      })
      } else {
        this.emailStatus = false;
    }
    
  }

  // Save Email will call here...
  saveCategory() {
    //console.log(this.formGroup.value);
    this.emailStatus = false;
  }



}