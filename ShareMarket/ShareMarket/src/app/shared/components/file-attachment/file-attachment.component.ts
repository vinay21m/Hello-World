// import {
//     AttachmentFiles, AttachmentsService
// } from 'src/app/authentication/services/attachments/attachments.service';

import { ToastrService } from 'ngx-toastr';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Parameter, ParameterService } from '../..';
import { Attachment } from '../../models/attachment';
import {
    AttachmentFiles, AttachmentsService
} from '../../services/attachments/attachments.service';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-file-attachment',
  templateUrl: './file-attachment.component.html',
  styleUrls: ['./file-attachment.component.css'],
})
export class FileAttachmentComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() caseId!: string;
  modalRef!: NgbModalRef;
  parameterList: any;

  files: Array<AttachmentFiles> = new Array<AttachmentFiles>();
  filesLink: Array<AttachmentFiles> = new Array<AttachmentFiles>();
  fileattachment = false;

  confirmationMessage: string = '';
  confirmationTitle: string = '';

  attachemnts: Array<AttachmentFiles> = new Array<AttachmentFiles>();
  fileLinkText: any = '';
  isFileUpload: boolean = true;
  isSubmitAttach: boolean = false;
  isSaveAttach: number = 0;
  attachmentSizeValue!: string;
  attachmentSuffixe!: string;
  fileMaxSize: number = 0;
  private fileName: string = '';

  constructor(
    private attachmentsService: AttachmentsService,
    private activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private toastrService: ToastrService,
    private parameterService: ParameterService
  ) {
    this.parameterList = this.parameterService.getParameterList();
    this.attachmentSizeValue = this.parameterList?.find((item: Parameter) => {
      return item.parameterName == 'AttachmentSizeValue';
    })?.parameterValue;
    this.attachmentSuffixe = this.parameterList?.find((item: Parameter) => {
      return item.parameterName == 'AttachmentSuffixe';
    })?.parameterValue;
  }

  ngOnInit(): void {
    this.fileattachment = false;
  }

  getFileDetails(e: any) {
    e.target.files.forEach((item: File) => {
      let strExtension: string = item.name.split('.').pop() ?? '';
      this.attachmentsService
        .CheckExtension(strExtension)
        .subscribe((flag: boolean) => {
          if (flag) {
            this.isFileUpload = false;
            this.setAttachment(item, 'file');
          }
        });
    });
  }

  getLink() {
    const strExtension = this.fileLinkText.split('.').pop() ?? '';

    this.attachmentsService
      .CheckExtension(strExtension)
      .subscribe((flag: boolean) => {
        if (flag) {
          this.setAttachment(
            { name: this.fileLinkText },
            'link',
            this.fileLinkText
          );
          this.fileLinkText = '';
        }
      });
  }

  setAttachment(item: any, type: string, url: string = '') {
    let attachemntName: string = item.name?.split('\\')?.pop() ?? '';

    let attachemnt: AttachmentFiles = new AttachmentFiles();
    attachemnt.attachmentName = attachemntName;
    attachemnt.caseID = this.caseId;
    attachemnt.description = '';
    attachemnt.attachmentFileName = item.name;
    attachemnt.file = type === 'file' ? item : undefined;
    attachemnt.type = type;
    attachemnt.url = url;

    if (type === 'file') {
      this.fileMaxSize = this.fileMaxSize + item.size;
      if (this.varifyFileSize(this.fileMaxSize)) {
        attachemnt.isProgressBar = 2;
        this.toastrService.error(`File size has been exceeded ${item.name}`);
      }
      this.files.push(attachemnt);
      this.files = this.removeDublicate(this.files);
    } else if (type === 'link') {
      this.filesLink.push(attachemnt);
      this.filesLink = this.removeDublicate(this.filesLink);
    }
  }

  removeDublicate(item: Array<AttachmentFiles>) {
    return item.filter((elem, index, self) => {
      return (
        index ===
        self
          .map((d: AttachmentFiles) => {
            return d.attachmentFileName;
          })
          .indexOf(elem.attachmentFileName)
      );
    });
  }

  onRowDescription(event: Event, item: AttachmentFiles, column: string) {
    let describe = (event.target as HTMLInputElement).value;
    this.files.map((x: AttachmentFiles) => {
      if (item == x && column == 'description') {
        x.description = describe;
      } else if (item == x && column == 'attachmentFileName') {
        x.attachmentFileName = describe;
      }
    });
  }

  AttachLinkCase(): any {
    let filesList = this.files.filter((item: AttachmentFiles) => {
      return item.isProgressBar != 2;
    });

    if (
      filesList.find((item: AttachmentFiles) => {
        return !!!item.attachmentFileName;
      })
    ) {
      this.toastrService.error('Attachemnt File Name is requried');
      return false;
    }
    this.isSaveAttach =
      (filesList.length > 0 ? filesList.length : 0) +
      (this.filesLink.length > 0 ? this.filesLink.length : 0);

    this.attachemnts = [];

    filesList.map((item: AttachmentFiles) => {
      const formData: FormData = new FormData();
      formData.append('caseID', this.caseId ?? '');
      formData.append('name', item.attachmentName);
      formData.append('description', item.description);
      formData.append('file', item.file, item.attachmentFileName);

      this.fileName += item.attachmentName +', ';
      this.attachmentsService.UploadAttachment(formData).subscribe((d: any) => {
        let interval = setInterval(() => {
          item.progressBar =
            item.progressBar + Math.floor(Math.random() * 10) + 10;
          if (item.progressBar >= 100) {
            item.isProgressBar = 1;
            item.progressBar = 100;
            clearInterval(interval);
            this.isSaveAttach = this.isSaveAttach - 1;
            this.closePopup(this.isSaveAttach);
          }
        }, 100);
      });
    });
    this.filesLink.map((item: AttachmentFiles) => {
      let att: Attachment = new Attachment();
      att.attachmentFileName = item.attachmentFileName;
      att.attachmentName = item.attachmentName;
      att.attachmentType = item.attachmentType;
      att.caseID = this.caseId;
      att.description = item.description;
      att.versionCreateTime = item.versionCreateTime;
      att.versionNumber = item.versionNumber;

      this.fileName += item.attachmentName +', ';
      this.attachmentsService.AddAttachment(att).subscribe((d: any) => {
        let interval = setInterval(() => {
          item.progressBar =
            item.progressBar + Math.floor(Math.random() * 10) + 10;
          if (item.progressBar >= 100) {
            item.isProgressBar = 1;
            item.progressBar = 100;
            clearInterval(interval);
            this.isSaveAttach = this.isSaveAttach - 1;
            this.closePopup(this.isSaveAttach);
          }
        }, 100);
      });
    });
  }

  closePopup(saveAttach: number) {
    if (saveAttach === 0) {
      this.open.emit(this.fileName);
      this.activeModal.close(this.fileName);
    }
  }

  removeAttachment(index: number, fileType: string, fileName: string) {
    this.confirmationTitle = `Delete Attachment ${fileType}`;
    this.confirmationMessage = `Are you sure you want to delete the selected attachment(s):${fileName}?`;
    this.confirmation(fileType, index);
  }

  dropHandler(ev: any) {
    // Prevent default behavior(file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          let file = ev.dataTransfer.items[i].getAsFile();

          let strExtension: string = file.name.split('.').pop() ?? '';
          this.attachmentsService
            .CheckExtension(strExtension)
            .subscribe((flag: boolean) => {
              if (flag) {
                this.isFileUpload = false;
                this.setAttachment(file, 'file');
              }
            });
        }
      }
    } else {
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        const file = ev.dataTransfer.files[i];
        let strExtension: string = file.name.split('.').pop() ?? '';
        this.attachmentsService
          .CheckExtension(strExtension)
          .subscribe((flag: boolean) => {
            if (flag) {
              this.isFileUpload = false;
              this.setAttachment(file, 'file');
            }
          });
      }
    }
  }

  dragOverHandler(ev: any) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    ev.stopPropagation();
  }

  closePop() {
    if (
      (this.files.length > 0 &&
        this.files.find((d: AttachmentFiles) => {
          return !!!d.progressBar || d.progressBar === 0;
        })) ||
      (this.filesLink.length > 0 &&
        this.filesLink.find((d: AttachmentFiles) => {
          return !!!d.progressBar || d.progressBar === 0;
        }))
    ) {
      this.confirmationTitle = 'Unsave Attachment';
      this.confirmationMessage =
        'Do you want to discard the unsave attachments?';
      this.confirmation('close');
    } else {
      this.activeModal.close('Close');
    }
  }

  confirmation(confmType: string, index: number = 0) {
    this.modalRef = this.modalService.open(ConfirmationPopupComponent, {
      size: 'md',
      backdrop: 'static',
    });

    this.modalRef.componentInstance.msg = this.confirmationMessage;
    this.modalRef.componentInstance.title = this.confirmationTitle;
    this.modalRef.componentInstance.Yes = 'Yes';
    this.modalRef.componentInstance.No = 'No';

    this.modalRef.result.then(
      (result) => {
        if (result) {
          if (confmType === 'close') this.activeModal.close('Close');
          else if (confmType === 'file') this.files.splice(index, 1);
          else if (confmType === 'link') this.filesLink.splice(index, 1);
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  varifyFileSize(_size: number): boolean {
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
      i = 0;
    while (_size > 900) {
      _size /= 1024;
      i++;
    }

    if (!!this.attachmentSuffixe && !!this.attachmentSizeValue) {
      const index = fSExt.indexOf(this.attachmentSuffixe);
      const fileIndex = fSExt.indexOf(fSExt[i]);
      const fileSize = Math.round(_size * 100) / 100;

      return (
        (index === fileIndex && +this.attachmentSizeValue < fileSize) ||
        index < fileIndex
      );
    } else {
      return false;
    }
  }
}
