import { Component, OnInit } from '@angular/core';
import { StudentDetailsDialogResult } from '../shared/components/student-details-dialog/student-details-dialog.component';
import { NotificationService } from '../shared/services/notification.service';

interface Program {
  id: number;
  category: 'school' | 'competitive';
  badge: string;
  badgeColor: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  duration: string;
  students: string;
  rating: number;
  ratingCount: string;
  tags: string[];
  ctaLabel: string;
  featured: boolean;
}

@Component({
  selector: 'app-student-class-model',
  templateUrl: './student-class-model.component.html',
  styleUrls: ['./student-class-model.component.css']
})
export class StudentClassModelComponent implements OnInit {

  // Dialog state (preserved from original)
  showStudentDialog = false;
  showDemoClassDialog = false;
  dialogData: any = {};
  demoClassData: any = {};

  // Filter + search
  activeFilter: 'all' | 'school' | 'competitive' = 'all';
  searchQuery = '';

  filters = [
    { key: 'all',         label: 'All Programs'     },
    { key: 'school',      label: 'School Programs'   },
    { key: 'competitive', label: 'Competitive Exams' }
  ];

  programs: Program[] = [
    {
      id: 1,
      category: 'school',
      badge: 'Most Popular',
      badgeColor: '#6B4EFF',
      icon: '📐',
      title: 'Mathematics Excellence',
      subtitle: 'Grade 8 – 12',
      description: 'Master algebra, geometry, calculus and ' +
        'statistics with interactive lessons, practice ' +
        'problems and AI-powered doubt resolution.',
      level: 'Intermediate',
      duration: '6 months',
      students: '12,400+',
      rating: 4.8,
      ratingCount: '(1.2K)',
      tags: ['Algebra', 'Calculus', 'Statistics'],
      ctaLabel: 'Explore Now',
      featured: true
    },
    {
      id: 2,
      category: 'school',
      badge: 'New',
      badgeColor: '#0F6E56',
      icon: '🔬',
      title: 'Science & Technology',
      subtitle: 'Grade 6 – 10',
      description: 'Explore physics, chemistry and biology ' +
        'through immersive 3D experiments, video lectures ' +
        'and concept-based assessments.',
      level: 'Beginner',
      duration: '4 months',
      students: '8,700+',
      rating: 4.6,
      ratingCount: '(876)',
      tags: ['Physics', 'Chemistry', 'Biology'],
      ctaLabel: 'Explore Now',
      featured: false
    },
    {
      id: 3,
      category: 'school',
      badge: '',
      badgeColor: '',
      icon: '📖',
      title: 'English Language Mastery',
      subtitle: 'Grade 5 – 12',
      description: 'Build reading comprehension, writing ' +
        'skills and grammar through structured lessons ' +
        'curated by certified language experts.',
      level: 'All Levels',
      duration: '3 months',
      students: '6,200+',
      rating: 4.7,
      ratingCount: '(654)',
      tags: ['Grammar', 'Writing', 'Literature'],
      ctaLabel: 'Explore Now',
      featured: false
    },
    {
      id: 4,
      category: 'competitive',
      badge: 'Top Rated',
      badgeColor: '#854F0B',
      icon: '⚛️',
      title: 'JEE Advanced Prep',
      subtitle: 'IIT JEE — Physics, Chemistry, Maths',
      description: 'Comprehensive JEE preparation with ' +
        '300+ hours of video content, daily practice tests ' +
        'and live doubt sessions with IIT alumni.',
      level: 'Advanced',
      duration: '12 months',
      students: '24,000+',
      rating: 4.9,
      ratingCount: '(3.1K)',
      tags: ['JEE Main', 'JEE Advanced', 'Mock Tests'],
      ctaLabel: 'Explore Now',
      featured: true
    },
    {
      id: 5,
      category: 'competitive',
      badge: '',
      badgeColor: '',
      icon: '🧬',
      title: 'NEET Complete Course',
      subtitle: 'Medical Entrance Examination',
      description: 'Crack NEET with structured Biology, ' +
        'Physics and Chemistry modules, NCERT-aligned ' +
        'content and full-length mock tests.',
      level: 'Advanced',
      duration: '10 months',
      students: '18,500+',
      rating: 4.8,
      ratingCount: '(2.4K)',
      tags: ['Biology', 'NCERT', 'Mock Tests'],
      ctaLabel: 'Explore Now',
      featured: false
    },
    {
      id: 6,
      category: 'competitive',
      badge: 'New',
      badgeColor: '#0F6E56',
      icon: '📊',
      title: 'UPSC Foundation',
      subtitle: 'Civil Services Examination',
      description: 'Begin your UPSC journey with a strong ' +
        'foundation in GS, Current Affairs, Essay writing ' +
        'and optional subject preparation.',
      level: 'Beginner',
      duration: '8 months',
      students: '9,100+',
      rating: 4.7,
      ratingCount: '(980)',
      tags: ['GS Paper', 'Current Affairs', 'Essay'],
      ctaLabel: 'Explore Now',
      featured: false
    }
  ];


  constructor( private notification: NotificationService,) { }

  get filteredPrograms(): Program[] {
    return this.programs.filter(p => {
      const matchCat =
        this.activeFilter === 'all' ||
        p.category === this.activeFilter;
      const matchSearch =
        !this.searchQuery.trim() ||
        p.title.toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        p.tags.some(t =>
          t.toLowerCase()
           .includes(this.searchQuery.toLowerCase())
        );
      return matchCat && matchSearch;
    });
  }

  setFilter(f: string): void {
    this.activeFilter = f as 'all' | 'school' | 'competitive';
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onEnroll(programId: number): void {
    const program = this.programs.find(p => p.id === programId);
    if (program) {
      this.dialogData = {
        courseTitle: program.title,
        courseId: program.id
      };
      this.showStudentDialog = true;
    }
  }

  // Dialog handlers (preserved)
  onDialogClose(): void {
    this.showStudentDialog = false;
    this.dialogData = {};
  }

  onDialogSubmit(result: any): void {
    
    console.log('Student details submitted:', result);
    this.notification.success('Student details submitted successfully!');
    this.showStudentDialog = false;
    // this.dialogData = {};
  }

  onOpenDemoClass(result: StudentDetailsDialogResult): void {
    this.demoClassData = result;
    this.showStudentDialog = false;
    setTimeout(() => {
      this.showDemoClassDialog = true;
    }, 500);
  }

  onDemoClassDialogClose(): void {
    this.showDemoClassDialog = false;
  }

  onDemoClassDialogSubmit(result: any): void {
    console.log('Demo class booking submitted:', result);
    this.notification.success('Demo class booked successfully!');
    this.showDemoClassDialog = false;
  }

  ngOnInit(): void {}
  
}
