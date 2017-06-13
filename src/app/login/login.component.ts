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

  model: any = {};
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
        .subscribe(result => {
          if (result === true) {
            // login successful
            //this.router.navigate(['/']);
            this._location.back();
          } else {
            // login failed
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
        });
    }
  }

  logout() {
    this.loginService.logout();
  }


}
