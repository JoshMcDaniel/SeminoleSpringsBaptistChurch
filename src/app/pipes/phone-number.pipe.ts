import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(rawNum: string) {
    rawNum = "+1" + rawNum;

    const countryCodeStr = rawNum.slice(0, 2);
    const areaCodeStr = rawNum.slice(2, 5);
    const midSectionStr = rawNum.slice(5, 8);
    const lastSectionStr = rawNum.slice(8);

    return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }

}
