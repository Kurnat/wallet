import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalForUserComponent } from 'src/app/modals/modal-for-user/modal-for-user.component';



@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})

export class UsComponent implements OnInit {
  users: Array<object> = [];
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(
    private usersService: UsersService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.usersService.getListUsers().subscribe(
      data => { this.users = data;},
      err => console.log(err)
    )
  }

  showUser(event, user) {
    event.target.parentElement.parentElement.firstElementChild.firstElementChild.style.backgroundImage = `url(${user.picture})`;
    this.modalRef = this.modalService.show(
      ModalForUserComponent,
      Object.assign({}, {
        class: 'modal-sm acs-modal text-dark',
        ignoreBackdropClick: false,
        initialState: {
          user
        }
      }));
  }

  getUrl(user) {
    return `url(${user.picture}`
  }
}
