import { IRightEntity } from 'src/app/authentication/models/rightEntity';

export interface IContact extends IRightEntity {
  companyID: string;
  contactID: string;
  contactType: string;
  dateOfBirth: Date;
  email: string;
  fax: string;
  formattedFax: string;
  formattedHomePhone: string;
  formattedMobilePhone: string;
  formattedSSN: string;
  formattedWorkPhone: string;
  fullName: string;
  givenNames: string;
  homePhone: string;
  iD1: string;
  iD2: string;
  iD3: string;
  isNew: boolean;
  isAddressInserted: boolean;
  language: string;
  mobilePhone: string;
  nameSuffix: string;
  ssn: string;
  surnames: string;
  title: string;
  workPhone: string;

  contactAddressList: any; // IContactAddress[];
  contactDataList: any; // IExtendedData[];
  contactSecurityQuestionList: any; // IContactSecurityQuestion[];
  caseList: any; // ICase[];
  contactGroupList: any; // IContactGroup[];

  contactGroupListToString(): string;
}
