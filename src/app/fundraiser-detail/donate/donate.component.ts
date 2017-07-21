import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor(private _location: Location) {
  }

  ngOnInit() {
  }

  chargeSuccess(event) {
    console.log('Charge Success', event);
    $('#stripe_donate').hide(500);
    $('#donor_details').fadeIn(1000);
    $('html, body').animate({scrollTop: 200}, 700);
  }

  closeBtn(command) {
    console.log('Close Button Clicked!', command);
    if (command === 'close') {
      this._location.back();
    }
  }

}
