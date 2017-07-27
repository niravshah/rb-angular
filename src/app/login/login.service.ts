import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class LoginService {

  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/auth/login', JSON.stringify({
      username: username,
      password: password
    }), {headers: headers})
      .map((response: Response) => {
          // login successful if there's a jwt token in the response
          return response.json();
        }
      )
      ;
  }


  register(email: string, name: string) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/register', JSON.stringify({
      email: email,
      name: name
    }), {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  saveTokenLocally(email, token, username, sid): void {

    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify({
      email: email,
      username: username,
      token: token,
      sid: sid
    }));
  }

  loggedIn() {
    return tokenNotExpired();
  }

  loggedInUser() {
    return localStorage.getItem('currentUser');
  }

  loggedInUserSid() {
    return JSON.parse(localStorage.getItem('currentUser')).sid;
  }

  loggedInJwt() {
    return localStorage.getItem('token');
  }


}
