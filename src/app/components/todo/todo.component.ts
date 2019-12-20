import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Post } from '../../core/interfaces/type-post.service';
import { TodoDataService } from '../../core/services/todo-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { ModalConfirmDeleteComponent } from '../../modals/modal-confirm-delete/modal-confirm-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef
  posts: Array<Post> = [];
  private unsubscribed = new Subject();
  postId: String | number;
  operation = 'Income';
  postsDate: Date;
  message: string;

  constructor(
    private todoDataService: TodoDataService,
    private modalService: BsModalService,
    private router: Router,
  ) { }

  @Input() search;
  @Input() radioValue;

  ngOnInit() {
    this.todoDataService.getPostList()
    this.getPostsLists();
  }

  ngOnDestroy() {
    this.unsubscribed.next();
    this.unsubscribed.complete();
  }

  getPostsLists(): void {
    this.todoDataService.getTodoData.subscribe(data => {
      this.posts = data;
      data.sort(function (a, b) {
        let nameA = a.date, nameB = b.date;
        if (nameA < nameB)
          return 1
        if (nameA > nameB)
          return -1
        return 1
      });
    })
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].date = new Date(this.posts[i].date)
    }
    this.posts.sort(function (a, b) {
      return +b.date - +a.date
    })
  }

  private editModal(post): void {// modal Edit
    this.postId = post.id;
    this.modalRef = this.modalService.show(
      ModalConfirmComponent,
      Object.assign({}, {
        class: 'modal-md acs-modal',
        ignoreBackdropClick: true,
        initialState: {
          buttonName: 'Edit Post',
          submit: this.editButtonSubmit.bind(this),
          post: post,
        }
      }));
  }

  editButtonSubmit(form): void {
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
      this.modalRef.hide();
      form.value.id = this.postId
      this.todoDataService.editPost(form.value);
      this.router.navigate(['main']);
    }
  }

  deleteModal(title): void {// modal Delete
    this.modalRef = this.modalService.show(
      ModalConfirmDeleteComponent,
      Object.assign({}, {
        class: 'modal-sm acs-modal',
        ignoreBackdropClick: true,
        initialState: {
          postName: title,
          confirm: this.confirm.bind(this),
          decline: this.decline.bind(this)
        }
      }));
  }

  deletePost(postId, title): void {
    this.postId = postId;
    this.deleteModal(title)
  }

  confirm(): void {
    this.todoDataService.deletePost(this.postId)
      .pipe(takeUntil(this.unsubscribed))
      .subscribe(
        () => {
          this.todoDataService.getPostList()
        },
        err => console.log(err)
      )
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
