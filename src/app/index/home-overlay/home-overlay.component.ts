import {Component, OnInit} from '@angular/core';
import {HomeOverlayForm} from './home-overlay.form';
import {PostsService} from './../../posts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-overlay',
  templateUrl: './home-overlay.component.html',
  styleUrls: ['./home-overlay.component.css']
})
export class HomeOverlayComponent implements OnInit {

  public overlayForm: HomeOverlayForm;

  constructor(private postService: PostsService, private router: Router) {
  }

  ngOnInit() {

    this.overlayForm = {
      amount: '',
      title: '',
      email: '',
      category: ''
    };
  }

  save(model: HomeOverlayForm, isValid: Boolean) {
    console.log(model, isValid);
    if (isValid) {
      this.postService.createPost(model).subscribe(res => {
        console.log('Post Response: ', res);
        const url = '/fundraisers/' + res.id;
        this.router.navigateByUrl(url);
      });
    }
  }

}
