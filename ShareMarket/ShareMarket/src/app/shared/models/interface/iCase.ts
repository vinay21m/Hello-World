import { ICaseBase } from './iCaseBase';

export interface ICase extends ICaseBase {
  isNew: boolean;
  _workNumber: string;
}
