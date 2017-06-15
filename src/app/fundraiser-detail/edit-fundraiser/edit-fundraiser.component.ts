import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

declare var $: any;


@Component({
  selector: 'app-edit-fundraiser',
  templateUrl: './edit-fundraiser.component.html',
  styleUrls: ['./edit-fundraiser.component.css']
})
export class EditFundraiserComponent implements OnInit, AfterViewInit {

  data;
  isCompleted = false;

  constructor(public _location: Location) {
    this.data = {
      email: ''
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  onStep1Next($event) {
    console.log('Step 1 Next');
  }

  onStep2Next($event) {
    console.log('Step 2 Next');
  }

  onStep3Next($event) {
    console.log('Step 3 Next');
    this.isCompleted = true;
  }

  onComplete() {}

  closeBtn(command) {
    console.log('Close Button Clicked!', command);
    if (command === 'close') {
      this._location.back();
    }
  }

}
