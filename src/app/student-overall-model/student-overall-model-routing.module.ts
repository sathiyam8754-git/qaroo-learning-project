import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentOverallModelComponent } from './student-overall-model.component';

const routes: Routes = [
  {
    path: '',
    component: StudentOverallModelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentOverallModelRoutingModule { }
