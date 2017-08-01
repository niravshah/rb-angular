import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class BlogListingService {

  constructor(private http: Http) {
  }

  getBlogPost() {
    const url = '/api/blog/posts';
    return this.http.get(url).map(
      res => {
        return res.json();
      }
    );
  }
}
