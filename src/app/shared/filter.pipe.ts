import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, query: string) {
    if (query === null || value.length === 0 || query === '') { return value; }
    const result = [];
    for (const val of value) {
      if (val['url']) {
        if (val['url'].toLowerCase().includes(query.trim().toLowerCase())) {
          result.push(val);
        }
      }
    }
    return result;
  }
}
