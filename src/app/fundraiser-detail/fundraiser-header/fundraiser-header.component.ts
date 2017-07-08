import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fundraiser-header',
  templateUrl: './fundraiser-header.component.html',
  styleUrls: ['./fundraiser-header.component.css']
})
export class FundraiserHeaderComponent implements OnInit {

  @Input()
  status = 'draft';

  constructor(private authService: LoginService, private router: Router) {
  }

  ngOnInit() {
    console.log('FundraiserHeaderComponent init', this.status);
  }

  isLogin() {
    return this.authService.loggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isPostLive() {
    return this.status === 'live';
  }
}
