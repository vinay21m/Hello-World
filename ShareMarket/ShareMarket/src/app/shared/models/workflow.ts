import { LocalizedString } from '@angular/compiler';

import { Action } from './action';
import { IAction } from './interface/iAction';
import { IRoute } from './interface/iRoute';
import { IWorkflow, StoryboardMode, WorkflowTypes } from './interface/iWorkflow';
import { Route } from './route';

  export class Workflow implements IWorkflow {
    comments!: string;
    companyID!: string;
    effectiveBeginDate!: Date;
    effectiveEndDate!: Date;
    isNew!: boolean;
    storyboardAvailableEntries!: StoryboardMode;
    workflowDescription!: LocalizedString;
    workflowDisplayDescription!: string;
    workflowDisplayName!: LocalizedString;
    workflowID!: string;
    workflowName!: string;
    workflowParameterXML!: string;
    workflowType!: WorkflowTypes;
    workflowXML!: string;

    actionList!: IAction[];
    routeList!: IRoute[];

    $types: any = { actionList: Action, routeList: Route };
  }
  
  