import * as moment from 'moment';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/authentication/services/auth.service';
import {
    CaseActionPopupComponent, CasesService, FileAttachmentComponent, ICase, UserActionStatus
} from 'src/app/shared';
import { AttachmentsService } from 'src/app/shared/services/attachments/attachments.service';
import {
    EventNotificationService
} from 'src/app/shared/services/event-notification/event-notification.service';
import { ConstrantValue } from 'src/app/shared/services/service';

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    faArrowRight, faBell, faBookOpen, faClock, faLayerGroup, faLightbulb, faPhoneAlt,
    faQuestionCircle, faSignOutAlt, faTools, faUserAlt
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {
  @Input()
  isLoggedIn: boolean = false;

  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  faArrowRight = faArrowRight;
  faBell = faBell;
  faBookOpen = faBookOpen;
  faClock = faClock;
  faLayerGroup = faLayerGroup;
  faLightbulb = faLightbulb;
  faPhoneAlt = faPhoneAlt;
  faQuestionCircle = faQuestionCircle;
  faTools = faTools;
  faUserAlt = faUserAlt;
  faSignOut = faSignOutAlt;
  modalRef!: NgbModalRef;
  cases!: ICase;
  isCaseEdit: boolean = true;

  private userActivityStatus: UserActionStatus = UserActionStatus.None;

  constructor(private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private attachmentService: AttachmentsService,
    private eventNotificationService: EventNotificationService,
    private _cases: CasesService) {

    this._cases.casesSource$.subscribe((cases: ICase) => {
      this.cases = cases;
    })

    this._cases.isCaseEditSource$.subscribe((isCaseEdit: boolean) => {
      this.isCaseEdit = isCaseEdit;
    })
  }

  ngOnInit(): void {

    this.eventNotificationService.subjectChanged$.subscribe((item: UserActionStatus) => {
      this.userActivityStatus = item;
    });


    this.eventNotificationService.subjectChanged$.subscribe((item: UserActionStatus) => {
      if (item === UserActionStatus.SignOut) {
        this.signout();
      }
    });

  }

  getDateTimeTooltip(): string {
    let currentDate = moment().format("MMMM, D YYYY LTS");
    return moment().format("MMMM, D YYYY LTS");
  }

  logoutUser(): void {
    if (this.userActivityStatus === UserActionStatus.None) {
      this.signout();
    }
  }


  addAttachment() {
    this.popupCompnent(FileAttachmentComponent, ConstrantValue.ATTACHMENT);
  }

  private signout(): void {
    this.isLoggedIn = false;
    this.authService.logout();
    console.log("User logged out!");
    this.router.navigate(['/'])
    .then(() => {
      window.location.reload();
    });
  }

  holdCase() {
    let holdSubTitle = `Putting this Case on hold will allow you to get other work.
    Please enter the reason for holding the Case, instead of completing the work.`;
    this.popupCompnent(CaseActionPopupComponent, ConstrantValue.CASEHOLD, holdSubTitle);
  }

  returnCase() {
    let returnSubTitle = `Returning the Case will return it to the WorkBucket for another user to get.
    Please enter the reason for returning the Case.`;
    this.popupCompnent(CaseActionPopupComponent, ConstrantValue.RETURNCASE, returnSubTitle);
  }

  popupCompnent(component: any, type: string, subTitle: string = '') {
    let caseId = window.sessionStorage.getItem(ConstrantValue.CASEID_KEY)?.toString();
    if ((type === ConstrantValue.RETURNCASE || type === ConstrantValue.CASEHOLD) && !!!caseId) {
      caseId = window.sessionStorage.getItem(ConstrantValue.VIEWCASEID)?.toString();
    }
    if (!!this.cases?.caseID && !!!caseId) {
      caseId = this.cases.caseID;
    }
    if (!!caseId) {
      this.modalRef = this.modalService.open(component, {
        size: 'lg',
        backdrop: 'static',
      });
      this.modalRef.componentInstance.caseId = caseId;
      this.modalRef.componentInstance.title = type;
      this.modalRef.componentInstance.subTitle = subTitle;
      if (type === ConstrantValue.CASEHOLD) {
        this.modalRef.componentInstance.lable = ConstrantValue.HOLD;
      } else if (type === ConstrantValue.RETURNCASE) {
        this.modalRef.componentInstance.lable = ConstrantValue.RETURN;
      }

      this.modalRef.componentInstance.open.subscribe((d: any) => {
        if (type === ConstrantValue.ATTACHMENT) {
          this.attachmentService.popupAddAttachment(d);
        } else if ((type === ConstrantValue.CASEHOLD) || (type === ConstrantValue.RETURNCASE)) {
          this._cases.popupCloseCases(ConstrantValue.CLOSE);
        }
      });
    }
  }
}

