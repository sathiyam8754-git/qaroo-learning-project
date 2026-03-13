import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DemoClassDialogData {
  studentName: string;
  mobileNumber: string;
  courseTitle: string;
  courseId: number;
  videoData?: VideoData;
  companyData?: CompanyData;
}

export interface VideoData {
  videoSrc: string;
  posterSrc?: string;
  title: string;
  description: string;
}

export interface CompanyData {
  logoSrc: string;
  companyName: string;
}

export interface DemoClassDialogResult {
  selectedDuration: string;
  selectedDayType: string;
  selectedSlot: string;
  additionalInfo: string;
  studentData: DemoClassDialogData;
}

@Component({
  selector: 'app-demo-class-dialog',
  templateUrl: './demo-class-dialog.component.html',
  styleUrls: ['./demo-class-dialog.component.css']
})
export class DemoClassDialogComponent {
  @Input() show: boolean = false;
  @Input() data: DemoClassDialogData = { studentName: '', mobileNumber: '', courseTitle: '', courseId: 0 };
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<DemoClassDialogResult>();

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  demoForm: FormGroup;
  isPlaying: boolean = false;
  weekdaySlots = [
    '06:00 AM - 07:00 AM',
    '07:30 AM - 08:30 AM',
    '04:00 PM - 05:00 PM',
    '05:30 PM - 06:30 PM',
    '07:00 PM - 08:00 PM',
    '08:30 PM - 09:30 PM'
  ];
  
  weekendSlots = [
    '08:00 AM - 09:00 AM',
    '09:30 AM - 10:30 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM',
    '05:00 PM - 06:00 PM'
  ];

  durationOptions = [
    {
      value: 'monthly',
      title: 'Monthly',
      description: '1 month duration',
      icon: '📅'
    },
    {
      value: 'quarterly',
      title: 'Quarterly',
      description: '3 months duration',
      icon: '📊'
    },
    {
      value: 'half-yearly',
      title: 'Half Yearly',
      description: '6 months duration',
      icon: '📈'
    }
  ];

  currentAvailableSlots: string[] = [];

  // Default video data
  defaultVideoData: VideoData = {
    videoSrc: 'assets/payment-icons/18069235-uhd_3840_2160_24fps.mp4',
    posterSrc: 'assets/payment-icons/video-poster.jpg',
    title: 'Course Demo Video',
    description: 'Watch our course demo video to get started'
  };

  // Default company data
  defaultCompanyData: CompanyData = {
    logoSrc: 'assets/companylogo.jpg',
    companyName: 'QAROO India Private Limited'
  };

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      duration: ['', Validators.required],
      dayType: ['', Validators.required],
      selectedSlot: ['', Validators.required],
      additionalInfo: ['']
    });
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      const result: DemoClassDialogResult = {
        selectedDuration: this.demoForm.value.duration,
        selectedDayType: this.demoForm.value.dayType,
        selectedSlot: this.demoForm.value.selectedSlot,
        additionalInfo: this.demoForm.value.additionalInfo,
        studentData: this.data
      };
      
      this.submit.emit(result);
    } else {
      this.markFormGroupTouched(this.demoForm);
    }
  }

  selectDuration(duration: string): void {
    this.demoForm.get('duration')?.setValue(duration);
    // Clear day type and slot when duration changes
    this.demoForm.get('dayType')?.setValue('');
    this.demoForm.get('selectedSlot')?.setValue('');
    this.currentAvailableSlots = [];
  }

  selectDayType(dayType: string): void {
    this.demoForm.get('dayType')?.setValue(dayType);
    // Clear slot when day type changes
    this.demoForm.get('selectedSlot')?.setValue('');
    this.updateAvailableSlots(dayType);
  }

  updateAvailableSlots(dayType: string): void {
    if (dayType === 'weekday') {
      this.currentAvailableSlots = [...this.weekdaySlots];
    } else if (dayType === 'weekend') {
      this.currentAvailableSlots = [...this.weekendSlots];
    } else {
      this.currentAvailableSlots = [];
    }
  }

  getSelectedDayTypeText(): string {
    const dayType = this.demoForm.value.dayType;
    return dayType ? dayType.charAt(0).toUpperCase() + dayType.slice(1) : '';
  }

  getSelectedDayTypeDescription(): string {
    const dayType = this.demoForm.value.dayType;
    if (dayType === 'weekday') {
      return 'Monday - Friday - After school hours available';
    } else if (dayType === 'weekend') {
      return 'Saturday - Sunday - Relaxed schedule available';
    }
    return '';
  }

  isBookingComplete(): boolean {
    return !!(this.demoForm.value.duration && 
             this.demoForm.value.dayType && 
             this.demoForm.value.selectedSlot);
  }

  getVideoData(): VideoData {
    return this.data.videoData || this.defaultVideoData;
  }

  getVideoSrc(): string {
    return this.getVideoData().videoSrc;
  }

  getPosterSrc(): string {
    return this.getVideoData().posterSrc || 'assets/payment-icons/video-poster.jpg';
  }

  getVideoTitle(): string {
    return this.getVideoData().title;
  }

  getVideoDescription(): string {
    return this.getVideoData().description;
  }

  getCompanyData(): CompanyData {
    return this.data.companyData || this.defaultCompanyData;
  }

  getCompanyLogo(): string {
    return this.getCompanyData().logoSrc;
  }

  getCompanyName(): string {
    return this.getCompanyData().companyName;
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

  openYouTubeVideo(): void {
    // Open YouTube video in new tab
    window.open('https://www.youtube.com/watch?v=your-demo-video-id', '_blank');
  }

  toggleVideo(): void {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  playVideo(): void {
    const video = this.videoPlayer.nativeElement;
    video.play();
    this.isPlaying = true;
  }

  pauseVideo(): void {
    const video = this.videoPlayer.nativeElement;
    video.pause();
    this.isPlaying = false;
  }

  restartVideo(): void {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = 0;
    video.play();
    this.isPlaying = true;
  }
}
