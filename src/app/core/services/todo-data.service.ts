import { Injectable } from '@angular/core';
import { Post } from 'src/app/core/interfaces/type-post.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class TodoDataService {
  url = 'http://localhost:3000/data';
  getTodoData = new BehaviorSubject<Array<Post>>([])
  posts: Array<Post>;
  unsubscribed = new Subject();
  
  moneyTitle = true;
  title: boolean = false;
  date: boolean = false;
  sum: boolean = false;
  search = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getPostList()
  }

  getPostList(): void {
     this.http.get<Array<Post>>(this.url)
     .subscribe(
       (data)=>{
       this.getTodoData.next(data)
     },(err) =>{
       console.log(err)
      }
     )
  }

  deletePost(postId: any): Observable<any> {
    return this.http.delete<Array<Post>>(`${this.url}/${postId}`)
  }

  addPost(newPost: Post): Observable<any> {
    newPost.id = Math.random().toString(36).substr(2, 9);
    return this.http.post(this.url, newPost);
  }

  editPost(todo: Post):void {
   this.http.put<Array<Post>>(`${this.url}/${todo.id}`, todo)
    .subscribe(()=>this.getPostList())
  }

  moneyOrTitle(event) {
    if (event.target.value === 'title') this.moneyTitle = true;
    if (event.target.value === 'money') this.moneyTitle = false;
  }

  public numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }
 

}

