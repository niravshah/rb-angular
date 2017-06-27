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
      fname: '',
      currency: ''
    };
  }

  save(model: HomeOverlayForm, isValid: Boolean) {
    // console.log(model, isValid);
    if (isValid) {
      this.postService.createPost(model).subscribe((res) => {
        // console.log('Post Response: ', res);
        this.router.navigate(['login'], {queryParams: {mcode: 4}});
      }, (error) => {
        if (error.status === 403) {
          const url = '/login?mcode=1';
          this.router.navigateByUrl(url);
        } else {
          const url = encodeURI('/info?message=' + error.json().message);
          this.router.navigateByUrl(url);
          console.log('Error!!', error.json().message);
        }

      });
    }
  }

}
