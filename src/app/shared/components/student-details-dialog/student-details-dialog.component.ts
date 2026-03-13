import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface StudentDetailsDialogData {
  courseTitle: string;
  courseId: number;
}

export interface StudentDetailsDialogResult {
  studentName: string;
  mobileNumber: string;
  courseTitle: string;
  courseId: number;
}

@Component({
  selector: 'app-student-details-dialog',
  templateUrl: './student-details-dialog.component.html',
  styleUrls: ['./student-details-dialog.component.css']
})
export class StudentDetailsDialogComponent {
  @Input() show: boolean = false;
  @Input() data: StudentDetailsDialogData = { courseTitle: '', courseId: 0 };
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<StudentDetailsDialogResult>();
  @Output() openDemoClass = new EventEmitter<StudentDetailsDialogResult>();

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      studentName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const result: StudentDetailsDialogResult = {
        studentName: this.studentForm.value.studentName,
        mobileNumber: this.studentForm.value.mobileNumber,
        courseTitle: this.data.courseTitle,
        courseId: this.data.courseId
      };
      
      // Emit both submit and openDemoClass events
      this.submit.emit(result);
      this.openDemoClass.emit(result);
    } else {
      this.markFormGroupTouched(this.studentForm);
    }
  }

  onCancel(): void {
    this.close.emit();
  }

  onOverlayClick(): void {
    this.close.emit();
  }

  onDialogClick(event: Event): void {
    event.stopPropagation();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getStudentNameErrorMessage(): string {
    const nameControl = this.studentForm.get('studentName');
    if (nameControl?.errors && nameControl.touched) {
      if (nameControl.errors['required']) {
        return 'Student name is required';
      }
    }
    return '';
  }

  getMobileNumberErrorMessage(): string {
    const mobileControl = this.studentForm.get('mobileNumber');
    if (mobileControl?.errors && mobileControl.touched) {
      if (mobileControl.errors['required']) {
        return 'Mobile number is required';
      }
      if (mobileControl.errors['pattern']) {
        return 'Please enter a valid 10-digit mobile number';
      }
    }
    return '';
  }
}
