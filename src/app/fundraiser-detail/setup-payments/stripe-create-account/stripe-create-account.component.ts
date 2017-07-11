import {Component, OnInit} from '@angular/core';
import {PhoneVerifyService} from '../../../phone-verify.service';
import {LoginService} from '../../../login/login.service';
import {StripeService} from '../../../stripe.service';

declare var $: any

@Component({
  selector: 'app-stripe-create-account',
  templateUrl: './stripe-create-account.component.html',
  styleUrls: ['./stripe-create-account.component.css']
})
export class StripeCreateAccountComponent implements OnInit {


  model: {
    number: string, code: string, sortCode: string, accountNumber: string,
    firstName: string, lastName: string, dateOfBirth: string,
    addressLine1: string, addressLine2: string, postCode: string
  } = {
    number: '', code: '',
    sortCode: '', accountNumber: '',
    firstName: '', lastName: '', dateOfBirth: '',
    addressLine1: '', addressLine2: '', postCode: ''
  };

  messages: { type: string, text: string }[] = [];

  constructor(private phoneVerifyService: PhoneVerifyService, private loginService: LoginService, private stripeService: StripeService) {
  }

  ngOnInit() {
    this.model = {
      number: '07596162765',
      code: 'TEMP_TEXT',
      sortCode: 'TEMP_TEXT',
      accountNumber: 'TEMP_TEXT',
      firstName: 'TEMP_TEXT',
      lastName: 'TEMP_TEXT',
      dateOfBirth: 'TEMP_TEXT',
      addressLine1: 'TEMP_TEXT',
      addressLine2: 'TEMP_TEXT',
      postCode: 'TEMP_TEXT'
    };
  }

  nextTab() {
    $('.nav-tabs > .active').next('li').find('a').trigger('click');
  }

  previousTab() {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
  }

  requestCode(model, valid) {
    // console.log('requestCode', model, valid);
    if (valid) {
      this.phoneVerifyService.requestCode(model.number).subscribe(res => {
        $('#numberSection').addClass('hidden');
        $('#codeSection').removeClass('hidden');
      }, err => {
        // console.log('Error', err);
        this.addErrorMessage(err, null);
      });
    }
  }


  verifyCode(model, valid) {
    // console.log('verifyNumber', this.model, model, valid);
    if (valid) {
      this.phoneVerifyService.verifyCode(model.code, this.model.number, this.loginService.loggedInJwt()).subscribe(res => {
        // console.log('Success', res);
        this.addSuccessMessage(res.message);
        $('#codeSection').addClass('hidden');
        $('#nextBtnSection').removeClass('hidden');
      }, err => {
        // console.log('Error', err);
        this.addErrorMessage(err, null);
      });
    }
  }

  createStripeAccount(valid, model) {
    console.log('createStripeAccount', valid, model);
    if (valid) {
      this.stripeService.createNewAccount(this.model, this.loginService.loggedInJwt()).subscribe(res => {
        this.addSuccessMessage(res.message);
      }, err => {
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

  resetMessages() {
    this.messages = [];
  }
}

