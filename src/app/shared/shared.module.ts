import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicCardSectionModule } from './components/dynamic-card-section/dynamic-card-section.module';
import { TwoCardRowModule } from './components/two-card-row/two-card-row.module';
import { StudentDetailsDialogComponent } from './components/student-details-dialog/student-details-dialog.component';
import { DemoClassDialogComponent } from './components/demo-class-dialog/demo-class-dialog.component';

@NgModule({
  declarations: [
    StudentDetailsDialogComponent,
    DemoClassDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicCardSectionModule,
    TwoCardRowModule
  ],
  exports: [
    DynamicCardSectionModule,
    TwoCardRowModule,
    StudentDetailsDialogComponent,
    DemoClassDialogComponent
  ]
})
export class SharedModule { }
