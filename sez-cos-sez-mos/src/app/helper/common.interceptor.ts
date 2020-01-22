import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// Custom

import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    ignoreResources: string[] = ['jpg', 'png', 'jpeg', 'ps1.google.com'];
    constructor(private loaderService: LoaderService, private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.ignoreResources.includes(location.href)) {
            this.showLoader();
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.onEnd();
            }
            // this.onEnd();
        },
            (err) => {
                this.onEnd();
            }));
    }

    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }
}
