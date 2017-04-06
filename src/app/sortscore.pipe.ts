import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortscore'
})
export class SortscorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
