import {Component, OnInit} from '@angular/core';
import {HomeOverlayForm} from './home-overlay.form';

@Component({
  selector: 'app-home-overlay',
  templateUrl: './home-overlay.component.html',
  styleUrls: ['./home-overlay.component.css']
})
export class HomeOverlayComponent implements OnInit {

  public overlayForm: HomeOverlayForm;

  constructor() {
  }

  ngOnInit() {

    this.overlayForm = {
      amount: '',
      title: '',
      email: '',
      category: ''
    };
  }

  save(model: HomeOverlayForm, isValid: Boolean) {
    console.log(model, isValid);
  }

}
