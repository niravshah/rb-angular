import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostsService} from '../../posts.service';
import {Router} from '@angular/router';
import {isUndefined} from 'util';
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-edit-me',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  post;
  postId;

  constructor(public _location: Location,
              public postService: PostsService,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.post = this.postService.getCurrentPost();
    this.postId = this.postService.getCurrentPostId();
    if (isUndefined(this.post)) {
      this.router.navigate(['home']);
    }
  }

  saveAuthorDetails(model: any, isValid: boolean) {
    if (isValid) {
      // console.log('Valid Author Form Submit', model, isValid);
      this
        .postService
        .patchAuthorDetails(this.postId, model, this.loginService.loggedInJwt())
        .subscribe(resp => {
          console.log('Author Details Patched', resp);
          this._location.back();
        }, err => {
          console.log('Error patching Author Details', err);
        });
    } else {
      console.log('Invalid Author Form Submit', model, isValid);
    }
  }

  closeBtn(command) {
    // console.log('Close Button Clicked!', command);
    if (command === 'close') {
      this._location.back();
    }
  }

}
