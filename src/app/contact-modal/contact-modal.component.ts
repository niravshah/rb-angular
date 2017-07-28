import {Component, OnInit} from '@angular/core';
import {ContactModalService} from './contact-modal.service';
import {MessageDisplayComponent} from '../message-display/message-display.component';

declare var $: any;

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent extends MessageDisplayComponent implements OnInit {

  contactForm;
  messages = [];

  constructor(private service: ContactModalService) {
    super();
  }

  ngOnInit() {
    this.contactForm = {
      fname: '07596162765', lname: '07596162765', email: '07596162765@c.c', mobile: '07596162765', query: '07596162765'
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
        $('#contactForm').hide();
        this.addSuccessMessage('Query sent Successfully. Your Reference Number is: ' + res.ref, this.messages);
      }, err => {
        this.addErrorMessage(err.message, this.messages);
      });
    }
  }

}
