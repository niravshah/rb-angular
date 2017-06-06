import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PostsService} from '../posts.service';

@Component({
  selector: 'app-fundraiser-details',
  templateUrl: './fundraiser-detail.component.html',
  styleUrls: ['./fundraiser-detail.component.css']
})
export class FundraiserDetailsComponent implements OnInit, OnDestroy {

  private sub: any;
  private post: string[];

  constructor(private service: PostsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.service.getFundraiserById(id).subscribe(post => this.post = post);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
