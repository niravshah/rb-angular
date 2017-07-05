import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostsService} from '../../posts.service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';
import {ToastyService} from 'ng2-toasty';
import {S3UploadService} from '../../s3-upload.service';

declare var $: any;


@Component({
  selector: 'app-edit-fundraiser',
  templateUrl: './edit-fundraiser.component.html',
  styleUrls: ['./edit-fundraiser.component.css']
})
export class EditFundraiserComponent implements OnInit, AfterViewInit {
  target;
  url;
  post;
  postId;

  constructor(public _location: Location,
              public postService: PostsService,
              private router: Router,
              private loginService: LoginService,
              private toastyService: ToastyService,
              private s3Service: S3UploadService) {
  }

  ngOnInit() {
    // console.log('Current Post in Edit Post: ', this.postService.getCurrentPost(), this.postService.getCurrentPostId());
    this.post = this.postService.getCurrentPost();
    this.postId = this.postService.getCurrentPostId();
    if (isUndefined(this.post)) {
      this.router.navigate(['home']);
    }
  }

  ngAfterViewInit(): void {
  }

  savePost(model: any, isValid: boolean) {
    if (isValid) {
      console.log('Valid Post Form Submit', model, isValid);
      const files = $('#photoBrowse')[0].files;
      if (files.length) {
        const file = files[0];
        const fileName = file.name;

        this.s3Service.uploadPhoto(file, fileName).subscribe(resp => {
          console.log('Success', resp);
          model.image = resp.Location;
          this.patchPost(model);
        }, err => {
          console.log('Error', err);
          this.patchPost(model);
        });

      } else {
        this.patchPost(model);
      }

    }
  }

  patchPost(model) {
    this.postService.patchPost(this.postId, model, this.loginService.loggedInJwt()).subscribe(res => {
      // console.log('Post saved successfully.', res);
      this.toastyService.default('Changes Saved');
      const url = '/fundraisers/' + res.post.sid;
      this.router.navigateByUrl(url);
    }, err => {
      this.toastyService.default('Error saving Changes. Please try again later.');
      console.log('Error saving Post.', err);
    });
  }

  closeBtn(command) {
    console.log('Close Button Clicked!', command);
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
