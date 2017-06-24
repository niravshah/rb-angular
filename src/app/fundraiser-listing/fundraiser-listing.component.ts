import {Component, Input, NgZone, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Post} from '../post.model';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-fundraiser-listing',
  templateUrl: './fundraiser-listing.component.html',
  styleUrls: ['./fundraiser-listing.component.css']
})

export class FundraiseListingComponent implements OnInit {

  @Input()
  type: string;
  posts: Post[];
  filterValue: string;

  constructor(private postService: PostsService, private loginService: LoginService) {

  }

  ngOnInit() {
    console.log('Fundraiser Detail Component ' + this.type);

    if (this.type === 'loggedInUser') {
      this.postService.getAllPostsForLoggedInUser(this.loginService.loggedInUser()).subscribe(posts => {
        this.posts = posts;
        console.log(this.posts.length);
      });
    } else {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
        console.log(this.posts.length);
      });
    }

  }
}
