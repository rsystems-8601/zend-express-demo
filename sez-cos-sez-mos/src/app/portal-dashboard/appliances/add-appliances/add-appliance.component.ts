import { Component, OnInit, Inject } from '@angular/core';
import { CustomerAssignment } from '../../../models/customerassignment.model';
import { AppliancesService } from '../services/appliances.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Applience } from '../../../models/applience.model';
import { Product } from '../../../models//managejob.model';
import { Datacenter, Pods } from '../../../models/cos-common.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-appliance',
  templateUrl: './add-appliance.component.html',
  styleUrls: ['./add-appliance.component.scss']
})
export class AddapplienceComponent implements OnInit  {

   editjobForm: FormGroup; 
   
   ft: FormGroup;
   sd: FormGroup;
   th: FormGroup;
   fr:FormGroup;
 
   jobData: Applience[];
   complient: any;
   viewButton: boolean = false;
   jobid: number;
   productData: Product[];
   datacenterData: Datacenter[];
   podData: Pods[];
  
  
  dvPortdata: any[];
  nameArray: FormArray;
  jobvar: Applience;
  urltoSave: string;
  form: any;
  datacetnerId: number;
  datacenterName: any;
  podName: any;
  podId: any;
   
   constructor(@Inject(MAT_DIALOG_DATA)  public manageJobs:Applience,
               public dialogRef: MatDialogRef<AddapplienceComponent>,
               public jobsService: AppliancesService,
               public formBuilder: FormBuilder) {

                // URL Validations
                const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

                const applienceText = '^[a-z_][a-z0-9_-]{0,50}$'; 
                // Password validations
                const passWordreg = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

                 // Form Groups
                  this.ft = this.formBuilder.group({
                     name: ['', [Validators.required, Validators.pattern(applienceText)]],
                     dataCentreId: [],
                     podId: [],
                     accessKey: [],
                     accessSecret: [],
                  });
                  this.sd = this.formBuilder.group({
                     vCenterUrl: ['', [Validators.required, Validators.pattern(reg)]],
                     vCenterUsername: [],
                     vCenterPassword: ['', [Validators.required,  Validators.pattern(passWordreg)]],
                  });
                  this.th = this.formBuilder.group({
                     nsxManagerURL: ['', [Validators.required, Validators.pattern(reg)]],
                     nsxUserName: [],
                     nsxPassword: ['', [Validators.required,  Validators.pattern(passWordreg)]],
                  });
                  this.fr = this.formBuilder.group({
                     podVars: this.formBuilder.array([])
                  });

           
       // Data center details | For now it is static will come from data center or pod
       this.jobsService.getDatacenterdetails(72).subscribe(datacentervalue=> {
           console.log(datacentervalue.name);
           this.datacenterName = datacentervalue.name;
           this.datacetnerId = datacentervalue.id;
           
          //  this.datacenterData = datacentervalue;
       })

       this.jobsService.getPoddetails(60).subscribe(podlistValue=> {
        // this.podData = podlistValue;
        this.podName = podlistValue.podName;
        this.podId = podlistValue.id;
      })


        // Fetching All data
       this.jobsService.getjobVaradd().subscribe(data=> {

        this.urltoSave = 'https://s3-us-west-2.amazonaws.com/cosmos-testing/ubuntu-cosmos.ova';
        
        
        this.jobvar = data;
        this.jobvar.podVars = JSON.parse(data.podVars.toString());

        this.ft.get('accessKey').patchValue(this.jobvar.accessKey);
        this.ft.get('accessSecret').patchValue(this.jobvar.accessSecret);
        // Pod values
         for( let k in this.jobvar.podVars){
               (<FormArray>this.fr.get('podVars')).push(this.formBuilder.group({ 
                   key: [k],
                   value: [this.jobvar.podVars[k]],
               }))
           }
       });
   }

   ngOnInit() {
    
   }

  //  getPodinfo(value:any) {
  //    this.datacetnerId = value;
  //   //  console.log(this.datacetnerId);
    
  //  }

    // Validations
    get vCenterUrl() { return this.sd.get('vCenterUrl') };
    get nsxManagerURL() { return this.th.get('nsxManagerURL') };
    get vCenterPassword() { return this.sd.get('vCenterPassword') };
    get nsxPassword() { return this.th.get('nsxPassword') };
    get name() { return this.ft.get('name') };


   get getPodVars(){
      //  return this.fr.controls.podVars as FormArray;
       return (<FormArray>this.fr.controls.podVars).controls
   }
  


   createPodvars(): FormGroup {
   return this.formBuilder.group({
       key: [],
       value: []
   });
   }

   addPodvar() {
   const podVars = this.fr.get('podVars') as FormArray;
     podVars.push(this.createPodvars());
   }
     
   removeRow(index) {
   const podVars = this.fr.get('podVars') as FormArray;
   podVars.removeAt(index);
   }

   // Copy text or URL
   copyText(val: string){
      let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
      }
 
     savePoddata() {    

       this.form = {...this.fr.value, ...this.ft.value, ...this.sd.value, ...this.th.value};

       this.form['logs'] = null;
       this.form['ovaUrl'] = this.urltoSave;
       this.form['podId'] = this.podId;
       this.form['dataCentreId'] = this.datacetnerId
       let podVars = {}

       const podVars1 = { ...this.fr.value };
       
       podVars1.podVars.map(rec => podVars[rec.key] = rec.value )
      //  for(let k in podVars1.podVars) {
      //    podVars[podVars1.podVars[k].key] = podVars1.podVars[k].value
      //  }

       this.form['podVars'] = JSON.stringify(podVars);
       this.jobsService.saveApplience(this.form).subscribe(data=> {
          console.log(data, "data after save");
       })
       
   }



}
