import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decoder'
})
export class DecoderPipe implements PipeTransform {

  /**
   * This pipe takes in text and replaces the ascii
   * value of an apostrophe with it's string value.
   * @returns string value of the apostrophe ascii code
   * @param text The text from which to replace the ascii code with the string value.
   */
  transform(text: string): string {
    return text.replace('&#39;', '\'');
  }

}
