import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {JwtService} from './jwt.service';

@Injectable()
export class StripeService extends JwtService {

  oauthLink = 'https://connect.stripe.com/oauth/authorize';
  client_id = 'ca_AzHNx40aNPMx3bGQVksrT2nkLCxNeIyc';
  scope = 'read_write';
  response_type = 'code';


  constructor(private http: Http) {
    super();
  }

  getAccountId(code: string, state: string, scope: string, jwt: string) {
    const message = {code: code, scope: scope, post: state};
    const url = '/api/stripe/auth-code';
    return this.http.post(url, message, {headers: super.getJwtHeader(jwt)})
      .map(res => res.json());
  }

  createNewAccount(model: any, jwt: string) {
    const url = '/api/stripe/account/new';
    return this.http.post(url, model, {headers: super.getJwtHeader(jwt)})
      .map(res => res.json());
  }


  getOAuthUrl(post) {
    return encodeURI(this.oauthLink
      + this.addQueryParam('client_id', this.client_id, true)
      + this.addQueryParam('scope', this.scope, false)
      + this.addQueryParam('response_type', this.response_type, false)
      + this.addQueryParam('state', post.sid, false)
      + this.addStripeUserQueryParam('first_name', post.author.fname)
      + this.addStripeUserQueryParam('last_name', post.author.lname)
      + this.addStripeUserQueryParam('product_description', 'Raise Better Fundraiser: ' + post.title)
      + this.addStripeUserQueryParam('business_type', 'sole_prop')
      + this.addStripeUserQueryParam('url', 'https://raisebetter.uk/fundraisers/' + post.sid)
      + this.addStripeUserQueryParam('business_name', post.title)
      + this.addStripeUserQueryParam('phone_number', post.author.mobile)
      + this.addStripeUserQueryParam('email', post.author.email));
  }

  addQueryParam(param, value, firstParam) {
    if (firstParam) {
      return '?' + param + '=' + value;
    } else {
      return '&' + param + '=' + value;
    }

  }

  addStripeUserQueryParam(param, value) {
    return '&stripe_user[' + param + ']=' + value;
  }

  getConnectAccountStatus(stripe_account_id, jwt) {
    const url = '/api/stripe/account/' + stripe_account_id + '/status';
    return this.http.get(url, {headers: super.getJwtHeader(jwt)})
      .map(res => res.json());
  }

  getStripeCardElement(eventCallback,submitCallback){
      
  }
}
