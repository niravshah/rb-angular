import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {StripeService} from '../stripe.service';

declare var $: any;

@Component({
  selector: 'app-stripe-redirect',
  templateUrl: './stripe-redirect.component.html',
  styleUrls: ['./stripe-redirect.component.css']
})
export class StripeRedirectComponent implements OnInit {

  messages: { type: string, text: string }[] = [];

  constructor(private activatedRoute: ActivatedRoute, private stripeService: StripeService) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const err = $(params).attr('error');
      if (typeof err !== typeof undefined && err !== false) {
        this.addErrorMessage('Could not connect your Stripe Account.');
        this.addErrorMessage('Message from Stripe: ' + $(params).attr('error_description'));
      } else {
        const scope = $(params).attr('scope');
        const state = $(params).attr('state');
        const code = $(params).attr('code');
        const message = 'Scope Granted ' + scope + state + code;
        this.addSuccessMessage(message);
        this.stripeService.getAccountId(code, state, scope).subscribe(resp => {
          console.log('Response Received', resp);
          this.addSuccessMessage('Response Received' + resp);
        }, error => {
          console.log('Error Received', error);
          this.addErrorMessage('Error Received' + error);
        });
      }
    });

  }

  addSuccessMessage(message) {
    this.messages.push({type: 'success', text: message});
  }

  addErrorMessage(message) {
    this.messages.push({type: 'error', text: message});
  }

}
