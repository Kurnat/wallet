import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/core/services/todo-data.service';
import { takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/core/interfaces/type-post.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent implements OnInit {

  unsubscribed = new Subject();
  posts: Array<Post>;
  search;
  radioValue = 'all';

  constructor(public todoDataService: TodoDataService) { }

  ngOnInit() {
    this.getPostsLists()
  }

  getPostsLists(): void {
    this.todoDataService.getTodoData
      .pipe(takeUntil(this.unsubscribed))
      .subscribe(
        data => { this.posts = data },
        err => { console.log(err) }
      )
  }

  radioChange(event) {
    this.radioValue = event.target.value
  }

  moneyOrTitle(event) {
    this.todoDataService.moneyOrTitle(event)
  }

}
