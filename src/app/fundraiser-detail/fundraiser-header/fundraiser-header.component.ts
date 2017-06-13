import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fundraiser-header',
  templateUrl: './fundraiser-header.component.html',
  styleUrls: ['./fundraiser-header.component.css']
})
export class FundraiserHeaderComponent implements OnInit {

  constructor(private authService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  isLogin() {
    return this.authService.loggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
