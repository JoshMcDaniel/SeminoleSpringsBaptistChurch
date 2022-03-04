import { NgModule } from '@angular/core';
import { VacationBibleSchoolComponent } from './../vacation-bible-school/vacation-bible-school.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VacationBibleSchoolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationBibleSchoolRoutingModule { }
