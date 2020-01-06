import { Component, HostListener,Injectable , Inject, OnInit, ViewChild, ViewEncapsulation, ElementRef, Input } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW ,getDocumentHeight} from "../window.service";
import { ViewappointmentService } from '../viewappointment.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

	public navIsFixed: boolean = false;
	records = [];	
	fixrecord = {}; 
	public show_news:boolean = false;
    public buttonName:any = 'Show News';
	public show_delete:boolean = false;
	public delete_id:number = 0;	
	selectedFile='';
	
	@ViewChild("radhe") container:any;
   
	
	
	
	
	constructor(private getViewAppintmentService : ViewappointmentService,	
	private getDocumentHeight : getDocumentHeight,
@Inject(DOCUMENT) private document: Document,
private http: HttpClient,
                
    @Inject(WINDOW) private window	) { 
		this.delete_id= 0;
		
	
	}
	
	
	
	ngOnInit() {
		// this.refresh();
		//this.getDocumentHeight.getIndexOfDiv(this.container);
		this.fixrecord = this.getViewAppintmentService.getData2();
		
		this.view_appointment();
		
	}
	
	
	
	onFileChanged(event: any) {
		alert(event);
		this.selectedFile = event.target.files[0];
		console.log(this.selectedFile);
		
		let files :FileList = event.target.files;
        const formData = new FormData();
		console.log(files);
        for(var i = 0; i < files.length; i++){
            formData.append('mainfile', files[i]);
        }

        this.http
            .post('http://127.0.0.1/test/upload.php', formData)
            .subscribe();
			
	}
	
	sendMessage( ) {
		if (this.selectedFile) {
		  // this.connectMessageService.saveAttachment(this.selectedFile).subscribe(result => {
			// console.log(result);
		  // });
		}    
	  }

	
	
	
	// ngOnChanges(changes) {
         // this.getDocumentHeight.getIndexOfDiv(this.container);
    // }
	
    refresh() {
		
        this.getDocumentHeight.getIndexOfDiv(this.container);   
    }
	
	@HostListener("window:scroll", [])
	  onWindowScroll() {
		let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
		if (number > 100) {
		  this.navIsFixed = true;
		  // console.log("this.window.pageYOffset--"+ this.window.pageYOffset)
		  // console.log("this.document.documentElement.scrollTop--"+ this.document.documentElement.scrollTop)
		  // console.log("this.document.body.scrollTop--"+ this.document.body.scrollTop)
		} else if (this.navIsFixed && number < 10) {
		  this.navIsFixed = false;
		  // console.log("else this.window.pageYOffset--"+ this.window.pageYOffset)
		  // console.log("else this.document.documentElement.scrollTop--"+ this.document.documentElement.scrollTop)
		  // console.log("else this.document.body.scrollTop--"+ this.document.body.scrollTop)
		}
	  }
	
	view_appointment(id=false){
		this.getViewAppintmentService.getData(id).subscribe(data =>{
			console.log(data);
			if(data && data.result) {
				//console.log(data.result);
				this.records = data.result;
			}
			
		});
	}
	
	toggle() {
		this.show_news = !this.show_news;

		// CHANGE THE NAME OF THE BUTTON.
		if(this.show_news)  
		  this.buttonName = "Hide News";
		else
		  this.buttonName = "Show News";
	}
	
	delete_appointment(id) {
		this.show_delete= true;		
		this.delete_id = id;
		
		this.getViewAppintmentService.deleteData(id).subscribe(data =>{
			console.log(data);
			if(data && data.result) {
				//console.log(data.result);
				this.show_delete = !data.result;
				this.view_appointment();
			}			
		});
		// CHANGE THE NAME OF THE BUTTON.		
	}

}



