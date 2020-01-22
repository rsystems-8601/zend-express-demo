import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../models/response/common/loader-state-response';

// Custom


@Injectable({ providedIn: 'root' })

export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    count = 0;
    constructor() { }

    show() {
        this.loaderSubject.next({ show: ++this.count } as LoaderState);
        // this.loaderSubject.next(<LoaderState>{ show: true });
    }

    hide() {
        this.loaderSubject.next({ show: --this.count } as LoaderState);
        // this.loaderSubject.next(<LoaderState>{ show: false });
    }
}
