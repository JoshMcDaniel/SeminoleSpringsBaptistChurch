import { AboutModule } from './../about/about.module';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { IntroductionModule } from '../introduction/introduction.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutModule
  ],
  exports: [
    NavbarModule,
    MaterialModule,
    AboutModule,
    IntroductionModule
  ]
})
export class SharedModule { }
