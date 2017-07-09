import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostsService} from '../../posts.service';
import {Router} from '@angular/router';
import {isUndefined} from 'util';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './setup-payments.component.html',
  styleUrls: ['./setup-payments.component.css']
})
export class SetupPaymentsComponent implements OnInit {
  post;
  postId;

  constructor(public _location: Location, public postService: PostsService, private router: Router) {
  }

  ngOnInit() {
    this.post = this.postService.getCurrentPost();
    this.postId = this.postService.getCurrentPostId();
    if (isUndefined(this.post)) {
      this.router.navigate(['home']);
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
