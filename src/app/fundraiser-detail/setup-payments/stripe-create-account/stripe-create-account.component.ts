import {Component, OnInit} from '@angular/core';
import {PhoneVerifyService} from '../../../phone-verify.service';

declare var $: any

@Component({
  selector: 'app-stripe-create-account',
  templateUrl: './stripe-create-account.component.html',
  styleUrls: ['./stripe-create-account.component.css']
})
export class StripeCreateAccountComponent implements OnInit {


  model: { number: string, code: string } = {number: '', code: ''};
  messages: { type: string, text: string }[] = [];

  constructor(private phoneVerifyService: PhoneVerifyService) {
  }

  ngOnInit() {
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
        this.addErrorMessage('Server Error : ' + err.status + ' ' + err.statusText);
        console.log('Error', err);
      });
    }
  }


  verifyCode(model, valid) {
    console.log('verifyNumber', this.model, model, valid);
    if (valid) {
      this.phoneVerifyService.verifyCode(model, this.model).subscribe(res => {
      }, err => {
        console.log('Error', err);
      });
    }
  }

  addSuccessMessage(message) {
    this.messages.push({type: 'success', text: message});
  }

  addErrorMessage(message) {
    this.messages.push({type: 'error', text: message});
  }
}

