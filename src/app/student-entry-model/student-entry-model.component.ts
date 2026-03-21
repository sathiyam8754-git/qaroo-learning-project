import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { NotificationService } from '../shared/services/notification.service';

type SessionMode = 'online' | 'login';

@Component({
  selector: 'app-student-entry-model',
  templateUrl: './student-entry-model.component.html',
  styleUrls: ['./student-entry-model.component.css']
})
export class StudentEntryModelComponent implements OnInit {

  activeMode: SessionMode = 'online';
  showPassword = false;

  onlineForm!: FormGroup;
  loginForm!: FormGroup;

  onlineLoading = false;
  loginLoading = false;
  onlineError = '';
  loginError = '';
  onlineSuccess = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForms();
  }

  private buildForms(): void {
    this.onlineForm = this.fb.group({
      childName: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  setMode(mode: SessionMode): void {
    this.activeMode = mode;
    this.onlineError = '';
    this.loginError = '';
    this.onlineSuccess = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get f() { return this.onlineForm.controls; }
  get lf() { return this.loginForm.controls; }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const ctrl = form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  getError(form: FormGroup, field: string): string {
    const ctrl = form.get(field);
    if (!ctrl || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'This field is required';
    if (ctrl.errors['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} characters`;
    if (ctrl.errors['email']) return 'Enter a valid email address';
    if (ctrl.errors['pattern']) return 'Enter a valid 10-digit mobile number';
    return 'Invalid value';
  }

  scheduleClass(): void {
    if (this.onlineForm.invalid) {
      this.onlineForm.markAllAsTouched();
      return;
    }
    this.onlineLoading = true;
    this.onlineError = '';

    const obj = {
      username: this.onlineForm.value.childName,
      email: this.onlineForm.value.email,
      mobile: this.onlineForm.value.mobile
    };

    this.user.SignUp(obj).subscribe({
      next: (res: any) => {
        this.onlineLoading = false;
        if (res.Issuccess) {
          this.notification.success(res.message);
          this.onlineSuccess = true;
          setTimeout(() => {
            this.setMode('login');
            this.onlineSuccess = false;
          }, 2000);
        } else {
          this.onlineError = res.message;
          this.notification.error(res.message);
        }
      },
      error: (err: any) => {
        this.onlineLoading = false;
        this.onlineError = 'Signup failed. Please try again.';
        this.notification.error('Signup failed. Please try again.');
        console.error('Signup error:', err);
      }
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginLoading = true;
    this.loginError = '';

    const obj = {
      email: this.loginForm.value.identifier,
      password: this.loginForm.value.password
    };

    this.user.Login(obj).subscribe({
      next: (res: any) => {
        this.loginLoading = false;
        if (res.Issuccess) {
          this.notification.success(res.message);
          this.router.navigate(['/user-details']);
        } else {
          this.loginError = res.message;
          this.notification.error(res.message);
        }
      },
      error: (err: any) => {
        this.loginLoading = false;
        this.loginError = 'Login failed. Please try again.';
        this.notification.error('Login failed. Please try again.');
        console.error('Login error:', err);
      }
    });
  }

  forgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
