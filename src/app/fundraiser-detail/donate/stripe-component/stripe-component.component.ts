import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StripeComponentService} from './stripe-component.service';
import {LoginService} from '../../../login/login.service';
import {isUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../../../posts.service';
import {StripeService} from '../../../stripe.service';
import {AnalyticsService} from "../../../ga.service";
declare var $: any;

@Component({
  selector: 'app-stripe-component',
  templateUrl: './stripe-component.component.html',
  styleUrls: ['./stripe-component.component.css']
})
export class StripeComponentComponent implements OnInit, AfterViewInit {

  paymentForm;
  post;

  constructor(private service: StripeComponentService,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private postService: PostsService,
              private stripeService: StripeService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.paymentForm = {amount: '50', name: 'Nirav Shah', email: 'nshah@email.com', message: 'Good Luck!'};

    this.post = this.postService.getCurrentPost();
    if (isUndefined(this.post)) {
      this.router.navigate(['home']);
    }

  }

  ngAfterViewInit() {

    const _this = this;
    const card = this.stripeService.getStripeCardElement();
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

      _this.stripeService.createToken(card, function (result) {
        if (result.error) {
          _this.addCardError(result.error.messages);
          _this.toggleOverlay();
        } else {
          console.log('Success Token:', result.token);
          _this.service.chargeToken(result.token, _this.paymentForm, _this.post.sid, _this.loginService.loggedInJwt()).subscribe(res => {
            console.log('Server Success:', res);
            _this.analyticsService.emitEvent(_this.post.sid, 'stripe-charge-success', 'rb', 5);
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

  addCardError(message) {
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = message;

  }

  toggleOverlay() {
    $('#overlay').toggle();
  }

}
