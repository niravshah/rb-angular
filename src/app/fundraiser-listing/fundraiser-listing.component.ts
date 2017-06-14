import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Post} from "../post.model";

@Component({
  selector: 'app-fundraiser-listing',
  templateUrl: './fundraiser-listing.component.html',
  styleUrls: ['./fundraiser-listing.component.css']
})
export class FundraiseListingComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostsService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
        console.log(this.posts.length);
        this.cdRef.detectChanges();
      });
  };

}
