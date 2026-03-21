import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StudentClassModelRoutingModule } from './student-class-model-routing.module';
import { StudentClassModelComponent } from './student-class-model.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StudentClassModelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StudentClassModelRoutingModule,
    SharedModule
  ],
  exports: [
    StudentClassModelComponent
  ]
})
export class StudentClassModelModule { }
