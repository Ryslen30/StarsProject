import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
  standalone: true
})
export class StatePipe implements PipeTransform {

  transform(state:boolean): string {
    if(state==true)
      return "Alive"
    else
    return "dead";
  }

}
