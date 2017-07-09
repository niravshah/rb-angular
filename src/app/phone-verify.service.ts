import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PhoneVerifyService {

  constructor(private http: Http) {
  }

  requestCode(number) {
    return this.http.post('/api/phone/code/request', {number: number}).map(res => res.json());
  }

  verifyCode(code, number, jwt) {

    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + jwt);

    return this.http.post('/api/phone/code/verify', {number: number, code: code}, {headers: headers}).map(res => res.json());
  }

}
