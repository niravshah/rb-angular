import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PostsService} from '../posts.service';
import {LoginService} from '../login/login.service';
import {Meta} from "@angular/platform-browser";
import {AnalyticsService} from "../ga.service";

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
              private authService: LoginService,
              private meta: Meta,
              private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    $(document).trigger('initializeBootsnav');
    // console.log('Logged In >> ', this.authService.loggedIn());
    this.sub = this.route.params.subscribe(params => {

      if (this.authService.loggedIn()) {
        this.analyticsService.setUser(this.authService.loggedInUserSid());
      }


      const id = params['id'];
      this.service.getFundraiserById(id).subscribe(post => {
        this.post = post;
        this.service.setCurrentPost(post);
        this.postStatus = this.post.status;

        this.meta.addTags([
          {property: 'og:url', content: 'https://www.raisebetter.uk/fundraisers/' + this.post.sid},
          {property: 'og:title', content: this.post.title},
          {property: 'og:description', content: this.post.subTitle},
          {property: 'og:image', content: this.post.image},
          {property: 'fb:app_id', content: '107000206632214'}
        ]);

      });
    });

  }

  ngAfterViewInit(): void {
    this.qsub = this.route.queryParams.subscribe(qparams => {
      const created = qparams['created'];
      if (created) {
      }

      const g = qparams['g'];
      if (g) {
        console.log('Setting User ID to: ' +  g) ;
        this.analyticsService.setUser(g);
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
