import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {JwtService} from '../../../jwt.service';

@Injectable()
export class StripeComponentService extends JwtService {

  constructor(private http: Http) {
    super();
  }

  chargeToken(token, amount, post, jwt) {
    const message = {token: token, attributes: amount, post:post};
    const url = '/api/stripe/charge';
    return this.http.post(url, message, {headers: super.getJwtHeader(jwt)})
      .map(res => res.json());
  }
}
