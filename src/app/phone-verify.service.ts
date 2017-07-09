import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class PhoneVerifyService {

  constructor(private http: Http) {
  }

  requestCode(number) {
    return this.http.post('/api/phone/code/request', {number: number}).map(res => res.json());
  }

  verifyCode(number, code) {
    return this.http.post('/api/phone/code/verify', {number: number, code: code}).map(res => res.json());
  }

}
