import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostsService} from "../../posts.service";

declare var $: any;
declare var AWS: any;

@Component({
  selector: 'app-edit-fundraiser',
  templateUrl: './edit-fundraiser.component.html',
  styleUrls: ['./edit-fundraiser.component.css']
})
export class EditFundraiserComponent implements OnInit, AfterViewInit {
  target;
  data;
  s3;
  isCompleted = false;
  url;


  constructor(public _location: Location, public service: PostsService) {
    this.data = {
      email: ''
    };
  }

  ngOnInit() {
    console.log('Current Post in Edit Post: ', this.service.getCurrentPost(), this.service.getCurrentPostId());
  }

  ngAfterViewInit(): void {

    const albumBucketName = 'raisebetter';
    const bucketRegion = 'eu-west-2';
    const IdentityPoolId = 'eu-west-2:07e95cee-5f85-4371-bdeb-d15b1090b4e0';

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    this.s3 = new AWS.S3({
      params: {Bucket: albumBucketName}
    });

    this.s3.listObjects({Delimiter: '/'}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

  }

  onStep1Next($event) {
    console.log('Step 1 Next');
  }

  onStep2Next($event) {
    console.log('Step 2 Next');
  }

  onStep3Next($event) {
    console.log('Step 3 Next');
    this.isCompleted = true;
  }

  onComplete() {
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
