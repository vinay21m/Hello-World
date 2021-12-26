import { IAttachment } from './interface/iAttachment';

export class Attachment implements IAttachment {
    isDirty!: boolean;
    attachmentFileName!: string;
    attachmentID!: string;
    attachmentName!: string;
    attachmentType!: string;
    caseID!: string;
    description!: string;
    versionCreateTime: Date = new Date();
    versionNumber!: Number;
  }
