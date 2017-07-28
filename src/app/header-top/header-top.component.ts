import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {

  constructor(private router: Router, private authService: LoginService) {
  }

  ngOnInit() {
  }

  isLogin() {
    return this.authService.loggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openContactModal() {
    const modal = document.querySelector('#modal');
    const modalOverlay = document.querySelector('#modal-overlay');
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
  }

}
