import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StripeComponentService} from './stripe-component.service';
import {LoginService} from '../../../login/login.service';
declare var Stripe: any;

@Component({
  selector: 'app-stripe-component',
  templateUrl: './stripe-component.component.html',
  styleUrls: ['./stripe-component.component.css']
})
export class StripeComponentComponent implements OnInit, AfterViewInit {

  overlayForm;
  stripe = Stripe('pk_test_rsKIu2V1fmgDKrpy2yirvZxQ');
  amount = 0;

  constructor(private service: StripeComponentService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.overlayForm = {amount: '', name: ''};
  }

  ngAfterViewInit() {

    // Create an instance of Elements
    const elements = this.stripe.elements();

    const style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element
    const card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission
    const _this = this;

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      _this.stripe.createToken(card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          document.getElementById('overlay').style.display = 'block';

          console.log('Success Token:', result.token);
          // Send the token to your server
          // stripeTokenHandler(result.token);
          _this.service.chargeToken(result.token, _this.amount, _this.loginService.loggedInJwt()).subscribe(res => {
            document.getElementById('overlay').style.display = 'none';
          }, err => {
            document.getElementById('overlay').style.display = 'none';
          });
        }
      });
    });
  }


}
