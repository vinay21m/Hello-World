export enum CaseStatus {
    None = 0,
    Open = 1,
    New = 2,
    Closed = 3,
    Escalate1 = 4,
    Escalate2 = 5,
    Escalate3 = 6,
    Void = 7,
    Pending = 8,
    Hold = 9,
    DeEscalate=10,
    Escalate= 11
  }


  export enum ActionStatus {
    None = 0,
    Ready = 1,
    Active = 2,
    Reject = 3,
    Hold = 4,
    SlaActive = 5,
    SlaPending = 6,
    SlaComplete = 7
  }


  export enum SLAStatus {
    None = 0,
    Active = 1,
    Pending = 2,
    Complete = 3
  }

  export enum TimeUnit {
    None = 0,
    BusinessHours = 1,
    Hours = 2,
    BusinessDays = 3,
    Days = 4,
    Minutes = 5,
    BusinessMinutes = 6
  }

  export enum TimeUnitBoth {
    Hours = 2,
    BusinessHours = 1,
    Days = 4,
    BusinessDays = 3
  }

  export enum PickListNames
    {
        AddressType,
        DocumentClassification,
        FileExtension,
        CaseClosedReason,
        CaseDataFieldRequiredGroup,
        CaseHoldReason,
        CaseReturnReason,
        CaseSource,
        CaseSubSubType,
        CaseSubType,
        CaseType,
        CommonStoryBoard,
        ContactDataFieldRequiredGroup,
        ContactGroupType,
        ContactSecurityQuestions,
        ContactType,
        Country,
        // ReSharper disable once InconsistentNaming
        FAQCategory,
        Language,
        ScriptLanguage,
        SLAPendingReason
    }

    export enum UserActionStatus {
      None = 0,
      SignOutInitiated = 1,
      SignOut = 2,
      CaseActive = 3,
      NavigatingToShowCase = 4,
      NavigatingToContact = 5,
      NavigatingToSendEmail = 6
    }
