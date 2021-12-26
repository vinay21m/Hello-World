import * as moment from 'moment';

import { CaseStatus } from '../';
import { CaseBase } from './caseBase';
import { ICase } from './interface/iCase';
import { SLAStatus, TimeUnit } from './statusEnum';

export class Case extends CaseBase implements ICase {
  _workNumber!: string;

  public get isNew(): boolean {
    return !this.caseID ? true : false;
  }

  get workNumber(): string {
    if (this.slaStatus === SLAStatus.Active) {
      if (
        this.slaTimeUnit === TimeUnit.Hours ||
        this.slaTimeUnit === TimeUnit.BusinessHours
      ) {
        return moment
          .utc()
          .diff(moment(this.slaDueDateTime), 'hours')
          .toString();
      } else {
        return moment
          .utc()
          .diff(moment(this.slaDueDateTime), 'days')
          .toString();
      }
    }
    return '';
  }

  set workNumber(value: string) {
    this._workNumber = value;
  }
}

export class InsertCaseDto
{
    case!: ICase;
    extendedData!: any[];
    interaction!: any[];
    interactionData!: any[];
    attachment!: any[];
    attachmentContents: any;
}

export class UpdateCaseStatusDto
{
    caseID!: string;
    status!: CaseStatus
    reason!: string;
}

export class UpdateCaseDTO
{
    case!: ICase;
    addedLinkedCases: string[] = [];
    deletedLinkedCases: string[] = []
}
