import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class FirstLoginService {

  constructor(private _http: Http) {
  }

  firstLoginVerification(username, password, code) {
    const url = '/api/auth/first-login';
    const body = {username: username, password: password, mobileCode: code};
    return this._http.post(url, body).map(res => res.json);
  }
}
