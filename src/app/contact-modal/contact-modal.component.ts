import {Component, Input, OnInit} from '@angular/core';
import {ContactModalService} from './contact-modal.service';
import {MessageDisplayComponent} from '../message-display/message-display.component';
import {LoginService} from "../login/login.service";

declare var $: any;

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent extends MessageDisplayComponent implements OnInit {
  @Input('loggedIn') loggedIn = false;
  contactForm;
  messages = [];

  constructor(private service: ContactModalService, private loginService: LoginService) {
    super();
  }

  ngOnInit() {

    this.contactForm = {
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      query: '',
      existingUser: null,
    };

    if (this.loggedIn === true) {
      this.contactForm.existingUser = this.loginService.loggedInUserSid();
    }

  }

  close() {
    const modal = document.querySelector('#modal');
    const modalOverlay = document.querySelector('#modal-overlay');
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
  }

  save(model, valid) {
    if (valid) {
      // console.log(model);
      this.service.sendContactForm(this.contactForm.existingUser, model.fname, model.lname, model.email, model.mobile, model.query).subscribe(res => {
        $('#contactForm').hide();
        this.addSuccessMessage('Query sent Successfully. Your Reference Number is: ' + res.ref, this.messages);
      }, err => {
        this.addErrorMessage(err, this.messages);
      });
    }
  }

}
