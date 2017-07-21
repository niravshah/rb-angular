import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../posts.service';
import {LoginService} from '../login/login.service';

declare var $: any;

@Component({
  selector: 'app-fundraiser-details',
  templateUrl: './fundraiser-detail.component.html',

  styleUrls: ['./fundraiser-detail.component.css']
})
export class FundraiserDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  private sub: any;
  private qsub: any;
  public post;
  public postStatus = 'draft';

  constructor(private service: PostsService,
              private route: ActivatedRoute,
              private authService: LoginService) {

  }

  ngOnInit() {
    $(document).trigger('initializeBootsnav');
    // console.log('Logged In >> ', this.authService.loggedIn());
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getFundraiserById(id).subscribe(post => {
        this.post = post;
        this.service.setCurrentPost(post);
        this.postStatus = this.post.status;
      });
    });

  }

  ngAfterViewInit(): void {
    this.qsub = this.route.queryParams.subscribe(qparams => {
      const created = qparams['created'];
      if (created) {
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.qsub.unsubscribe();
  }

  isAuthorLogin() {

    if (this.authService.loggedIn()) {
      const user = this.authService.loggedInUser();
      const uname = JSON.parse(user).username;
      return uname === this.post.author.email;
    }
    return false;
  }

  isPostLive() {
    return this.postStatus === 'live';
  }

  scrollTop() {
    $('html, body').animate({
      scrollTop: 200
    }, 700);
  }
}
