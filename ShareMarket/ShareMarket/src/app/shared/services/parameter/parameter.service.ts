

import { forkJoin } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IParameterList } from '../../models/interface/iParameterList';
import { Parameter } from '../../models/parameter';
import { setParameterListByCompanyID } from '../../ngrx-store/parameter-store/parameter.action';
import { APIUrl, StringsLoc } from '../service';
import { Utility } from '../utility/utility';

const COMPANY_KEY: string = 'company';
const PARAMETERLIST_KEY: string = 'parameterList';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  private currentUrlWithCompany: string;
  private controler: string = APIUrl.controlerParameters;
  public parameterList: Array<Parameter> = [];

  constructor(private _httpClient: HttpClient,
    private store: Store<{parameterList: IParameterList}>) {
      this.currentUrlWithCompany = Utility.getCurrentUrlWithCompany();
     }

  public getCompanyParameterListByCompanyID(companyID: string) {
    this.currentUrlWithCompany = Utility.getCurrentUrlWithCompany();
    const params = new HttpParams()
      .set('companyID', companyID);

    return this._httpClient.get<object>(
      `${this.currentUrlWithCompany}${this.controler}/GetCompanyParameterListByCompanyID`,
      { params: params });
  }


  getDefaultCompany(): string {
    let decodeData: string | undefined = window.sessionStorage.getItem(COMPANY_KEY)?.toString();
    let cod = !!decodeData ? decodeData : '';
    return cod;     
  }

  public setDefaultCompany(companyID: string): void {
    window.sessionStorage.removeItem(COMPANY_KEY);
    window.sessionStorage.setItem(COMPANY_KEY, companyID);
  }


  public setParameterList() {
    const parameterListByCompanyID = this.getCompanyParameterListByCompanyID(this.getDefaultCompany());
    const parameterListByGlobalCompanyID = this.getCompanyParameterListByCompanyID(StringsLoc.GlobalCompanyID);

    forkJoin([parameterListByGlobalCompanyID, parameterListByCompanyID]).subscribe((parm: any) => {
      let list = parm[0];
      let pList = Array<Parameter>();
      if (!!list && list.length > 0) { 
        list.map((data: Parameter) => {
          pList.push(data);
        });
      }
      list = parm[1];
      if (!!list && list.length > 0) {
        list.map((data: Parameter) => {
          pList.push(data);
        })
      }     
      this.store.dispatch(setParameterListByCompanyID({parameterList: pList}));
      window.sessionStorage.removeItem(PARAMETERLIST_KEY);
      window.sessionStorage.setItem(PARAMETERLIST_KEY, JSON.stringify(pList));
    });
    
  }

  public getParameterList(): any[] {
    const parameterList = window.sessionStorage.getItem(PARAMETERLIST_KEY);
    if (parameterList) {
      return JSON.parse(parameterList);
    }
    return [];
  }

  public getID1(): string {
    const parameterList = this.getParameterList();
    let lable = parameterList.find((x: Parameter) => {
      return (x.parameterName == 'Contact ID1 Label' && !!x.parameterValue && x.companyID == this.getDefaultCompany())

    })?.parameterValue;

    return !!lable ? lable : 'ID1';

  }

  public getID2(): string {
    const parameterList = this.getParameterList();
    let lable = parameterList.find((x: Parameter) => {
      return (x.parameterName == 'Contact ID2 Label' && !!x.parameterValue && x.companyID == this.getDefaultCompany())

    })?.parameterValue;
    return !!lable ? lable : 'ID2';
  }

  public getID3(): string {
    const parameterList = this.getParameterList();
    let lable = parameterList.find((x: Parameter) => {
      return (x.parameterName == 'Contact ID3 Label' && !!x.parameterValue && x.companyID == this.getDefaultCompany())

    })?.parameterValue;
    return !!lable ? lable : 'ID3';
  }

  public getContactLavel(value: string): any {
    let lable: string;
    this.store.select('parameterList').subscribe((x: IParameterList) => {
      const parameterList = x.parameterList;
        lable = parameterList.find((x: Parameter) => {
        return (x.parameterName == `Contact ${value} Label` && !!x.parameterValue && x.companyID == this.getDefaultCompany())
  
      })?.parameterValue;
      lable = !!lable ? lable : value;
      return lable;
    });
    setTimeout(() => {
      return lable;
    }, 2000);
  }
}
