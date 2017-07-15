import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../posts.service';
import {GoLiveService} from "./go-live.service";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-go-live',
  templateUrl: './go-live.component.html',
  styleUrls: ['./go-live.component.css']
})
export class GoLiveComponent implements OnInit {

  post;
  postUrl;

  constructor(public postService: PostsService, private _service: GoLiveService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.post = this.postService.getCurrentPost();

    this._service.goLive(this.post.sid, this.loginService.loggedInJwt()).subscribe((resp) => {
      console.log('GoLiveComponent goLive() Success: ', resp);
    }, (err) => {
      console.log('GoLiveComponent goLive() Error: ', err);
    });

    this.postUrl = '/fundraisers/' + this.post.sid;
  }

}
