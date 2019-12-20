import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/type-post.service';

@Pipe({
  name: 'radioSearch'
})
export class RadioSearchPipe implements PipeTransform {

  transform(posts: Array<Post>, radioValue: string): any {
    if (radioValue === 'all') {
      return posts
    }
    if (radioValue === 'spend') {
      return posts = posts.filter(e => e.putOrTakeManey === 'take')
    }
    if (radioValue === 'earn') {
      return posts = posts.filter(e => e.putOrTakeManey === 'put')
    }
  }

}
