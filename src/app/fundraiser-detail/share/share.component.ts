import {Component, OnInit} from '@angular/core';
import {FacebookService, LoginResponse, UIParams, UIResponse} from 'ngx-facebook';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isUndefined} from "util";
import {PostsService} from "../../posts.service";


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  post;
  thankYouMessage;
  shareMessage = 'Every share counts';
  messageMap = {
    1: 'Your donation has been successful.'
  };

  constructor(private router: Router,
              private fb: FacebookService,
              private activatedRoute: ActivatedRoute,
              private postService: PostsService) {
  }

  ngOnInit() {


    this.post = this.postService.getCurrentPost();
    if (!isUndefined(this.post)) {
      this.shareMessage = 'Help ' + this.post.author.fname + ' Raise Better.';
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const mcode = params['mcode'];
      if (mcode) {
        this.thankYouMessage = this.messageMap[mcode];
      }
    });

    this.fb.init({
      appId: '107000206632214',
      version: 'v2.10'
    }).then(resp => {
      // console.log('FB Loaded!', resp);
    }).catch(e => {
      console.log('Error loading FB !!', e);
    });

  }

  share() {

    const options: UIParams = {
      method: 'share',
      href: 'https://www.raisebetter.uk',
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
