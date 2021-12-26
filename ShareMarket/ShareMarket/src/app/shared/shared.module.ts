import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';

import { 
  AuthInterceptorService,
  ConfirmationPopupComponent, FileAttachmentComponent,
  GridMaterialComponent, InputMaterialComponent,
  SelectMaterialComponent
       } from 'src/app/shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const AllSharedComponent = [
  ConfirmationPopupComponent, FileAttachmentComponent,
  GridMaterialComponent, InputMaterialComponent,
  SelectMaterialComponent
]

@NgModule({
  declarations: [AllSharedComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [AllSharedComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }
