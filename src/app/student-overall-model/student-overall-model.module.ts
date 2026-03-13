import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentOverallModelRoutingModule } from './student-overall-model-routing.module';
import { StudentOverallModelComponent } from './student-overall-model.component';
import { StudentEntryModelModule } from '../student-entry-model/student-entry-model.module';
import { StudentClassModelModule } from '../student-class-model/student-class-model.module';
import { StudentExpolringModelModule } from '../student-expolring-model/student-expolring-model.module';
import { StudentContactModelModule } from '../student-contact-model/student-contact-model.module';


@NgModule({
  declarations: [
    StudentOverallModelComponent
  ],
  imports: [
    CommonModule,
    StudentOverallModelRoutingModule,
    StudentEntryModelModule,
    StudentClassModelModule,
    StudentExpolringModelModule,
    StudentContactModelModule
  ]
})
export class StudentOverallModelModule { }
