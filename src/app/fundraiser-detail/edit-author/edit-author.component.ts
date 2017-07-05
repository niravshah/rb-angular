import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostsService} from '../../posts.service';
import {Router} from '@angular/router';
import {isUndefined} from 'util';
import {LoginService} from '../../login/login.service';
import {ToastyService} from 'ng2-toasty';
import {S3UploadService} from '../../s3-upload.service';

declare var $: any;


@Component({
  selector: 'app-edit-me',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  post;
  postId;
  target;
  url;

  constructor(public _location: Location,
              public postService: PostsService,
              private router: Router,
              private loginService: LoginService,
              private toastyService: ToastyService,
              private s3Service: S3UploadService) {
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
      const files = $('#photoBrowse')[0].files;
      if (files.length) {
        const file = files[0];
        const fileName = file.name;
        this.s3Service.uploadPhoto(file, fileName).subscribe(resp => {
            model.avatar = resp.Location;
            this.patchAuthor(model);
          },
          err => {
            console.log('Error uploading Author avatar image', err);
            this.patchAuthor(model);
          }
        );
      }else{
        this.patchAuthor(model);
      }
    }
  }

  patchAuthor(model) {
    this
      .postService
      .patchAuthorDetails(this.postId, model, this.loginService.loggedInJwt())
      .subscribe(resp => {
        this.toastyService.default('Author Details Saved');
        console.log('Author Details Patched', resp);
        this._location.back();
      }, err => {
        this.toastyService.default('Can not save author details. Please try again later.');
        console.log('Error patching Author Details', err);
      });
  }

  closeBtn(command) {
    // console.log('Close Button Clicked!', command);
    if (command === 'close') {
      this._location.back();
    }
  }

  previewImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event2) => {
        this.target = event2.target;
        this.url = this.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


}
