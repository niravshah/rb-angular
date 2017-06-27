import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'percentcalc'})
export class PercentcalcPipe implements PipeTransform {
  transform(target: number, collected: number): number {

    if (target !== 0 && collected !== 0) {

      return Math.round((collected / target) * 100);
    } else {
      return 0;
    }

  }
}
