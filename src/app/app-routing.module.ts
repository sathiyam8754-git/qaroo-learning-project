import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {path: '', redirectTo: 'student-overall-model', pathMatch: 'full'},
  {
    path: 'student-overall-model',
    loadChildren: () => import('./student-overall-model/student-overall-model.module').then(m => m.StudentOverallModelModule),
    pathMatch: 'full'
  },
   {
    path: 'user-details',
    loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsModule),
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    pathMatch: 'full'
  },
  {
    path: 'course-details',
    loadChildren: () => import('./course-details/course-details.module').then(m => m.CourseDetailsModule)
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
