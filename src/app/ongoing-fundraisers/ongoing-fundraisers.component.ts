import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-ongoing-fundraisers',
  templateUrl: './ongoing-fundraisers.component.html',
  styleUrls: ['./ongoing-fundraisers.component.css']
})
export class OngoingFundraisersComponent implements OnInit {

  posts: any = [];

  constructor(private postService: PostsService) {
  }

  ngOnInit() {

    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  };

}
