import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-personal-invites',
  templateUrl: './personal-invites.component.html',
  styleUrls: ['./personal-invites.component.css']
})
export class PersonalInvitesComponent implements OnInit {

  inviteForm;

  constructor() {
  }

  ngOnInit() {
    this.inviteForm = {name: ''};
  }

  sendInvite(model, valid) {

  }

  closeBtn(command) {
  }
}
