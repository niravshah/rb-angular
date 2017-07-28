import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  contactForm;

  constructor() {
  }

  ngOnInit() {
    this.contactForm = {
      fname: '', lname: '', email: '', mobile: ''
    };
  }

  close() {
    const modal = document.querySelector('#modal');
    const modalOverlay = document.querySelector('#modal-overlay');
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
  }

  save(model, valid) {
    if (valid) {
      console.log(model);
    }
  }

}
