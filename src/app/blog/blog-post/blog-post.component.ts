import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BlogPostService} from './blog-post.service';
import {ActivatedRoute} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit, AfterViewInit {

  post;
  featured;
  others;
  sub;

  constructor(private service: BlogPostService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getBlogPost(id).subscribe(res => {
        // console.log(res);
        this.post = res['post'];
        this.featured = res['featured'];
        this.others = res['others'];
      }, err => {
        console.log('BlogPostComponent getBlogPost Error', id, err);
      });
    });

  }

  ngAfterViewInit(): void {

  }
}
