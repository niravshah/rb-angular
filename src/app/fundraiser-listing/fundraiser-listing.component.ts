import {Component, NgZone, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-fundraiser-listing',
  templateUrl: './fundraiser-listing.component.html',
  styleUrls: ['./fundraiser-listing.component.css']
})
export class FundraiseListingComponent implements OnInit {

  posts: Post[];
  filterValue: string;

  constructor(private postService: PostsService, private zone: NgZone) {
  }

  ngOnInit() {
    this.zone.run(() => {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
        console.log(this.posts.length);
      });
    });
  }
}
