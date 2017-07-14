import {Component, OnInit} from '@angular/core';
import {FirstLoginService} from './first-login.service';
import {MessageDisplayComponent} from '../message-display/message-display.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent extends MessageDisplayComponent implements OnInit {

  loginForm: { username: string; password: string; code: string; };
  messages = [];

  constructor(private _service: FirstLoginService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.loginForm = {
      username: '',
      password: '',
      code: ''
    };
  }

  login(model, valid) {
    console.log('First Login Form', model, valid);

    this._service.firstLoginVerification(model.username, model.password, model.code).subscribe(res => {

      const token = res.token;
      if (token) {
        const email = res.email;
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify({
          email: email,
          username: model.username,
          token: token,
          sid: res.sid
        }));
        this.router.navigate(['reset-password']);
      } else {
        super.addSuccessMessage('Username or password is incorrect', this.messages);
      }


      super.addSuccessMessage('First Login Success', this.messages);
    }, err => {
      super.addErrorMessage(err, this.messages);
    });

  }

}
