import { Attachment } from '../attachment';
import { InteractionData } from '../Interaction';
import { IAction } from './iAction';
import { IContact } from './iContact';

export interface IInteraction {
    actionID: string;
    caseID: string;
    contactID: string;
    endTime: any;
    interactionID: string;
    interactionResult: string;
    interactionType: InteractionType;
    isNew: boolean;
    notes: string;
    startTime: any;
    userID: string;
  
    action: IAction;
    user: any;
    contact: IContact;
    interactionDataList: Array<InteractionData>;
    attachmentList: Array<Attachment>;
  }
  
  export interface IInteractionData {
    dataFieldContentType: DataContentType;
    dataFieldValue: string;
    interactionDataID: string;
    interactionID: string;
  }
  

export enum DataContentType {
    None = 0,
    FromAddress = 1,
    ToAddress = 2,
    CcAddress = 3,
    Subject = 4,
    BodyText = 5,
    BodyHtml = 6,
    SentTime = 7,
    ReceivedTime = 8,
    BccAddress = 9
  }
  
  

export enum InteractionType {
    Manual = 0,
    Automated = 1,
    Escalate = 2,
    DeEscalate = 3,
    ManualWorkCase = 4,
    OutOfOfficeEmail = 5,
    IncomingEmail = 6,
    OutgoingEmail = 7,
    IncomingPhone = 8,
    OutgoingPhone = 9,
    IncomingFax = 10,
    OutgoingFax = 11,
    IncomingChat = 12,
    OutgoingChat = 13,
    IncomingPortal = 14,
    OutgoingPortal = 15,
    InPerson = 16,
    Other = 17
  }
