import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { NotificationService } from '../shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isLoading = false;
  token: string = '';
  isTokenValid = true;
  tokenChecked = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getTokenFromUrl();
  }

  initializeForm(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  getTokenFromUrl(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (!this.token) {
      this.isTokenValid = false;
      this.tokenChecked = true;
      this.notification.error('Invalid reset link. Please request a new password reset.');
    }
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      this.isLoading = true;
      const password = this.resetPasswordForm.value.password;
      
      this.userService.resetPassword(this.token, password).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.success) {
            this.notification.success(res.message);
            setTimeout(() => {
              this.router.navigate(['/student-overall-model']);
            }, 2000);
          } else {
            this.notification.error(res.message || 'Password reset failed');
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Reset password error:', err);
          this.notification.error('Failed to reset password. The link may be expired or invalid.');
        }
      });
    } else {
      this.markFormGroupTouched(this.resetPasswordForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Get error message for password field
  getPasswordErrorMessage(): string {
    const passwordControl = this.resetPasswordForm.get('password');
    if (passwordControl?.errors && passwordControl.touched) {
      if (passwordControl.errors['required']) {
        return 'Password is required';
      }
      if (passwordControl.errors['minlength']) {
        return 'Password must be at least 6 characters long';
      }
    }
    return '';
  }

  // Get error message for confirm password field
  getConfirmPasswordErrorMessage(): string {
    const confirmPasswordControl = this.resetPasswordForm.get('confirmPassword');
    if (confirmPasswordControl?.errors && confirmPasswordControl.touched) {
      if (confirmPasswordControl.errors['required']) {
        return 'Please confirm your password';
      }
      if (confirmPasswordControl.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }

  // Navigate back to login
  backToLogin(): void {
    this.router.navigate(['/student-overall-model']);
  }
}
