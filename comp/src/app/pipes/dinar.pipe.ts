import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dinar',
  standalone: true
})
export class DinarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value + "DT";
  }

}
