import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentExpolringModelComponent } from './student-expolring-model.component';

const routes: Routes = [
  {
    path: '',
   component: StudentExpolringModelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentExpolringModelRoutingModule { }
