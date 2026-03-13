import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentExpolringModelRoutingModule } from './student-expolring-model-routing.module';
import { StudentExpolringModelComponent } from './student-expolring-model.component';


@NgModule({
  declarations: [
    StudentExpolringModelComponent
  ],
  imports: [
    CommonModule,
    StudentExpolringModelRoutingModule
  ],
  exports: [
    StudentExpolringModelComponent
  ]
})
export class StudentExpolringModelModule { }
