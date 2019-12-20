import { Injectable } from '@angular/core';


export interface Post {
  id: number | string;
  putOrTakeManey: string;
  title: string;
  date: string | Date;
  sum: string
}

@Injectable({
  providedIn: 'root'
})

export class DataService { }
