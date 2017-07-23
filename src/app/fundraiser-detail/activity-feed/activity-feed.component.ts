import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../posts.service';

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.css']
})
export class ActivityFeedComponent implements OnInit {

  messages = [];
  postId;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.postId = this.postService.getCurrentPostId();
    this.postService.getPostActivity(this.postId).subscribe(resp => {
      // console.log('Activities Response:', resp);
      this.messages = resp.activities;
    }, err => {
      console.log('Activities Error:', err);
    });

  }

}
