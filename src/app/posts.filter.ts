import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postfilter',
  pure: false
})
export class PostsFilter implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.type.indexOf(filter) !== -1);
  }
}
