import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StripeComponentService} from './stripe-component.service';
import {LoginService} from '../../../login/login.service';
import {isUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from "../../../posts.service";
declare var Stripe, $: any;

@Component({
  selector: 'app-stripe-component',
  templateUrl: './stripe-component.component.html',
  styleUrls: ['./stripe-component.component.css']
})
export class StripeComponentComponent implements OnInit, AfterViewInit {

  paymentForm;
  stripe;
  post;

  constructor(private service: StripeComponentService,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private postService: PostsService) {
  }

  ngOnInit() {
    this.paymentForm = {amount: '50', name: 'Nirav Shah', email: 'nshah@email.com', message: 'Good Luck!'};

    this.post = this.postService.getCurrentPost();
    if (isUndefined(this.post)) {
      this.router.navigate(['home']);
    }

    try {
      this.stripe = Stripe('pk_test_rsKIu2V1fmgDKrpy2yirvZxQ');
    } catch (ex) {
      if (ex instanceof ReferenceError) {
        console.log('Stripe is not loaded!!');
        $('#donateWithStripeBtn').hide();
        this.addCardError('Could not connect to Stripe. Cant process payments at this time.');
      }
    }

  }

  ngAfterViewInit() {

    if (!isUndefined(this.stripe)) {
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

      const _this = this;
      const card = elements.create('card', {style: style});
      card.mount('#card-element');


      card.addEventListener('change', function (event) {
        if (event.error) {
          _this.addCardError(event.error.messages);
        } else {
          _this.addCardError('');
        }
      });


      const form = document.getElementById('payment-form');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        _this.toggleOverlay();
        _this.stripe.createToken(card).then(function (result) {
          if (result.error) {
            _this.addCardError(result.error.messages);
            _this.toggleOverlay();
          } else {
            console.log('Success Token:', result.token);
            _this.service.chargeToken(result.token, _this.paymentForm, _this.post.sid, _this.loginService.loggedInJwt()).subscribe(res => {
              console.log('Server Success:', res);
              _this.toggleOverlay();
              _this.router.navigate(['../share'], {relativeTo: _this.route, queryParams: {mcode: 1}});
            }, err => {
              console.log('Error:', err);
              _this.toggleOverlay();
            });
          }
        });
      });
    }
  }

  addCardError(message) {
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = message;

  }

  toggleOverlay() {
    $('#overlay').toggle();
  }

}
