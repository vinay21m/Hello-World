import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], propertyName: any[]): any[] {
    if (!!value && value.length > 0 && !!propertyName && propertyName.length > 0) {
      value.sort((a: any, b: any) => {
        if (a[propertyName[0]] > b[propertyName[0]] && propertyName[1]) {
          return -1;
        } else if (a[propertyName[0]] < b[propertyName[0]] && !propertyName[1]) {
          return 1;
        } else {
          return 0;
        }
      });
      return propertyName[1] ? value : value.sort().reverse();
    }
    return value;
  }
}
