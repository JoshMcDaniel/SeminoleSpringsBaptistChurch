import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconsComponent } from './social-icons.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SocialIconsComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [SocialIconsComponent]
})
export class SocialIconsModule { }
