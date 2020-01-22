import {Observable, MonoTypeOperatorFunction} from "rxjs";
import {finalize} from 'rxjs/operators';
import {Spinner} from "../common/spinner";

function spinner<T>(this: Observable<T>, spinnerId?: string): Observable<T> {
    Spinner.show(spinnerId);
    return this.pipe(finalize(() => Spinner.hide(spinnerId)));
}

// reusable custom operator
export function customSpinner<T>(spinnerId?: string): MonoTypeOperatorFunction<T> {
    Spinner.show(spinnerId);
    return input$ => input$.pipe(finalize(() => Spinner.hide(spinnerId)))
  }

(<any>Observable.prototype).spinner = spinner;

declare module "rxjs" {
    interface Observable<T> {
        spinner: typeof spinner;
    }
}

// export spinner;