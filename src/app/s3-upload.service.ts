import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {isUndefined} from 'util';

declare var AWS: any;

@Injectable()
export class S3UploadService {

  s3;

  constructor() {
  }

  s3Init() {
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

  uploadPhoto(photoFile, photoFileName) {
    const _this = this;
    if (isUndefined(_this.s3)) {
      _this.s3Init();
    }
    return Observable.create(function (obs) {
      _this.s3.upload({
        Key: photoFileName,
        Body: photoFile
      }, function (err, data) {
        if (err) {
          console.log('Error', err);
          return obs.error(err);
        } else {
          console.log('Success', data);
          return obs.next(data);
        }
      });
    });
  }

}
