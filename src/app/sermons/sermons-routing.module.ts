import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SermonsComponent } from './sermons.component';


const routes: Routes = [
  {
    path: '',
    component: SermonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SermonsRoutingModule { }
