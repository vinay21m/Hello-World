//import { IRightEntity, RightEntity } from './rightEntity.abstract';

import { IRightEntity, RightEntity } from 'src/app/authentication/models/rightEntity';

import { NameValueStringPair } from './';

export interface IExtendedData extends IRightEntity {
  dataFieldValue: string;
  extendedDataField: IExtendedDataField;
  extendedDataFieldID: string;
  extendedDataID: string;
  isNew: boolean;
  parentObjectID: string;
}

export interface IExtendedDataField extends IRightEntity {
  companyID: string;
  dataFieldDataType: ExtendedDataFieldDataType;
  dataFieldDefaultValue: string;
  dataFieldName: string;
  dataFieldRequiredGroup: string;
  extendedDataFieldID: string;
  isNew: boolean;
  isSearchable: boolean;
}

export class ExtendedData extends RightEntity 
    implements IExtendedData {
  dataFieldValue!: string;
  extendedDataField!: ExtendedDataField;
  extendedDataFieldID!: string;
  extendedDataID!: string;
  isNew!: boolean;
  parentObjectID!: string;

  $types: any = {
    extendedDataField: ExtendedDataField
  };
}

export class ExtendedDataField extends RightEntity 
            implements IExtendedDataField {
  companyID!: string;
  dataFieldDataType!: ExtendedDataFieldDataType;
  dataFieldDefaultValue!: string;
  dataFieldName!: string;
  dataFieldRequiredGroup!: string;
  extendedDataFieldID!: string;
  isNew!: boolean;
  isSearchable!: boolean;
  pickListRecords: NameValueStringPair[] = [];
  isDisplay: boolean = false;
}

export enum ExtendedDataFieldDataType {
  Text = 0,
  YesNo = 1,
  Number = 2,
  Date = 3,
  EmailAddress = 4,
  PickList = 5,
  UrlUnc = 6,
  PhoneBook = 7
}

export enum DefaultHideExtendedDataField {
  Company = 0,
  EmailSignature = 1,
  Language = 2
}
