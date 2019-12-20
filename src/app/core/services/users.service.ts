import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/type-post.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:3000/users';
  getTodoData = new BehaviorSubject<Array<any>>([]);

  constructor(
    private http: HttpClient,
 
  ) { }

  getListUsers(): Observable<Array<object>>{
    return this.http.get<Array<object>>(this.url)
  }

  ngOnInit() {
    this.getPostList()
  }

  getPostList(): void {
    this.http.get<Array<any>>(this.url)
    .subscribe(
      (data)=>{
        console.log(data),
      this.getTodoData.next(data)
      
      
    },(err) =>{
      console.log(err)
     }
    )
 }


}
