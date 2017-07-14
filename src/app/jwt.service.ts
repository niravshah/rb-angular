import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

@Injectable()
export class JwtService {

  constructor() {
  }

  getJwtHeader(jwt) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + jwt);
    return headers;
  }

}
