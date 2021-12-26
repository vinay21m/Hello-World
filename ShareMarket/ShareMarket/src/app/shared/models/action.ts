import { LocalizedString } from '@angular/compiler';

import { IAction } from './interface/iAction';
import { IRoute } from './interface/iRoute';

  export class Action implements IAction {
    actionDescription!: LocalizedString;
    actionDisplayName!: LocalizedString;
    actionID!: string;
    actionName!: string;
    actionNodeID!: number;
    actionParameterXML!: string;
    actionType!: string;
    isEnd!: boolean;
    isStart!: boolean;
    isValid!: boolean;
    routeList!: IRoute[];
    workflowDisplayName!: LocalizedString;
    workflowDisplayNameAndActionDisplayName!: string;
    workflowID!: string;
    isGlobal!: boolean;
  }
  