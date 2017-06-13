import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fundraiser} from './../fundraiser';
declare var $: any;

import {PostsService} from '../posts.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {LoginService} from "../login/login.service";


@Component({
  selector: 'app-fundraiser-details',
  templateUrl: './fundraiser-detail.component.html',
  styleUrls: ['./fundraiser-detail.component.css']
})
export class FundraiserDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  private sub: any;
  private qsub: any;
  private post: Fundraiser;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private service: PostsService,
              private route: ActivatedRoute,
              private notsService: NotificationsService,
              private authService: LoginService) {
  }

  ngOnInit() {
    $(document).trigger('initializeBootsnav');
    console.log('Logged In >> ', this.authService.loggedIn());
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getFundraiserById(id).subscribe(post => {
        this.post = post;
        this.notsService.info('Post Loaded', 'Loaded');
      });
    });

  }

  ngAfterViewInit(): void {
    this.qsub = this.route.queryParams.subscribe(qparams => {
      const created = qparams['created'];
      if (created) {
        this.notsService.success('New Post', 'Please Login');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.qsub.unsubscribe();
  }



}
