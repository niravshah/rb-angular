import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../posts.service';
import {StripeService} from '../../stripe.service';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-stripe-connect-status',
  templateUrl: './stripe-connect-status.component.html',
  styleUrls: ['./stripe-connect-status.component.css']
})
export class StripeConnectStatusComponent implements OnInit {

  post;
  connected;
  chargesEnabled;
  detailsSubmitted;

  constructor(private postService: PostsService, private stripeService: StripeService, private authService: LoginService) {
  }

  ngOnInit() {
    this.post = this.postService.getCurrentPost();
    if (this.post.account) {
      this.connected = true;
      this.stripeService.getConnectAccountStatus(this.post.account, this.authService.loggedInJwt()).subscribe(resp => {
        this.chargesEnabled = resp.charges_enabled;
        this.detailsSubmitted = resp.details_submitted;
      }, err => {
      });
    } else {
      this.connected = false;
    }
  }

}
