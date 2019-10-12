import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconsModule } from '../social-icons/social-icons.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    SocialIconsModule,
  ]
})
export class SharedModule { }
