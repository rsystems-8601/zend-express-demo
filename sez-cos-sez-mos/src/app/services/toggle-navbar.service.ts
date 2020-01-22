import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ToggleNavbarService {

  private messageSource = new BehaviorSubject(false);
  menuClicked = this.messageSource.asObservable();

  constructor() { }

  toggleMenuCliked(clicked: boolean) {
    this.messageSource.next(clicked);
  }

}
