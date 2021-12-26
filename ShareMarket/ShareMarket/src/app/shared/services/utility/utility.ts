import { environment } from 'src/environments/environment';

import { Case, ICase } from '../../models';
import { NameValueStringPair } from '../../models/contact';
import { Parameter } from '../../models/parameter';

const USER_KEY = 'auth-user';
const COMPANYID_KEY: string = 'company';
const AUTH_API = environment.apiUrl;
const PARAMETERLIST_KEY: string = 'parameterList';

export class Utility {
  public static getCompnayID(): any {
    let compayID = window.sessionStorage.getItem(COMPANYID_KEY);
    let cod = !!compayID ? compayID : '';
    return cod;
  }

  public static setComapnyID(companyID: string): void {
    window.sessionStorage.removeItem(COMPANYID_KEY);
    window.sessionStorage.setItem(COMPANYID_KEY, companyID);
  }

  public static getCurrentUrlWithCompany(isCompany: boolean = true) {
    let companyID = isCompany ? this.getCompnayID() : '';
    companyID = (!!companyID) ? `${companyID}/` : '';
    return `${AUTH_API}/api/${companyID}`;
  }

  public static getAuthUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};

  }

  public static setRows(newRecord: any): any {
    if (!!newRecord) {
      let newRecords = JSON.parse(JSON.stringify(newRecord));
      delete newRecords.$id;
      return newRecords;
    } else return newRecord;
  }

  public static setDropDwon(dataList: Array<any>): Array<NameValueStringPair> {
    let list: Array<NameValueStringPair> = new Array<NameValueStringPair>();
    dataList.map((data: any) => {
      list.push({ name: data.displayName, value: data.displayValue });
    });
    return list;
  }

  public static filterDropdwon(e: any, list: Array<NameValueStringPair>) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: Array<NameValueStringPair> = new Array<NameValueStringPair>();
    let query = e.query;
    list?.map((item: any) => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(item);
      }
    });
    return Object.assign([{}], filtered);
  }

  private static getParameterList(): any[] {
    const parameterList = window.sessionStorage.getItem(PARAMETERLIST_KEY);
    if (parameterList) {
      return JSON.parse(parameterList);
    }
    return [];
  }

  public static getParameterDetails(companyID: string, parameterName: string): any {
    const parameterList = this.getParameterList();
    return parameterList.find((x: Parameter) => {
      return (x.parameterName == parameterName && !!x.parameterValue && x.companyID == companyID);
    })?.parameterValue;
  }

  public static setCase(cases: Case): ICase {
    let caseNew: ICase = new Case();
    caseNew.caseStatus = cases.caseStatus;
    caseNew.caseUpdated = cases.caseUpdated;
    caseNew._workNumber = cases._workNumber;
    caseNew.action = cases.action;
    caseNew.actionAssignedToUserID = cases.actionAssignedToUserID;
    caseNew.actionBeginTime = cases.actionBeginTime;
    caseNew.actionID = cases.actionID;
    caseNew.actionStatus = cases.actionStatus;
    caseNew.assignedToUser = cases.assignedToUser;
    caseNew.attachmentList = cases.attachmentList;
    caseNew.caseClass = cases.caseClass;
    caseNew.caseClassID = cases.caseClassID;
    caseNew.caseClosedReason = cases.caseClosedReason;
    caseNew.caseDataList = cases.caseDataList;
    caseNew.caseDescription = cases.caseDescription;
    caseNew.caseEndTime = cases.caseEndTime;
    caseNew.caseID = cases.caseID;
    caseNew.caseInitiatedBy = cases.caseInitiatedBy;
    caseNew.caseInitiatedTime = cases.caseInitiatedTime;
    caseNew.caseLastUpdatedTime = cases.caseLastUpdatedTime;
    caseNew.caseNumber = cases.caseNumber;
    caseNew.caseOwnerUserID = cases.caseOwnerUserID;
    caseNew.caseRequestCount = cases.caseRequestCount;
    caseNew.caseSLAHistoryList = cases.caseSLAHistoryList;
    caseNew.caseStartTime = cases.caseStartTime;
    caseNew.caseStatus = cases.caseStatus;
    caseNew.caseUpdated = cases.caseUpdated;
    caseNew.caseWithSameIncidentNumberList = cases.caseWithSameIncidentNumberList;
    caseNew.caseWorkBucketList = cases.caseWorkBucketList;
    caseNew.company = cases.company;
    caseNew.companyID = cases.companyID;
    caseNew.contact = cases.contact;
    caseNew.contactID = cases.contactID;
    caseNew.incidentNumber = cases.incidentNumber;
    caseNew.interactionList = cases.interactionList;
    caseNew.isFromArchive = cases.isFromArchive;
    //caseNew.isNew = cases.isNew;
    caseNew.lastAssignedTime = cases.lastAssignedTime;
    caseNew.lastSLAStartTime = cases.lastSLAStartTime;
    caseNew.linkedCaseList = cases.linkedCaseList;
    caseNew.owner = cases.owner;
    caseNew.pickedFromWorkBucketID = cases.pickedFromWorkBucketID;
    caseNew.requester = cases.requester;
    caseNew.requesterID = cases.requesterID;
    caseNew.rights = cases.rights;
    caseNew.slaDueDateTime = cases.slaDueDateTime;
    caseNew.slaDuration = cases.slaDuration;
    caseNew.slaElapsed = cases.slaElapsed;
    caseNew.slaElapsedDisplay = cases.slaElapsedDisplay;
    caseNew.slaPendUntilDateTime = cases.slaPendUntilDateTime;
    caseNew.slaPendingReason = cases.slaPendingReason;
    caseNew.slaStatus = cases.slaStatus;
    caseNew.slaTimeUnit = cases.slaTimeUnit;
    caseNew.source = cases.source;
    caseNew.workflow = cases.workflow;
    caseNew.workflowID = cases.workflowID;
    caseNew.workflowToken = cases.workflowToken;
    caseNew.workflowTokenHistoryList = cases.workflowTokenHistoryList;
    caseNew.xCaseCI = cases.xCaseCI;

    return caseNew;
  }

  public static validatePassword(password: string, verifyPassword: string) {
    let isValid = true;
    let isPassCnt = 0;
    if (!!password && password.length > 7) {
      (password.search(/[a-z]/) > 0) ? isPassCnt++ : 0;
      ((/[A-Z]/).test(password)) ? isPassCnt++ : 0;
      ((/\d/).test(password)) ? isPassCnt++ : 0;
      (password.indexOf('!') > -1) || (password.indexOf('$') > -1)
        || (password.indexOf('#') > -1) || (password.indexOf('%') > -1) ? isPassCnt++ : 0;
    }

    isValid = (password !== verifyPassword) || isPassCnt < 3 ? false : true;

    return isValid;
  }

  public static validateEmail(emailAddress: string) {
    let emailText = '';

    if (emailAddress.includes('(') && emailAddress.includes(')')) {
      var len = emailAddress.length;
      var start = emailAddress.indexOf('(');
      emailText = emailAddress.substring(start + 1, len - 1);
    }
    else {
      emailText = emailAddress;
    }

    return String(emailText)
      .toLowerCase()
      .match(
        /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/
      );

  }
}
