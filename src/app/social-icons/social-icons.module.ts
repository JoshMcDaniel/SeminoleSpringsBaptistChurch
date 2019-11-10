import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconsComponent } from './social-icons.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [SocialIconsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [SocialIconsComponent]
})
export class SocialIconsModule { }
