import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../posts.service';

@Component({
  selector: 'app-home-fundraisers',
  templateUrl: './home-fundraisers.component.html',
  styleUrls: ['./home-fundraisers.component.css']
})
export class HomeFundraisersComponent implements OnInit {

  posts: any = [];

  constructor(private postService: PostsService) {
  }

  ngOnInit() {

    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  };

}
