import { ICompany } from 'src/app/authentication/models/company';
import { IExtendedData } from 'src/app/authentication/models/extendedData';
import { IRightEntity } from 'src/app/authentication/models/rightEntity';

import { ActionStatus, CaseStatus, ICase, SLAStatus, TimeUnit } from '../';
import { IAction } from './iAction';
import { ICaseClass } from './iCaseClass';
import { IContact } from './iContact';
import { IWorkflow } from './iWorkflow';

  export interface ICaseBase extends IRightEntity {
    actionAssignedToUserID: string;
    actionBeginTime: any;
    actionID: string;
    actionStatus: ActionStatus;
    caseClassID: string;
    caseClosedReason: string;
    caseDescription: string;
    caseEndTime: any;
    caseID: string;
    caseInitiatedBy: string;
    caseInitiatedTime: any;
    caseLastUpdatedTime: any;
    caseNumber: string;
    caseOwnerUserID: string;
    caseRequestCount: number;
    caseStartTime: any;
    caseStatus: CaseStatus;
    caseUpdated: boolean;
    caseWorkBucketList: any;//WorkBucket[];
    companyID: string;
    contactID: string;
    incidentNumber: string;
    lastAssignedTime: Date;
    lastSLAStartTime: Date;
    pickedFromWorkBucketID: string;
    requesterID: string;
    slaDueDateTime: Date;
    slaDuration: number;
    slaElapsed: number;
    slaElapsedDisplay: number;
    slaPendingReason: string;
    slaPendUntilDateTime: Date;
    slaStatus: SLAStatus;
    slaTimeUnit: TimeUnit;
    source: string;
    workflowID: string;
    // workNumber: number;
    xCaseCI: number;

    action: IAction;
    assignedToUser: any;//IUser;
    attachmentList: any;//IAttachment[];
    caseClass: ICaseClass;
    caseDataList: IExtendedData[];
    caseSLAHistoryList: any;//ICaseSLAHistory[];
    caseWithSameIncidentNumberList: ICase[];
    company: ICompany;
    contact: IContact;
    interactionList: any;//IInteraction[];
    owner: any;//IUser;
    workflow: IWorkflow;
    linkedCaseList: any;//ICase[];
    requester: IContact;
    workflowToken: any;//IWorkflowToken;
    workflowTokenHistoryList: any;//IWorkflowTokenHistory[];
    isFromArchive: boolean;
  }

