import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: { username: string; password: string; };
  loading = false;
  error = '';

  constructor(private router: Router,
              private loginService: LoginService,
              private _location: Location) {
  }

  ngOnInit() {
    this.loginForm = {
      username: '',
      password: ''
    };
  }

  login(model: any, isValid: Boolean) {

    console.log(model, isValid);
    if (isValid) {
      this.loading = true;
      this.loginService.login(model.username, model.password)
        .subscribe((response) => {
          const token = response.token;
          if (token) {
            const email = response.email;
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify({email: email, username: model.username, token: token}));
            this._location.back();
          } else {
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
        }, (error) => {
          this.error = error.json().message;
          this.loading = false;
        });
    }
  }

  logout() {
    this.loginService.logout();
  }


}
