import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
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

    return this.http.post('/api/authenticate', JSON.stringify({
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

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  loggedInUser(){
    return localStorage.getItem('currentUser');
  }


}
