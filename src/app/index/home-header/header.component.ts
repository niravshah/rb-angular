import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  constructor(private authService: LoginService) { }

  ngOnInit() {
  }

  isLogin() {
    return this.authService.loggedIn();
  }
    
}
