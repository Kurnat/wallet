import { Pipe, PipeTransform } from '@angular/core';
import { Post, DataService } from '../interfaces/type-post.service';
import { Subject } from 'rxjs';
import { TodoDataService } from '../services/todo-data.service';



@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {
  unsubscribed = new Subject()
  posts: Array<Post>;

  constructor(public todoDataService: TodoDataService) {

  }

  transform(posts: Array<Post>, search: string = ''): Array<Post> { // title or sum
    if (!search.trim()) {
      return posts
    }
    if (this.todoDataService.moneyTitle) {// filter on title
      return posts.filter(post => {
        return post.title.toLowerCase().includes(search.toLowerCase())
      })
    }else{
      return posts.filter(post => {// filter on sum
        return post.sum.includes(search)
      })
    }
  }
}
