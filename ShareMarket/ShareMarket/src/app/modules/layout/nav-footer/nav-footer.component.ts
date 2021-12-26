import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss']
})
export class NavFooterComponent implements OnInit {

  coreVersion = '0.0.0.0';//environment.application.version;
  years!: number;
  constructor() {
    this.years = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
