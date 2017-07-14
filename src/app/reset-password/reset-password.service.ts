import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Injectable()
export class ResetPasswordService {

  constructor(private _http: Http) {
  }

  resetPassword(password: string, repeatPassword: string, jwt: string) {

    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + jwt);
    const url = '/api/auth/reset-password';

    return this._http.post(url, {
      password: password,
      repeat: repeatPassword
    }, {headers: headers}).map((res: Response) => {
      return res.json();
    });

  }
}
