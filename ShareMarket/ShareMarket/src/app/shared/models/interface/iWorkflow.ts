import { LocalizedString } from '@angular/compiler';

import { IAction } from './iAction';
import { IRoute } from './iRoute';

export interface IWorkflow {
    comments: string;
    companyID: string;
    effectiveBeginDate: Date;
    effectiveEndDate: Date;
    isNew: boolean;
    storyboardAvailableEntries: StoryboardMode;
    workflowDescription: LocalizedString;
    workflowDisplayDescription: string;
    workflowDisplayName: LocalizedString;
    workflowID: string;
    workflowName: string;
    workflowParameterXML: string;
    workflowType: WorkflowTypes;
    workflowXML: string;

    actionList: IAction[];
    routeList: IRoute[];
  }

  

  export enum WorkflowTypes {
    Workflow = 0,
    ActivityFlow = 1
  }

  export enum StoryboardMode {
    /**
     * Story board is in read only mode
     */
    NoEntries,
      /**
       * you can enter only predefined values in the story board
       */
    PreDefinedEntries,
      /**
       * You can enter predefined values and free text in the storyboard
       */
    AllEntries
  }
  