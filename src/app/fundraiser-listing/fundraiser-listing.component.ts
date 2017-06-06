import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-fundraiser-listing',
  templateUrl: './fundraiser-listing.component.html',
  styleUrls: ['./fundraiser-listing.component.css']
})
export class FundraiseListingComponent implements OnInit {

  posts: any = [];

  constructor(private postService: PostsService) {
  }

  ngOnInit() {

    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  };

}
