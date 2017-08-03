import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
declare var $: any;

@Component({
  selector: 'app-cookies-ribbon',
  templateUrl: './cookies-ribbon.component.html',
  styleUrls: ['./cookies-ribbon.component.css']
})
export class CookiesRibbonComponent implements OnInit, AfterViewInit {

  @Input('name') name = 'home';
  cookieMap = {home: 'rb-cookie-home', fundraiser: 'rb-cookie-fundraiser'};

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.cookieService.get(this.cookieMap[this.name])) {
      $('#cookie-ribbon').hide();
    }
  }


  close() {
    $('#cookie-ribbon').hide();
    this.cookieService.put(this.cookieMap[this.name], 'rb-cookie-home');
  }

}

