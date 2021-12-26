import { AuthGuard } from '../../shared/services/guards/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';

const routes: Routes = [
  {
    path: '', component: CompanyComponent, children: [
      {        
        path: 'create',
        // canActivate: [AuthGuard], 
        // canActivateChild: [AuthGuard],
        component: CreateCompanyComponent
        // ,
        // resolve: {
        //   getNextCaseNumber: GetNextCaseNumberResolver,
        //   userList: GetUserListWithCompanyAccessResolver,
        //   caseSource: GetCaseSourceResolverService,
        //   caseDataList: GetCaseDataFieldListByCompanyIDResolver
        // }
      }
    ]
  },
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
