import { TimeUnit } from '../';

export interface ISLA {
  companyID: string;
  isNew: boolean;
  locked: boolean;
  lockedReason: string;
  slaid: string;
  slaID: string;
  slaName: string;
  slaNumber: number;
  slaUnit: TimeUnit;
  slaCaseSource: string;
}
