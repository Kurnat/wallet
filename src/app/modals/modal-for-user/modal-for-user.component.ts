import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-for-user',
  templateUrl: './modal-for-user.component.html',
  styleUrls: ['./modal-for-user.component.scss']
})
export class ModalForUserComponent {
  user;

  constructor(private modalService: BsModalService,
    private modal: BsModalRef) { }

  openModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template);
  }
  hide() {
    this.modal.hide()
  }
} 
