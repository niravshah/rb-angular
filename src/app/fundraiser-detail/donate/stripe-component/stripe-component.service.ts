import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {JwtService} from '../../../jwt.service';

@Injectable()
export class StripeComponentService extends JwtService {

  constructor(private http: Http) {
    super();
  }

  chargeToken(token, amount, jwt) {
    const message = {token: token, amount: amount};
    const url = '/api/stripe/charge';
    return this.http.post(url, message, {headers: super.getJwtHeader(jwt)})
      .map(res => res.json());
  }
}
