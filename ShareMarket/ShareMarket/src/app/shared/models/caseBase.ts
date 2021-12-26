import { Company, ICompany } from 'src/app/authentication/models/company';
import { ExtendedData, IExtendedData } from 'src/app/authentication/models/extendedData';
import { RightEntity } from 'src/app/authentication/models/rightEntity';
import { User } from 'src/app/authentication/models/user';

import { Action } from './action';
import { Case } from './case';
import { CaseClass } from './caseClass';
import { Contact } from './contact';
import { IAction } from './interface/iAction';
import { ICase } from './interface/iCase';
import { ICaseBase } from './interface/iCaseBase';
import { ICaseClass } from './interface/iCaseClass';
import { IContact } from './interface/iContact';
import { IWorkflow } from './interface/iWorkflow';
import { ActionStatus, CaseStatus, SLAStatus, TimeUnit } from './statusEnum';
import { Workflow } from './workflow';

export class CaseBase extends RightEntity implements ICaseBase {
    actionAssignedToUserID!: string;
    actionBeginTime: any;
    actionID!: string;
    actionStatus!: ActionStatus;
    caseClassID!: string;
    caseClosedReason!: string;
    caseDescription!: string;
    caseEndTime: any;
    caseID!: string;
    caseInitiatedBy!: string;
    caseInitiatedTime: any;
    caseLastUpdatedTime: any;
    caseNumber!: string;
    caseOwnerUserID!: string;
    caseRequestCount!: number;
    caseStartTime: any;
    caseStatus!: CaseStatus;
    caseUpdated!: boolean;
    caseWorkBucketList: any;//WorkBucket[];
    companyID!: string;
    contactID!: string;
    incidentNumber!: string;
    lastAssignedTime!: Date;
    lastSLAStartTime!: Date;
    pickedFromWorkBucketID!: string;
    requesterID!: string;
    slaDueDateTime!: Date;
    slaDuration!: number;
    slaElapsed!: number;
    slaElapsedDisplay!: number;
    slaPendingReason!: string;
    slaPendUntilDateTime!: Date;
    slaStatus!: SLAStatus;
    slaTimeUnit!: TimeUnit;
    source!: string;
    workflowID!: string;
    // workNumber: number;
    xCaseCI!: number;

    action!: IAction;
    assignedToUser: any;//IUser;
    attachmentList: any;//IAttachment[];
    caseClass!: ICaseClass;
    caseDataList!: IExtendedData[];
    caseSLAHistoryList: any;//ICaseSLAHistory[];
    caseWithSameIncidentNumberList!: ICase[];
    company!: ICompany;
    contact!: IContact;
    interactionList: any;//IInteraction[];
    owner: any;//IUser;
    workflow!: IWorkflow;
    linkedCaseList!: ICase[];
    requester!: IContact;
    workflowToken: any;//IWorkflowToken;
    workflowTokenHistoryList: any;//IWorkflowTokenHistory[];
    isFromArchive!: boolean;
    

    $types: any = {
      actionBeginTime: Object,
      caseEndTime: Object,
      caseInitiatedTime: Object,
      caseLastUpdatedTime: Object,
      caseStartTime: Object,
      lastAssignedTime: Date,
      lastSLAStartTime: Date,
      slaDueDateTime: Date,
      slaPendUntilDateTime: Date,
      action: Action,
      assignedToUser: User,
      attachmentList: Object,//Attachment,
      caseClass: CaseClass,
      caseDataList: ExtendedData,
      caseSLAHistoryList: Object,//CaseSLAHistory,
      caseWithSameIncidentNumberList: Case,
      company: Company,
      contact: Contact,
      interactionList: Object,//Interaction,
      owner: User,
      workflow: Workflow,
      linkedCaseList: Case,
      requester: Contact,
      workflowToken: Object,//WorkflowToken,
      workflowTokenHistoryList: Object,//WorkflowTokenHistory
    };
  }
