import { Action } from './action';
import { Attachment } from './attachment';
import { Contact } from './contact';
import { IAction } from './interface/iAction';
import { IContact } from './interface/iContact';
import {
    DataContentType, IInteraction, IInteractionData, InteractionType
} from './interface/iInteraction';

export class Interaction implements IInteraction {
    actionID!: string;
    caseID!: string;
    contactID!: string;
    endTime: any;
    interactionID!: string;
    interactionResult!: string;
    interactionType!: InteractionType;
    isNew!: boolean;
    notes!: string;
    startTime: any;
    userID!: string;
  
    action!: IAction;
    user: any;
    contact!: IContact;
    interactionDataList!: Array<InteractionData>;
    attachmentList!: Array<Attachment>;
  
    $types: any = {
      endTime: Date,
      startTime: Date,
      action: Action,
      user: Object,
      contact: Contact,
      interactionDataList: InteractionData,
      attachmentList: Attachment
    };
  }
  
  
export class InteractionData implements IInteractionData {
    dataFieldContentType!: DataContentType;
    dataFieldValue!: string;
    interactionDataID!: string;
    interactionID!: string;
  }
  