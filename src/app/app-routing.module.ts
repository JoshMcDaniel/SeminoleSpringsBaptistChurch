import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'events/vbs',
    loadChildren: () => import('./vacation-bible-school/vacation-bible-school.module').then(m => m.VacationBibleSchoolModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
