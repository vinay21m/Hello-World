import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
})
export class ConfirmationPopupComponent implements OnInit {

  @Input() msg: string = '';
  @Input() subMsg: string = '';

  @Input() isYesNO: boolean = true;

  @Input() isOK: boolean = false;

  @Input() title: string = '';

  @Input() Yes: string = 'Yes';

  @Input() No: string = 'No';

  modalRef!: NgbModalRef;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal(sendData: boolean) {
    this.activeModal.close(sendData);
  }
}
