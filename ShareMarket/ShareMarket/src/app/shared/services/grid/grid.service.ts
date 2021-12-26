import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private _gridSource = new Subject<any>();
  gridSource$ = this._gridSource.asObservable();
  constructor() { }

  setGridData(data: any) {
    this._gridSource.next(data);
  }
}
