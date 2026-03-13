import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentContactModelComponent } from './student-contact-model.component';

const routes: Routes = [
  {
    path: '',
    component: StudentContactModelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentContactModelRoutingModule { }
