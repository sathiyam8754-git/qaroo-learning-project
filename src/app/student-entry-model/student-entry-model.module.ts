import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentEntryModelRoutingModule } from './student-entry-model-routing.module';
import { StudentEntryModelComponent } from './student-entry-model.component';
import { StudentClassModelModule } from '../student-class-model/student-class-model.module';


@NgModule({
  declarations: [
    StudentEntryModelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentEntryModelRoutingModule
  ],
  exports: [
    StudentEntryModelComponent
  ]
})
export class StudentEntryModelModule { }
