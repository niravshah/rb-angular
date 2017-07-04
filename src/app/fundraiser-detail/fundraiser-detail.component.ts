import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../posts.service';
import {LoginService} from '../login/login.service';
import {FacebookService, LoginResponse, UIParams, UIResponse} from 'ngx-facebook';
import {isUndefined} from "util";

declare var $: any;
declare var FB: any;


@Component({
  selector: 'app-fundraiser-details',
  templateUrl: './fundraiser-detail.component.html',

  styleUrls: ['./fundraiser-detail.component.css']
})
export class FundraiserDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  private sub: any;
  private qsub: any;
  public post;

  constructor(private service: PostsService,
              private route: ActivatedRoute,
              private authService: LoginService,
              private fb: FacebookService) {

    fb.init({
      appId: '1927971220769787',
      version: 'v2.9'
    }).then(resp => {
      console.log('FB Loaded!', resp);
    }).catch(e => {
      console.log('Error loading FB !!', e);
    });


  }

  ngOnInit() {
    $(document).trigger('initializeBootsnav');
    // console.log('Logged In >> ', this.authService.loggedIn());
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getFundraiserById(id).subscribe(post => {
        this.post = post;
        this.service.setCurrentPost(post);
      });
    });

  }

  ngAfterViewInit(): void {
    this.qsub = this.route.queryParams.subscribe(qparams => {
      const created = qparams['created'];
      if (created) {
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.qsub.unsubscribe();
  }


  openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log('Got token', token);
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });
  }

  share() {

    const options: UIParams = {
      method: 'share',
      href: 'https://github.com/zyramedia/ng2-facebook-sdk'
    };

    this.fb.ui(options)
      .then((res: UIResponse) => {
        console.log('Got the users profile', res);
      })
      .catch(this.handleError);
  }

  login() {
    this.fb.login()
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
      })
      .catch(this.handleError);
  }


  private handleError(error) {
    console.error('Error processing action', error);
  }
}
