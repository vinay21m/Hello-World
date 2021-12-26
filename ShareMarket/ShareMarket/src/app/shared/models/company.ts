 export interface ILogoInfo {
    id: string;
    lastUpdatedDate: Date;
  }

  export interface ICompany {
    companyID: string;
    companyName: string;
    logoInfo?: ILogoInfo;
    isNew: boolean;
    locked: boolean;
    lockedReason: string;
    timeZoneID: string;
    tenantEndPoint: any; // ccm.data.TenantEndPoint;
    companyDataList: any; // IExtendedData[];
  }

  export interface ICompanyWithServer extends ICompany {
    isCurrentServer: boolean;
    serverAddress: string;
    logoUrl: string;
  }

  export class Company implements ICompany {
    companyID!: string;
    companyName!: string;
    logoInfo?: ILogoInfo;
    isNew!: boolean;
    locked!: boolean;
    lockedReason!: string;
    timeZoneID!: string;
    tenantEndPoint: any;// ccm.data.TenantEndPoint;
    companyDataList: any; //IExtendedData[];
  }
  