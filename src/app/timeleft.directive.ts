import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appTimeleft]'
})
export class TimeleftDirective implements OnInit{

  @Input('dateCreated') date: string;

  constructor(public el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
    const date1 = new Date().getTime();
    const date2 = Date.parse(this.date);
    const timeDiff = date1 - date2;
    let daysLeft = Math.ceil(30 - timeDiff / (1000 * 3600 * 24));
    if (daysLeft < 0) {daysLeft = 0};
    this.el.nativeElement.innerText = daysLeft + ' days left';
  }

}
