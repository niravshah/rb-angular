import {Component, OnInit} from '@angular/core';
import {MessageDisplayComponent} from '../message-display/message-display.component';
import {Router} from '@angular/router';
import {ResetPasswordService} from './reset-password.service';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends MessageDisplayComponent implements OnInit {

  form: { password: string; repeatPassword: string; };
  messages = [];

  constructor(private _service: ResetPasswordService, private router: Router, private loginService: LoginService) {
    super();
  }

  ngOnInit() {
    this.form = {
      password: '',
      repeatPassword: ''
    };
  }

  reset(model, valid) {
    // console.log('ResetPasswordComponent rest(): ', model, valid);
    if (valid) {
      this._service.resetPassword(this.form.password, this.form.repeatPassword, this.loginService.loggedInJwt()).subscribe(
        (response) => {
          super.addSuccessMessage(response, this.messages);
        },
        (error) => {
          super.addErrorMessage(error, this.messages);
        }
      );
    }
  }

}
