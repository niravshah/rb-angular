import {Component, OnInit} from '@angular/core';
import {FacebookService, LoginResponse, UIParams, UIResponse} from 'ngx-facebook';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {


  constructor(private fb: FacebookService) {
  }

  ngOnInit() {

    this.fb.init({
      appId: '107000206632214',
      version: 'v2.10'
    }).then(resp => {
      console.log('FB Loaded!', resp);
    }).catch(e => {
      console.log('Error loading FB !!', e);
    });

  }

  share() {

    const options: UIParams = {
      method: 'share',
      href: 'https://www.raisebetter.uk/fundraisers/undefined'
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
