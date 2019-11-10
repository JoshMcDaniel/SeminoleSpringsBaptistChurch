import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SermonsRoutingModule } from './sermons-routing.module';
import { SermonsComponent } from './sermons.component';
import { SharedModule } from '../shared/shared.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [SermonsComponent],
  imports: [
    CommonModule,
    SermonsRoutingModule,
    SharedModule,
    FooterModule
  ]
})
export class SermonsModule { }
