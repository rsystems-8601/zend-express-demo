import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NgxToastrService {
  constructor(private toastr: ToastrService) {}

  individualConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-top-full-width',
    progressBar: true,
    closeButton: true,
    onActivateTick: true,
    enableHtml: true
  };

  show(message: string, type: string) {
    this.toastr.show(
      message,                // message
      '',                     // title
      this.individualConfig,  // IndividualConfig or GlobalConfig
      type                    // 'toast-success', 'toast-error', 'toast-warning' or 'toast-info'
    );
  }
}
