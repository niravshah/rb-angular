import {Component, OnInit} from '@angular/core';
import {ContactModalService} from './contact-modal.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  contactForm;

  constructor(private service: ContactModalService) {
  }

  ngOnInit() {
    this.contactForm = {
      fname: '', lname: '', email: '', mobile: '', query: ''
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
      this.service.sendContactForm(model.fname, model.lname, model.email, model.mobile, model.query).subscribe(res => {
      }, err => {
      });
    }
  }

}
