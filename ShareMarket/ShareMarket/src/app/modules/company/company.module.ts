import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyRoutingModule } from './company-routing.module';

const CompanyAllComponent = [
  CompanyComponent, CreateCompanyComponent
];

@NgModule({
  declarations: [CompanyAllComponent],
  imports: [
    CommonModule, CompanyRoutingModule
  ],
  exports: [CompanyAllComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class CompanyModule { }
