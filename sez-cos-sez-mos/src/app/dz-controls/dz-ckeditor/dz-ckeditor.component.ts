
import {Component, forwardRef, Input, NgZone, ViewChild, ElementRef} from "@angular/core";
import {AuthHolderService} from "../../services/auth-holder.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import { CKEditorComponent } from 'ngx-ckeditor';
// import { CKEditorComponent } from 'ng2-ckeditor/ckeditor.component';


// const VALUE_ACCESSOR = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => DzCKEditorComponent),
//     multi: true
// };

@Component({
    selector: 'dz-ckeditor',
    templateUrl:'./dz-ckeditor.component.html',
    // providers: [VALUE_ACCESSOR]
})
export class DzCKEditorComponent  {
    @Input()
    config: any = {
        height: '400',
        extraPlugins: 'divarea,uploadimage',
        removePlugins: 'elementspath'
    };

    public editorValue: string = '';
    @Input()
    debounce = "300";
    
    @Input()
    set uploadUrl(url: string) {
        this.config.uploadUrl = url;
    }

    constructor(zone: NgZone,
      
                private authHolderService: AuthHolderService) {
                    
        // super(zone,host);
        // host = 
        //this.host.ready.subscribe((event) => this.configureCKEditor(event.editor));
    }



    configureCKEditor(editor: any) {
        // Handle pasted image
        editor.on("fileUploadRequest", (event) => {
            const xhr = event.data.fileLoader.xhr;
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.authHolderService.getJwtToken());
        });

        editor.on("fileUploadResponse", (event) => {
            event.stop();
            const data = event.data;
            const response = JSON.parse(data.fileLoader.xhr.response);
            data.url = response.url;

            //"change" event won't fire after the image has been pasted, so that has to be handled specifically
            data.fileLoader.on("update", () => {
               // this.host.change.emit(editor.getData());
            });
        });

        //TODO Handle input in "source" mode
        //     editor.on("key", () => {
        //         this.applyChanges(editor.getData());
        //     });
    }
}