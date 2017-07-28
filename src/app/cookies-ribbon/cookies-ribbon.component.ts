import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
declare var $: any;

@Component({
  selector: 'app-cookies-ribbon',
  templateUrl: './cookies-ribbon.component.html',
  styleUrls: ['./cookies-ribbon.component.css']
})
export class CookiesRibbonComponent implements OnInit, AfterViewInit {

  rb_cookie = 'rb-cookie';

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.cookieService.get(this.rb_cookie)) {
      $('#cookie-ribbon').hide();
    }
  }


  close() {
    $('#cookie-ribbon').hide();
    this.cookieService.put(this.rb_cookie, 'rb-cookie');
  }

}

