import {Component, OnInit} from '@angular/core';
import {FirstLoginService} from './first-login.service';
import {MessageDisplayComponent} from '../message-display/message-display.component';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent extends MessageDisplayComponent implements OnInit {

  loginForm: { username: string; password: string; code: string; };
  messages = [];

  constructor(private _service: FirstLoginService) {
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
      super.addSuccessMessage('First Login Success', this.messages);
    }, err => {
      super.addSuccessMessage(err.message, this.messages);
    });

  }

}
