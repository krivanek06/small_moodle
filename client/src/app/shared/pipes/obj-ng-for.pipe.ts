import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objNgFor',
  pure: false,
})
export class ObjNgForPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value);
  }
}
