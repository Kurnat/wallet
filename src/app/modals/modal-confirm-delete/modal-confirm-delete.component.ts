import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.scss']
})

  export class ModalConfirmDeleteComponent {
    modalRef: BsModalRef;
    message: string;
    postName:string
    constructor() {}
   
    confirm(): void {
      this.message = 'Confirmed!';
      this.modalRef.hide();
    }
   
    decline(): void {
      this.message = 'Declined!';
      this.modalRef.hide();
    }
  }