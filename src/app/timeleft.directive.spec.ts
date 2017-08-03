import { TimeleftDirective } from './timeleft.directive';
import {ElementRef} from '@angular/core';

describe('TimeleftDirective', () => {
  it('should create an instance', () => {
    const directive = new TimeleftDirective(new ElementRef('test'));
    expect(directive).toBeTruthy();
  });
});
