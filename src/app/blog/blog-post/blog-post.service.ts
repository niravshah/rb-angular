import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class BlogPostService {

  constructor(private http: Http) {
  }

  getBlogPost(id) {
    const url = '/api/blog/posts/' + id;
    return this.http.get(url).map(res => {
      return res.json();
    });
  }

}
