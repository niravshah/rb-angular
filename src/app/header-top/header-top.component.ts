import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';


@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {

  constructor(private authService: LoginService) { }

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
