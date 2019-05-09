import { isPlatformBrowser } from "@angular/common";
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID  } from '@angular/core';


/* Create a new injection token for injecting the window into a component. */
export const WINDOW = new InjectionToken('WindowToken');

/* Define abstract class for obtaining reference to the global window object. */
export abstract class WindowRef {

  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }

}

/* Define class that implements the abstract class and returns the native window object. */
export class BrowserWindowRef extends WindowRef {

  constructor() {
    super();
  }

  get nativeWindow(): Window | Object {
    return window;
  }

}

/* Create an factory function that returns the native window object. */
export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
export const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};

/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ WindowRef, PLATFORM_ID ]
};

/*
interface delData {

	RepId: number;
}
*/

//@Injectable({ providedIn: 'root' })
export class paginationContent{

  //constructor(private actService: ActService, private http: HttpClient) { }
  //data={};
	getIndexOfDiv(container ){       
    
		let scrollTop = container.nativeElement.scrollTop;
    let height = container.nativeElement.clientHeight;  
    let documentHeight = container.nativeElement.scrollHeight
    if(container.nativeElement.offsetHeight + container.nativeElement.scrollTop >= container.nativeElement.scrollHeight){    
     // console.log(container.nativeElement.offsetHeight)  
     // console.log(container.nativeElement.scrollTop)  
      // console.log(container.nativeElement.scrollHeight)  
      return scrollTop;
    }    
  }

 
/*
 getPageData(reqPageNumber,  userDetails, sourceType):Observable<delData> {
  
  
    const request = new ActRequest();
    request.EmpId = userDetails.EmpId;
    request.RecordCount = 10;
    request.RowOffSet = 1;
    request.SourceType = sourceType === undefined ? 'All Pending' : sourceType;
    request.PageRequest = new PageRequest();
    request.PageRequest.PageNumber=reqPageNumber;
    request.PageRequest.PageSize=10;
    return JSON.parse('{RepId:45}'); 

    //this.actService.getAll(request).subscribe(actList => {
      //return actList;      
  //  });

   
}
*/

}





/* Create an array of providers. */
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  windowProvider,
  paginationContent
];