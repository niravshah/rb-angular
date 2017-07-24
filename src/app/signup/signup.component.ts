import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm;

  constructor(private postService: PostsService, private router: Router) {
  }

  ngOnInit() {
    this.signupForm = {
      amount: '',
      title: '',
      email: '',
      fname: '',
      lname: '',
      mobile: '',
      currency: 'gbp'
    };
  }

  signup(model, isValid) {
    if (isValid) {
      this.postService.createPost(model).subscribe((res) => {
        // console.log('Post Response: ', res);
        this.router.navigate(['first-login'], {queryParams: {mcode: 4}});
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
