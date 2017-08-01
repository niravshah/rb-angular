import {Component, OnInit} from '@angular/core';
import {BlogListingService} from './blog-listing.service';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.css']
})
export class BlogListingComponent implements OnInit {

  posts;
  filterValue: string;

  constructor(private _service: BlogListingService) {
  }

  ngOnInit() {
    this._service.getBlogPost().subscribe(res => {
      this.posts = res.posts;
    }, err => {
    });
  }

}
