import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MessageDisplayComponent} from "../message-display/message-display.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends MessageDisplayComponent implements OnInit {
  loginForm: { username: string; password: string; };
  registerForm: { email: string, name: string };
  loading = false;
  error = '';
  messages = [];
  messageMap = {
    1: 'This email exists. Please login before creating a new post.',
    2: 'Please login first.',
    3: 'New User Created. Password Emailed. Please Login to continue.',
    4: 'New User & Post Created. Password Emailed. Please Login to continue.'
  };

  constructor(private router: Router,
              private loginService: LoginService,
              private _location: Location,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.loginForm = {
      username: '',
      password: ''
    };

    this.registerForm = {
      email: '',
      name: ''
    };

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const mcode = params['mcode'];
      if (mcode) {
        // console.log('Message Code!!', mcode);
        super.addSuccessMessage(this.messageMap[mcode], this.messages);
      }
    });
  }

  login(model: any, isValid: Boolean) {

    // console.log(model, isValid);
    if (isValid) {
      this.loading = true;
      this.loginService.login(model.username, model.password)
        .subscribe((response) => {
          const token = response.token;
          if (token) {
            this.loginService.saveTokenLocally(response.email, token, model.username, response.sid);
            this.router.navigate(['home']);
          } else {
            super.addErrorMessage('Username or password is incorrect', this.messages);
          }
        }, (error) => {
          super.addErrorMessage(error, this.messages);
        });
    }
  }

  logout() {
    this.loginService.logout();
  }

  register(model: any, isValid: Boolean) {
    console.log(model, isValid);
    if (isValid) {
      this.loginService.register(model.email2, model.name2).subscribe((response) => {
        console.log(response);
        this.router.navigate(['login'], {queryParams: {mcode: 3}});
      }, (err) => {
        this.error = err.json().message;
        console.log(err);
      });
    }
  }

}
