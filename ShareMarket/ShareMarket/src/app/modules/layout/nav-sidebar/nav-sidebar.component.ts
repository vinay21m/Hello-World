// import * as moment from 'moment';
// import { ICompany, LogosService, Utility } from 'src/app/shared';
// import { APIUrl } from 'src/app/shared/services/service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
// import {
//     faArrowRight, faBell, faBookOpen, faClock, faHome, faLayerGroup, faLightbulb, faPhoneAlt,
//     faQuestionCircle, faSignOutAlt, faTh, faTools, faUserAlt, faUserLock
// } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss']
})
export class NavSidebarComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  panelOpenState = false;

  // faArrowRight = faArrowRight;
  // faBell = faBell;
  // faBookOpen = faBookOpen;
  // faClock = faClock;
  // faLayerGroup = faLayerGroup;
  // faLightbulb = faLightbulb;
  // faPhoneAlt = faPhoneAlt;
  // faQuestionCircle = faQuestionCircle;
  // faTools = faTools;
  // faUserAlt = faUserAlt;
  // faSignOut = faSignOutAlt;
  // company!: ICompany;
  // images: any = 'assets/images/conduent-logo.svg';
  constructor(private router: Router//,
    // private logos: LogosService
  ) {

  }

  ngOnInit(): void {

  }

  menuClick(url: string) {
    window.sessionStorage.removeItem('caseID');
    window.sessionStorage.removeItem('viewCaseID');
    window.sessionStorage.removeItem('goback');
    window.sessionStorage.removeItem('searchText');
    if (url !== '/case/create') {
      window.sessionStorage.setItem('goback', url);
    }
    this.router.navigate([url]);
  }

  menuManaged(value: string, index: number) {
    // this.panelOpenState = [false, false, false];

    // this.panelOpenState[index] = !(value === 'close');
  }

  getDateTimeTooltip() {
    // let currentDate = moment().format("MMMM, D YYYY LTS");
    // return moment().format("MMMM, D YYYY LTS");
  }
}
