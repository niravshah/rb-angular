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
    if (err.message) {
      messages.push({type: 'error', text: err.message});
    } else {
      const message = 'Error: ' + err.status + ' ' + err.statusText;
      messages.push({type: 'error', text: message});
    }
  }

}
