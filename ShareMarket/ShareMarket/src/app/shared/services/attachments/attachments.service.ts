import { saveAs } from 'file-saver';
import { Observable, of, Subject } from 'rxjs';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Attachment } from '../../models/attachment';
import { APIUrl } from '../service';
import { Utility } from '../utility/utility';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private currentUrl: string;
  private controler: string = APIUrl.controlerAttachments;

  private _attachmentSource = new Subject<any>();
  attachmentSource$ = this._attachmentSource.asObservable();

  popupAddAttachment(data: any) {
    this._attachmentSource.next(data);
  }

  constructor(
    private _httpClient: HttpClient,
    private _tokenStorageService: TokenStorageService
  ) {
    this.currentUrl = Utility.getCurrentUrlWithCompany(false);
  }

  UploadAttachment(formData: any): Observable<any> {
    const token = this._tokenStorageService.getToken();

    return of(
      fetch(`${this.currentUrl}${this.controler}/UploadAttachment`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }).then((res) => res.text())
    );
  }

  CheckExtension(extension: string): Observable<boolean> {
    return this._httpClient.get<boolean>(
      `${this.currentUrl}${this.controler}/CheckExtension?extension=${extension}`
    );
  }

  AddAttachment(attachemnt: Attachment): Observable<any> {
    return this._httpClient.post<any>(
      `${this.currentUrl}${this.controler}/AddAttachment`,
      JSON.parse(JSON.stringify(attachemnt))
    );
  }

  GetAttachmentListByCaseID(caseID: string): Observable<any> {
    return this._httpClient.get<any>(
      `${this.currentUrl}${this.controler}/GetAttachmentListByCaseID?caseID=${caseID}`
    );
  }

  DeleteAttachment(attachmentID: string): Observable<any> {
    return this._httpClient.delete(
      `${this.currentUrl}${this.controler}/DeleteAttachment?attachmentID=${attachmentID}`
    );
  }

  GetAttachmentContents(attachmentID: string, fileName: string): void {
    this._httpClient.get(`${this.currentUrl}${this.controler}/getattachmentcontents?attachmentID=${attachmentID}`,
      { responseType: 'blob' }).subscribe((data: any) => {
        let blob = new Blob([data]);
        saveAs(blob, fileName);
      });
  }
}

export class AttachmentFiles extends Attachment {
  file: any;
  type!: string;
  url!: string;
  progressBar: number = 0;
  isProgressBar: number = 0;
}


