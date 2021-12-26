import { RightEntity } from 'src/app/authentication/models/rightEntity';

import { IContact } from './interface/iContact';

export class Contact  extends RightEntity implements IContact {
  companyID!: string;
  contactID!: string;
  contactType!: string;
  dateOfBirth!: Date;
  email!: string;
  fax!: string;
  givenNames!: string;
  homePhone!: string;
  iD1!: string;
  iD2!: string;
  iD3!: string;
  language!: string;
  mobilePhone!: string;
  nameSuffix!: string;
  ssn!: string;
  surnames!: string;
  title!: string;
  workPhone!: string;

  contactAddressList!: any; // IContactAddress[];
  contactDataList!: any; // IExtendedData[];
  contactSecurityQuestionList!: any; // IContactSecurityQuestion[];
  caseList!: any; // ICase[];
  contactGroupList!: any; // IContactGroup[];

  $types: any = {
    dateOfBirth: Date,
    caseDataFieldList: Object,// ExtendedDataField,
    contactAddressList: Object,//ContactAddress,
    contactDataList: Object,// ExtendedData,
    contactSecurityQuestionList: Object,//ContactSecurityQuestion,
    caseList: Object,//Case,
    contactGroupList: Object,//ContactGroup
  };

  public get isNew(): boolean { return !this.contactID ? true : false; }

  // This is only used for loading since "isNew" is currently coming
  // from the service due to using CCM API classes
  public set isNew(value: boolean) { /* Empty */ }

  isAddressInserted: boolean = false;

  public get fullName(): string {
    let parts: string[] = [
      // order is important here !
      this.title,
      this.givenNames,
      this.surnames,
      this.nameSuffix
    ];
    // we ignore falsy (empty or undefined) strings
    return parts?.join(' ');
  }

  // this is only used for loading since "fullName" is currently coming
  // from the service due to using CCM API classes
  public set fullName(value: string) { /* Empty */ }

  public get formattedHomePhone(): string {
    // return IUtils.FormattedPhone(this.HomePhone ?? "", "");
    return this.homePhone;
  }

  // This is only used for loading since "formattedHomePhone" is currently coming
  // from the service due to using CCM API classes
  public set formattedHomePhone(value: string) { /* Empty */ }

  public get formattedWorkPhone(): string { return this.workPhone; }

  // This is only used for loading since "formattedWorkPhone" is currently coming
  // from the service due to using CCM API classes
  public set formattedWorkPhone(value: string) { /* Empty */ }

  public get formattedMobilePhone(): string { return this.mobilePhone; }

  // This is only used for loading since "formattedMobilePhone" is currently coming
  // from the service due to using CCM API classes
  public set formattedMobilePhone(value: string) {/* Empty */ }

  public get formattedFax(): string { return this.fax; }

  // This is only used for loading since "formattedFax" is currently coming
  // from the service due to using CCM API classes
  public set formattedFax(value: string) { /* Empty */ }

  public get formattedSSN(): string {
    // return IUtils.FormattedSSN(this.SSN ?? "");
    return this.ssn;
  }

  // This is only used for loading since "formattedSSN" is currently coming
  // from the service due to using CCM API classes
  public set formattedSSN(value: string) { /* Empty */ }

  public contactGroupListToString = (): string => {
    if (this.contactGroupList) {
      return this.contactGroupList?.map((x: any) => x.name).join(', ');
    }
    return '';
  }

}

export class SearchContactListByCompanyIDExtendedSearchTermDTO {
  companyID!: string;
  searchID1!: string;
  searchID2!: string;
  searchID3!: string;
  searchSSN!: string;
  searchName!: string;
  searchContactType!: string;
  searchBeginBirthDate!: Date;
  searchEndBirthDate!: Date;
  searchGroupName!: string;
  extendedSearchPairList?: NameValueStringPair[];

  constructor() {
    this.searchEndBirthDate = new Date(9999, 11, 31);
    this.extendedSearchPairList = undefined;
  }

}

export class NameValueStringPair {
  name!: string;
  value: any;
}


export class ContactAddress {
  addressLine1!: string;
  addressLine2!: string;
  addressType!: string;
  city!: string;
  contactAddressID!: string;
  contactID!: string;
  country!: string;
  county!: string;
  formattedContactAddress!: string;
  postalCode!: string;
  state!: string;
  useCustomValue!: boolean;
  cityStatePostalCode!: string;

  cityStateZip!: string;
  addressLine!: string;
}
