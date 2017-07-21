import {Component, Input, NgZone, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Post} from '../post.model';
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

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

  constructor(private router: Router, private postService: PostsService, private loginService: LoginService) {

  }

  ngOnInit() {
    // console.log('Fundraiser Detail Component ' + this.type);

    if (this.type === 'loggedInUser') {
      if (this.loginService.loggedIn()) {
        this.postService.getAllPostsForLoggedInUser(this.loginService.loggedInUser(), this.loginService.loggedInJwt()).subscribe(posts => {
          this.posts = posts;
          // console.log(this.posts.length);
        }, (error) => {

          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['login'], {queryParams: {'mcode': 2}});
          }
          console.log(error);
        });
      } else {
        this.router.navigate(['login'], {queryParams: {'mcode': 2}});
      }
    } else {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
        console.log(this.posts.length);
      }, (error) => {

        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['login'], {queryParams: {'mcode': 2}});
        }
        console.log(error);
      });
    }

  }
}
