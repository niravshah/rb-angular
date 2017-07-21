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

}
