import { SocialIconsModule } from './../social-icons/social-icons.module';
import { FooterComponent } from './footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SocialIconsModule,
    SharedModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
