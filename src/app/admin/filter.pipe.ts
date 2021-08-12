import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propname: string): any {
    if (filterString === "") {
      return value
    }
    const resultArray = []
    for (const item of value) {
      if (item[propname] === filterString) {
        resultArray.push(item)
      }
    }
    return resultArray
  }
}
