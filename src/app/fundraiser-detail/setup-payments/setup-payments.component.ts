import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostsService} from '../../posts.service';
import {Router} from '@angular/router';
import {isUndefined} from 'util';
import {StripeService} from "../../stripe.service";

@Component({
  selector: 'app-edit-bank',
  templateUrl: './setup-payments.component.html',
  styleUrls: ['./setup-payments.component.css']
})
export class SetupPaymentsComponent implements OnInit {
  post;
  postId;
  stripeLink;

  constructor(public _location: Location, public postService: PostsService, private router: Router, private stripeService: StripeService) {
  }

  ngOnInit() {
    this.post = this.postService.getCurrentPost();
    this.postId = this.postService.getCurrentPostId();
    if (isUndefined(this.post)) {
      this.router.navigate(['home']);
    } else {
      console.log(this.post);
      this.stripeLink = this.stripeService.getOAuthUrl(this.post);
    }
  }

  saveBankDetails(model: any, isValid: boolean) {
    if (isValid) {
      console.log('Valid Bank Form Submit', model, isValid);

    } else {
      console.log('Invalid Bank Form Submit', model, isValid);
    }
  }

  closeBtn(command) {
    // console.log('Close Button Clicked!', command);
    if (command === 'close') {
      this._location.back();
    }
  }


}
