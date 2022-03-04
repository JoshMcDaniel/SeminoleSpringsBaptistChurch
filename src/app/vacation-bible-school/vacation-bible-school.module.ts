import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationBibleSchoolComponent } from './vacation-bible-school.component';
import { VacationBibleSchoolRoutingModule } from './vacation-bible-school-routing.module';
import { MatFormFieldModule } from '@angular/material';



@NgModule({
  declarations: [VacationBibleSchoolComponent],
  imports: [
    CommonModule,
    VacationBibleSchoolRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule
  ]
})
export class VacationBibleSchoolModule { }
