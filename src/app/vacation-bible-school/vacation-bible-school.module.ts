import { VbsSubFormComponent } from './vbs-form/vbs-sub-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from './../pipes/pipes.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationBibleSchoolComponent } from './vacation-bible-school.component';
import { VacationBibleSchoolRoutingModule } from './vacation-bible-school-routing.module';
import { MatFormFieldModule, MatOptionModule } from '@angular/material';
import { VbsFormSummaryComponent } from './vbs-form-summary/vbs-form-summary.component';
import { VbsFormComponent } from './vbs-form/vbs-form.component';



@NgModule({
  declarations: [
    VacationBibleSchoolComponent,
    VbsSubFormComponent,
    VbsFormSummaryComponent,
    VbsFormComponent
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
    PipesModule,
    MatCheckboxModule
  ]
})
export class VacationBibleSchoolModule { }
