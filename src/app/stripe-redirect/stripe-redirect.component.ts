import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StripeService} from '../stripe.service';
import {LoginService} from "../login/login.service";

declare var $: any;

@Component({
  selector: 'app-stripe-redirect',
  templateUrl: './stripe-redirect.component.html',
  styleUrls: ['./stripe-redirect.component.css']
})
export class StripeRedirectComponent implements OnInit {

  messages: { type: string, text: string }[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private stripeService: StripeService,
              private router: Router) {
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
        const message = 'Access Granted by Stripe: ' + scope;
        this.addSuccessMessage('Thank You. Your request to Stripe was successful.');
        this.addSuccessMessage(message);
        this.stripeService.getAccountId(code, state, scope, this.loginService.loggedInJwt()).subscribe(resp => {
          console.log('Response Received', resp);
          this.addSuccessMessage('Response Received' + resp);
          this.router.navigate(['home']);
        }, error => {
          console.log('Error Received', error);
          this.addErrorMessage('Could not connect your Stripe Account.');
          this.addErrorMessage('Message from our Server: ' + error.statusText);
          this.addErrorMessage('Message from our Server: ' + error._body);
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
