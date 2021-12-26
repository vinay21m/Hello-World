import { LocalizedString } from '@angular/compiler';

import { IRoute } from './iRoute';

export interface IAction {
    actionDescription: LocalizedString;
    actionDisplayName: LocalizedString;
    actionID: string;
    actionName: string;
    actionNodeID: number;
    actionParameterXML: string;
    actionType: string;
    isEnd: boolean;
    isStart: boolean;
    isValid: boolean;
    routeList: IRoute[];
    workflowDisplayName: LocalizedString;
    workflowDisplayNameAndActionDisplayName: string;
    workflowID: string;
    isGlobal: boolean;
  }
  
  