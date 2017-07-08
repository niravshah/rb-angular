import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class StripeService {

  constructor(private http: Http) {
  }

  getAccountId(code: string, state: string, scope: string) {
    const message = {code: code, scope: scope};
    const url = '/api/posts/' + state + '/account/code';
    return this.http.post(url, message)
      .map(res => res.json());
  }

}
