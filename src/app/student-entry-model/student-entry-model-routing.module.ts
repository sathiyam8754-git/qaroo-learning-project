import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentEntryModelComponent } from './student-entry-model.component';

const routes: Routes = [
  {
    path: '',
    component: StudentEntryModelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentEntryModelRoutingModule { }
