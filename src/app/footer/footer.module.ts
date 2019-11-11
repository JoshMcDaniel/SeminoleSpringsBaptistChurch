import { SocialIconsModule } from './../social-icons/social-icons.module';
import { FooterComponent } from './footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SocialIconsModule,
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
