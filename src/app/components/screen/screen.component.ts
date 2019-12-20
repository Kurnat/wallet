import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DataService, Post } from '../../core/interfaces/type-post.service';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { BsModalService } from 'ngx-bootstrap';
import { TodoDataService } from '../../core/services/todo-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  private unsubscribed = new Subject();
  modalRef: any;
  posts: Post[] = [];
  sumInWallet: any = 0;

  constructor(
    private dataService: DataService,
    private modalService: BsModalService,
    private todoDataService: TodoDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPostsLists()
    this.todoDataService.getTodoData.subscribe(
      (date) => {
        this.sumInWallet = date.reduce((a, current) => {
          if (current.putOrTakeManey === 'put') {
            return a + +current.sum
          } else {
            return a - +current.sum
          }
        }, 0
        );
      }
    );
  }

  getPostsLists(): void {
    this.todoDataService.getPostList()
  }

  addTodo(form) {
    if (form.get('title').value.trim() == false || form.get('title').invalid) {
      this.todoDataService.title = true;
    } else {
      this.todoDataService.title = form.get('title').invalid;
    }

    if (form.get('sum').value.trim() == false || form.get('sum').invalid) {
      this.todoDataService.sum = true;
    } else {
      this.todoDataService.sum = form.get('sum').invalid;
    }

    this.todoDataService.date = form.get('date').invalid;

    if (form.get('title').valid && form.get('date').valid && form.get('sum').valid) {

      this.todoDataService.addPost(form.value)
        .pipe(takeUntil(this.unsubscribed))
        .subscribe(
          () => this.getPostsLists(),
          err => console.log(err)
        )
      this.modalRef.hide();
      this.router.navigate(['main']);
    }
  }

  onClick() {
    this.modalRef = this.modalService.show(
      ModalConfirmComponent,
      Object.assign({}, {
        class: 'modal-md acs-modal',
        ignoreBackdropClick: true,
        initialState: {
          buttonName: 'Add Post',
          submit: this.addTodo.bind(this),
        }
      }));
  }

}


