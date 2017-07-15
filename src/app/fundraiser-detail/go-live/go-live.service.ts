import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {JwtService} from '../../jwt.service';

@Injectable()
export class GoLiveService extends JwtService {

  constructor(private _http: Http) {
    super();
  }

  goLive(sid, jwt) {

    const url = '/api/posts/' + sid + '/status';
    return this._http.patch(url, {status: 'live'}, {headers: super.getJwtHeader(jwt)}).map((res: Response) => {
      return res.json();
    });
  }
}
