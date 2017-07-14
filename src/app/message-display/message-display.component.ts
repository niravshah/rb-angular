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

  addErrorMessage(message, messages) {
    messages.push({type: 'error', text: message});
  }

}
