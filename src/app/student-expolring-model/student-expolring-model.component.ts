import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

export interface Advantage {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface LearningCard {
  id: number;
  image: string;
  title: string;
  courseNum: string;
  duration: string;
  badge: string;
}

export interface LearningProgram {
  id: number;
  category: string;
  logo: string;
  logoAlt: string;
  programTitle: string;
  description: string;
  rating: number;
  ratingCount: string;
  totalHours: string;
  totalCourses: string;
  ctaLabel: string;
  containerBg: string;
  cards: LearningCard[];
}

@Component({
  selector: 'app-student-expolring-model',
  templateUrl: './student-expolring-model.component.html',
  styleUrls: ['./student-expolring-model.component.css']
})
export class StudentExpolringModelComponent implements OnInit, OnDestroy {

  // Advantages using advantages1,2,3 images
  advantages: Advantage[] = [
    {
      id: 1,
      title: 'Expert Faculty',
      description: 'Learn from experienced teachers and industry experts who bring real-world knowledge and practical insights to help you succeed in your educational journey.',
      image: '../../assets/advantages1.png'
    },
    {
      id: 2,
      title: 'Flexible Learning',
      description: 'Study at your own pace with flexible schedules that adapt to your lifestyle. Access courses anytime, anywhere with our user-friendly online platform.',
      image: '../../assets/advantages2.png'
    },
    {
      id: 3,
      title: 'Career Support',
      description: 'Get comprehensive guidance and support for your career growth with personalized mentoring, resume building, and job placement assistance.',
      image: '../../assets/advantages3.png'
    }
  ];

  // Learning programs (Coursera-style)
  programs: LearningProgram[] = [
    {
      id: 1,
      category: 'School Program',
      logo: 'assets/img/qaroo-logo.png',
      logoAlt: 'Qaroo',
      programTitle: 'Qaroo School Excellence Program',
      description:
        'Master your school curriculum with expert tutors, ' +
        'interactive lessons and AI-powered progress tracking.',
      rating: 4.8,
      ratingCount: '1.2K ratings',
      totalHours: '120 hours',
      totalCourses: '12 courses',
      ctaLabel: 'Explore Program',
      containerBg: '#0a5c5c',
      cards: [
        {
          id: 1,
          image: '../../assets/class 4-10.png',
          title: 'Mathematics Fundamentals',
          courseNum: 'Course 1 of 12',
          duration: '8.5 hours',
          badge: 'Most Popular'
        },
        {
          id: 2,
          image: '../../assets/jee.png',
          title: 'Science & Technology',
          courseNum: 'Course 2 of 12',
          duration: '6.2 hours',
          badge: ''
        },
        {
          id: 3,
          image: '../../assets/neet.png',
          title: 'English Language Mastery',
          courseNum: 'Course 3 of 12',
          duration: '4.8 hours',
          badge: ''
        },
        {
          id: 4,
          image: '../../assets/IAS.png',
          title: 'Social Studies & History',
          courseNum: 'Course 4 of 12',
          duration: '5.1 hours',
          badge: 'New'
        },
        {
          id: 5,
          image: '../../assets/classs 4 - 10.png',
          title: 'Computer Science Basics',
          courseNum: 'Course 5 of 12',
          duration: '7.0 hours',
          badge: ''
        }
      ]
    },
    {
      id: 2,
      category: 'Competitive Exams',
      logo: 'assets/img/qaroo-logo.png',
      logoAlt: 'Qaroo',
      programTitle: 'Qaroo Competitive Exam Prep',
      description:
        'Crack JEE, NEET, UPSC and more with structured ' +
        'study plans, mock tests and expert mentorship.',
      rating: 4.9,
      ratingCount: '2.4K ratings',
      totalHours: '200 hours',
      totalCourses: '18 courses',
      ctaLabel: 'Explore Program',
      containerBg: '#1a3a5c',
      cards: [
        {
          id: 1,
          image: '../../assets/jee.png',
          title: 'JEE Physics — Mechanics',
          courseNum: 'Course 1 of 18',
          duration: '12 hours',
          badge: 'Top Rated'
        },
        {
          id: 2,
          image: '../../assets/neet.png',
          title: 'JEE Chemistry — Organic',
          courseNum: 'Course 2 of 18',
          duration: '9.5 hours',
          badge: ''
        },
        {
          id: 3,
          image: '../../assets/class 4-10.png',
          title: 'JEE Mathematics — Calculus',
          courseNum: 'Course 3 of 18',
          duration: '11 hours',
          badge: ''
        },
        {
          id: 4,
          image: '../../assets/IAS.png',
          title: 'NEET Biology — Botany',
          courseNum: 'Course 4 of 18',
          duration: '8 hours',
          badge: 'New'
        },
        {
          id: 5,
          image: '../../assets/LKG - 3.webp',
          title: 'Full Mock Test Series',
          courseNum: 'Course 5 of 18',
          duration: '15 hours',
          badge: ''
        }
      ]
    }
  ];

  activeProgram = 0;
  canScrollLeft = false;
  canScrollRight = true;

  @ViewChild('cardTrack') cardTrack!: ElementRef<HTMLElement>;

  get current(): LearningProgram {
    return this.programs[this.activeProgram];
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  selectProgram(index: number): void {
    this.activeProgram = index;
    this.resetScroll();
  }

  scrollCards(dir: 'left' | 'right'): void {
    const track = this.cardTrack?.nativeElement;
    if (!track) return;
    const amount = 280;
    track.scrollBy({
      left: dir === 'right' ? amount : -amount,
      behavior: 'smooth'
    });
    setTimeout(() => this.updateScrollState(), 350);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  private resetScroll(): void {
    const track = this.cardTrack?.nativeElement;
    if (track) {
      track.scrollTo({ left: 0, behavior: 'instant' });
    }
    this.canScrollLeft = false;
    this.canScrollRight = true;
  }

  private updateScrollState(): void {
    const track = this.cardTrack?.nativeElement;
    if (!track) return;
    this.canScrollLeft = track.scrollLeft > 0;
    this.canScrollRight =
      track.scrollLeft + track.clientWidth < track.scrollWidth - 4;
  }
}
