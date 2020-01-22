import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableSharedService {
  private data: any;

  set setRowData(editRowData) {
    this.data = editRowData;
  }

  get  getRowData() {
    return this.data;
  }

}
