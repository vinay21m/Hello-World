import { ICompany } from 'src/app/authentication/models/company';
import { IExtendedDataField } from 'src/app/authentication/models/extendedData';
import { IRightEntity } from 'src/app/authentication/models/rightEntity';

export interface ICaseClass extends IRightEntity {

    caseClassID: string;
    caseClassName: string;
    caseSubSubType: string;
    caseSubSubTypeDescription: string;
    caseSubType: string;
    caseSubTypeDescription: string;
    caseType: string;
    caseTypeDescription: string;
    companyID: string;
    country: string;
    countryDescription: string;
    displayName: string;
    isNew: boolean;
    language: string;
    languageDescription: string;

    caseDataFieldList: IExtendedDataField[];
    slaFieldList: any;//ISLA[];
    company: ICompany;
    sla: any;//ISLA;
    workflow: any;//IWorkflow;

    updateDate: Date;
    migrationDate: Date;
    retentionDays: number;
    startDate: Date;
    endDate: Date;
  }
