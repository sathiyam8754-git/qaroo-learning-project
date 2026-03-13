import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentClassModelComponent } from './student-class-model.component';

const routes: Routes = [
   {
      path: '',
      component: StudentClassModelComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentClassModelRoutingModule { }
