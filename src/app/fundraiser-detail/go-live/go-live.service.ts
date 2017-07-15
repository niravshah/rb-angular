import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {JwtService} from '../../jwt.service';

@Injectable()
export class GoLiveService extends JwtService {

  constructor(private _http: Http) {
    super();
  }

  goLive(sid, jwt) {

    const url = '/api/posts/' + sid + '/go-live';
    return this._http.post(url, {}, {headers: super.getJwtHeader(jwt)}).map((res: Response) => {
      return res.json();
    });
  }
}
