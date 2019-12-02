import { DecoderPipe } from './../decoder.pipe';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../footer/footer.module';
import { SafePipe } from '../safe.pipe';


@NgModule({
  declarations: [SafePipe, DecoderPipe],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    FooterModule,
    SafePipe,
    DecoderPipe
  ]
})
export class SharedModule { }
