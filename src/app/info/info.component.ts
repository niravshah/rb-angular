import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  messages = [];
  messageMap = {1: 'This email exists. Please login before creating a new post.'};

  constructor(private _location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const mcode = params['message'];
      if (mcode) {
        this.messages.push(mcode);
      }
    });
  }

}
