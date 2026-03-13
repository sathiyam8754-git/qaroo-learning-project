import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { NotificationService } from '../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      const email = this.forgotPasswordForm.value.email;
      
      this.userService.forgotPassword(email).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.success) {
            this.notification.success(res.message);
            // Navigate to reset password screen with token
            this.router.navigate(['/reset-password', res.token]);
          } else {
            this.notification.error(res.message);
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Forgot password error:', err);
          this.notification.error('Failed to send reset email. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched(this.forgotPasswordForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Get error message for email field
  getEmailErrorMessage(): string {
    const emailControl = this.forgotPasswordForm.get('email');
    if (emailControl?.errors && emailControl.touched) {
      if (emailControl.errors['required']) {
        return 'Email address is required';
      }
      if (emailControl.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  // Navigate back to login
  backToLogin(): void {
    this.router.navigate(['/']);
  }
}
