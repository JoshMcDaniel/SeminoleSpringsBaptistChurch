import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarModule,
    MaterialModule
  ]
})
export class SharedModule { }
