import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  shareForm;

  constructor() { }

  ngOnInit() {
    this.shareForm = {amount: '', name: ''};

  }

}
