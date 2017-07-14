import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  addSuccessMessage(message, messages) {
    messages.push({type: 'success', text: message});
  }

  addErrorMessage(err, messages) {
    if (err._body) {
      try {
        const body = JSON.parse(err._body);
        if (body.message) {
          messages.push({type: 'error', text: body.message});
        } else {
          const message = 'Error: ' + err.status + ' ' + err.statusText;
          messages.push({type: 'error', text: message});
        }
      } catch (ex) {
        const message = 'Error: ' + err.status + ' ' + err.statusText;
        messages.push({type: 'error', text: message});
      }
    } else {
      messages.push({type: 'error', text: err});
    }
  }

}
