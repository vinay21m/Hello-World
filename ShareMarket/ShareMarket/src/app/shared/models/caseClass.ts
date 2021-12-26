import { Company, ICompany } from 'src/app/authentication/models/company';
import { ExtendedDataField, IExtendedDataField } from 'src/app/authentication/models/extendedData';
import { RightEntity } from 'src/app/authentication/models/rightEntity';

import { ISLA } from './interface';
import { ICaseClass } from './interface/iCaseClass';
import { IWorkflow } from './interface/iWorkflow';
import { SLA } from './sLA';
import { Workflow } from './workflow';

export class CaseClass extends RightEntity implements ICaseClass {

    caseClassID!: string;
    caseClassName!: string;
    caseSubSubType!: string;
    caseSubSubTypeDescription!: string;
    caseSubType!: string;
    caseSubTypeDescription!: string;
    caseType!: string;
    caseTypeDescription!: string;
    companyID!: string;
    country!: string;
    countryDescription!: string;
    displayName!: string;
    isNew!: boolean;
    language!: string;
    languageDescription!: string;

    caseDataFieldList!: IExtendedDataField[];
    company!: ICompany;
    sla!: ISLA;
    workflow!: IWorkflow;
    slaFieldList!: ISLA[];
    updateDate!: Date;
    migrationDate!: Date;
    retentionDays!: number;
    startDate!: Date;
    endDate!: Date;

    $types: any = {
      caseDataFieldList!: ExtendedDataField,
      workflow!: Workflow,
      company!: Company,
      sla!: SLA,
      updateDate!: Date,
      migrationDate!: Date,
      startDate!: Date,
      endDate!: Date
    };
  }
