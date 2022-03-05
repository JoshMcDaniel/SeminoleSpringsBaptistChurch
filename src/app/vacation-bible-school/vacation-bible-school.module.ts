import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from './../pipes/pipes.module';
import { VbsSubFormComponent } from './vbs-sub-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationBibleSchoolComponent } from './vacation-bible-school.component';
import { VacationBibleSchoolRoutingModule } from './vacation-bible-school-routing.module';
import { MatFormFieldModule, MatOptionModule } from '@angular/material';



@NgModule({
  declarations: [
    VacationBibleSchoolComponent,
    VbsSubFormComponent
  ],
  imports: [
    CommonModule,
    VacationBibleSchoolRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    PipesModule
  ]
})
export class VacationBibleSchoolModule { }
