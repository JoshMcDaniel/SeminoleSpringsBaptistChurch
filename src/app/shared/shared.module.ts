import { DecoderPipe } from './../decoder.pipe';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../footer/footer.module';
import { SafePipe } from '../safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
  declarations: [SafePipe, DecoderPipe],
  imports: [
    CommonModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    MaterialModule,
    FooterModule,
    SafePipe,
    DecoderPipe,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ]
})
export class SharedModule { }
