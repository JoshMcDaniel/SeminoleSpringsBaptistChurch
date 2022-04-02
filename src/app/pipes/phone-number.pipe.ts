import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(rawNum: string) {
    const areaCodeStr = rawNum.slice(0, 3);
    const midSectionStr = rawNum.slice(3, 6);
    const lastSectionStr = rawNum.slice(6);

    return `(${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }

}
