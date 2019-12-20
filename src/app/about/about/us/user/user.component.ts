import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalForUserComponent } from 'src/app/modals/modal-for-user/modal-for-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  modalRef: BsModalRef;
  routeName;
  user: object;
  routeNotFaund: boolean = true;
  users: Array<any> = []
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeName = params.id
    })

    this.usersService.getListUsers().subscribe(
      data => {
        this.users = data;
        this.user = this.users.filter(el => el.id === this.routeName);
        if (this.user[0]) {
          if (this.user[0].id === this.routeName) {
            this.routeNotFaund = false;
          } else { this.routeNotFaund = true }
        }
      },
      err => console.log(err)
    )
  }

  getUrl(user) {
    return `url(${user[0].picture})`
  }

  showUser(event, user) {
    event.target.parentElement.parentElement.firstElementChild.firstElementChild.style.backgroundImage = `url(${user[0].picture})`

    this.modalRef = this.modalService.show(
      ModalForUserComponent,
      Object.assign({}, {
        class: 'modal-sm acs-modal text-dark',
        ignoreBackdropClick: false,
        initialState: {
          user: user[0]
        }
      }));
  }
}
