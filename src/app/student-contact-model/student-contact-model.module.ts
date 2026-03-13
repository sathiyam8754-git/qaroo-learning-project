import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentContactModelRoutingModule } from './student-contact-model-routing.module';
import { StudentContactModelComponent } from './student-contact-model.component';


@NgModule({
  declarations: [
    StudentContactModelComponent
  ],
  imports: [
    CommonModule,
    StudentContactModelRoutingModule
  ],
  exports: [
    StudentContactModelComponent
  ]
})
export class StudentContactModelModule { }
