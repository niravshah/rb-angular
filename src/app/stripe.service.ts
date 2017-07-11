import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

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


  createNewAccount(model: any, jwt: string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + jwt);

    const url = '/api/stripe/account/new';
    return this.http.post(url, model, {headers: headers})
      .map(res => res.json());
  }

}
