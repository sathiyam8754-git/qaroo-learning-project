import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { NotificationService } from '../shared/services/notification.service';
import { Router } from '@angular/router';


export interface FormData {
  sessionMode: string;
  childName?: string;
  mobileNumber?: string;
  email?: string;
  username?: string;
  password?: string;
}

@Component({
  selector: 'app-student-entry-model',
  templateUrl: './student-entry-model.component.html',
  styleUrls: ['./student-entry-model.component.css']
})
export class StudentEntryModelComponent implements OnInit {
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private user: UserService, private notification: NotificationService, private router: Router) {
    this.bookingForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      sessionMode: ['online', Validators.required],
      childName: [''],
      mobileNumber: [''],
      email: [''],
      username: [''],
      password: ['']
    });
  }

  // Get error message for form control
  getErrorMessage(controlName: string): string {
    const control = this.bookingForm.get(controlName);
    if (control?.errors && control.touched && this.isFieldRelevant(controlName)) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(controlName)} is required`;
      }
      if (control.errors['username']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `${this.getFieldLabel(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid phone number';
      }
    }
    return '';
  }

  // Check if a field is relevant for the current session mode
  isFieldRelevant(controlName: string): boolean {
    const sessionMode = this.bookingForm.get('sessionMode')?.value;

    if (sessionMode === 'online') {
      return ['childName', 'mobileNumber', 'email'].includes(controlName);
    } else if (sessionMode === 'login') {
      return ['username', 'password'].includes(controlName);
    }

    return false;
  }

  // Validate only relevant fields for the current mode
  validateRelevantFields(): boolean {
    const sessionMode = this.bookingForm.get('sessionMode')?.value;

    if (sessionMode === 'online') {
      const onlineFields = ['childName', 'mobileNumber', 'email'];
      return this.validateFields(onlineFields, {
        childName: [Validators.required, Validators.minLength(2)],
        mobileNumber: [Validators.required, Validators.pattern('^[0-9]{10}$')],
        email: [Validators.required, Validators.email]
      });
    } else if (sessionMode === 'login') {
      const loginFields = ['username', 'password'];
      return this.validateFields(loginFields, {
        username: [Validators.required, Validators.minLength(3)],
        password: [Validators.required, Validators.minLength(6)]
      });
    }

    return false;
  }

  // Validate specific fields with given validators
  private validateFields(fieldNames: string[], validators: { [key: string]: any[] }): boolean {
    let isValid = true;

    fieldNames.forEach(fieldName => {
      const control = this.bookingForm.get(fieldName);
      if (control) {
        // Apply validators
        const fieldValidators = validators[fieldName] || [];
        control.setValidators(fieldValidators);
        control.updateValueAndValidity();

        // Check if valid
        if (control.invalid) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  // Clear validators for non-relevant fields
  clearNonRelevantFields(): void {
    const sessionMode = this.bookingForm.get('sessionMode')?.value;

    if (sessionMode === 'online') {
      const loginFields = ['username', 'password'];
      loginFields.forEach(fieldName => {
        const control = this.bookingForm.get(fieldName);
        if (control) {
          control.clearValidators();
          control.updateValueAndValidity();
        }
      });
    } else if (sessionMode === 'login') {
      const onlineFields = ['childName', 'mobileNumber', 'email'];
      onlineFields.forEach(fieldName => {
        const control = this.bookingForm.get(fieldName);
        if (control) {
          control.clearValidators();
          control.updateValueAndValidity();
        }
      });
    }
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      sessionMode: 'Session mode',
      childName: "Child's name",
      mobileNumber: 'Mobile number',
      email: 'Email address',
      username: 'Username',
      password: 'Password'
    };
    return labels[controlName] || controlName;
  }

  onSubmit(): void {
    // Clear non-relevant field validators first
    this.clearNonRelevantFields();

    // Validate only relevant fields
    if (this.validateRelevantFields()) {
      // Create FormData object with submitted values
      const formData: FormData = {
        sessionMode: this.bookingForm.get('sessionMode')?.value || '',
        ...(this.bookingForm.get('sessionMode')?.value === 'online' && {
          childName: this.bookingForm.get('childName')?.value,
          mobileNumber: this.bookingForm.get('mobileNumber')?.value,
          email: this.bookingForm.get('email')?.value
        }),
        ...(this.bookingForm.get('sessionMode')?.value === 'login' && {
          username: this.bookingForm.get('username')?.value,
          password: this.bookingForm.get('password')?.value
        })
      };
      if (formData.sessionMode === 'login') {
        let obj = {
          "email": this.bookingForm.value.username,
          "password": this.bookingForm.value.password
        }
        this.user.Login(obj).subscribe({
          next: (res: any) => {
            if (res.Issuccess) {
              this.notification.success(res.message);
              this.router.navigate(['/user-details']);
            }
            else {
              this.notification.error(res.message);
            }
          },
          error: (err: any) => {
            console.error('Login error:', err);
            this.notification.error('Login failed. Please try again.');
          }
        })

      } else {
        let obj = {
          "username": this.bookingForm.value.childName,
          "email": this.bookingForm.value.email,
          "mobile": this.bookingForm.value.mobileNumber
        }
        this.user.SignUp(obj).subscribe({
          next: (res: any) => {
            if (res.Issuccess) {
              this.notification.success(res.message);
              this.setSessionMode('login');
            }
            else {
              this.notification.error(res.message);
            }
          },
          error: (err: any) => {
            console.error('Signup error:', err);
            this.notification.error('Signup failed. Please try again.');
          }
        })
      }

      this.resetForm();
    }
  }

  resetForm(): void {
    this.bookingForm.reset();
    this.initializeForm();
  }

  // Handle forgot password click
  forgotPassword(event: Event): void {
    // Prevent default link behavior
    event.preventDefault();
    // Navigate to forgot password page
    this.router.navigate(['/forgot-password']);
  }

  // Set session mode
  setSessionMode(mode: string): void {
    this.bookingForm.patchValue({ sessionMode: mode });
    // Clear validation errors when switching modes
    this.clearNonRelevantFields();
  }

  // Mark only relevant fields as touched
  private markRelevantFieldsTouched(): void {
    const sessionMode = this.bookingForm.get('sessionMode')?.value;

    if (sessionMode === 'online') {
      const onlineFields = ['childName', 'mobileNumber', 'email'];
      onlineFields.forEach(fieldName => {
        const control = this.bookingForm.get(fieldName);
        if (control) {
          control.markAsTouched();
        }
      });
    } else if (sessionMode === 'login') {
      const loginFields = ['username', 'password'];
      loginFields.forEach(fieldName => {
        const control = this.bookingForm.get(fieldName);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
