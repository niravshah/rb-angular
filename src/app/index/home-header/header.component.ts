import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  constructor(private router: Router,private authService: LoginService) { }

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
