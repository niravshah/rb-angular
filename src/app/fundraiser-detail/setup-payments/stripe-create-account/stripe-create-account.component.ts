import {Component, OnInit} from '@angular/core';
import {PhoneVerifyService} from '../../../phone-verify.service';
import {LoginService} from '../../../login/login.service';

declare var $: any

@Component({
  selector: 'app-stripe-create-account',
  templateUrl: './stripe-create-account.component.html',
  styleUrls: ['./stripe-create-account.component.css']
})
export class StripeCreateAccountComponent implements OnInit {


  model: { number: string, code: string } = {number: '', code: ''};
  messages: { type: string, text: string }[] = [];

  constructor(private phoneVerifyService: PhoneVerifyService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.model = {number: '07596162765', code: ''};
  }

  nextTab() {
    $('.nav-tabs > .active').next('li').find('a').trigger('click');
  }

  previousTab() {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
  }

  requestCode(model, valid) {
    console.log('requestCode', model, valid);
    if (valid) {
      this.phoneVerifyService.requestCode(model.number).subscribe(res => {
        $('#numberSection').addClass('hidden');
        $('#codeSection').removeClass('hidden');
      }, err => {
        console.log('Error', err);
        this.addErrorMessage(err, null);
      });
    }
  }


  verifyCode(model, valid) {
    console.log('verifyNumber', this.model, model, valid);
    if (valid) {
      this.phoneVerifyService.verifyCode(model.code, this.model.number, this.loginService.loggedInJwt()).subscribe(res => {
        console.log('Success', res);
        this.addSuccessMessage(res.message);
      }, err => {
        console.log('Error', err);
        this.addErrorMessage(err, null);
      });
    }
  }

  addSuccessMessage(res) {
      this.messages.push({type: 'success', text: res});
  }

  addErrorMessage(err, message) {
    if (err) {
      try {
        this.messages.push({type: 'error', text: JSON.parse(err._body).message});
      } catch (ex) {
        this.messages.push({type: 'error', text: err._body});
      }
    } else {
      this.messages.push({type: 'error', text: message});
    }

  }
}

