import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicCardSectionComponent } from './dynamic-card-section.component';

@NgModule({
  declarations: [
    DynamicCardSectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicCardSectionComponent
  ]
})
export class DynamicCardSectionModule { }
