import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostsService} from '../../posts.service';
import {isUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../login/login.service';

declare var $: any;
declare var AWS: any;

@Component({
  selector: 'app-edit-fundraiser',
  templateUrl: './edit-fundraiser.component.html',
  styleUrls: ['./edit-fundraiser.component.css']
})
export class EditFundraiserComponent implements OnInit, AfterViewInit {
  target;
  s3;
  url;
  post;
  postId;

  constructor(public _location: Location,
              public service: PostsService,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    // console.log('Current Post in Edit Post: ', this.postService.getCurrentPost(), this.postService.getCurrentPostId());
    this.post = this.service.getCurrentPost();
    this.postId = this.service.getCurrentPostId();
    if (isUndefined(this.post)) {
      this.router.navigate(['home']);
    }
  }

  ngAfterViewInit(): void {

    const albumBucketName = 'raisebetter';
    const bucketRegion = 'eu-west-2';
    const IdentityPoolId = 'eu-west-2:07e95cee-5f85-4371-bdeb-d15b1090b4e0';

    try {
      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      });

      this.s3 = new AWS.S3({
        params: {Bucket: albumBucketName}
      });
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.log('AWS is not loaded!!');
      }
    }
  }

  savePost(model: any, isValid: boolean) {
    if (isValid) {
      console.log('Valid Post Form Submit', model, isValid);
      this.service.patchPost(this.postId, model, this.loginService.loggedInJwt()).subscribe(res => {
        console.log('Post saved successfully.', res);
        const url = '/fundraisers/' + res.post.sid;
        this.router.navigateByUrl(url);
      }, err => {
        console.log('Error saving Post.', err);
      });
    }
  }


  closeBtn(command) {
    console.log('Close Button Clicked!', command);
    if (command === 'close') {
      this._location.back();
    }
  }

  addPhoto() {

    const files = $('#photoupload')[0].files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    const file = files[0];
    const fileName = file.name;
    this.s3.upload({
      Key: fileName,
      Body: file
    }, function (err, data) {
      if (err) {
        console.log('Error', err);
      }
      console.log('Success', data);
    });
  }

  readUrl(event) {
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
