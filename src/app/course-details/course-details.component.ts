import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CourseItem {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  ratingCount: string;
  duration: string;
  lectures: string;
  level: string;
  image: string;
  badge: string;
  highlights: string[];
  isExpanded: boolean;
}

interface LearnItem {
  text: string;
}

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  quote: string;
  rating: number;
}

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  activeTab: 'overview' | 'curriculum' | 'instructor' | 'reviews' = 'overview';

  tabs = [
    { key: 'overview',   label: 'Overview'   },
    { key: 'curriculum', label: 'Curriculum'  },
    { key: 'instructor', label: 'Instructor'  },
    { key: 'reviews',    label: 'Reviews'     }
  ];

  program = {
    category: 'School Program',
    title: 'Qaroo School Excellence Program',
    subtitle:
      'Master your school curriculum with expert tutors, ' +
      'interactive lessons and AI-powered progress tracking.',
    rating: 4.8,
    ratingCount: '1.2K ratings',
    totalHours: '120 hours',
    totalCourses: 12,
    students: '12,400+',
    level: 'Grade 5\u201312',
    lastUpdated: 'March 2026',
    language: 'English, Tamil, Hindi',
    tags: ['Best Seller', 'Updated 2026', 'CBSE & ISC']
  };

  learnItems: LearnItem[] = [
    { text: 'Master Mathematics from basics to advanced calculus' },
    { text: 'Understand Physics, Chemistry and Biology concepts' },
    { text: 'Improve English grammar, writing and comprehension' },
    { text: 'Excel in Social Studies and History subjects' },
    { text: 'Build strong Computer Science fundamentals' },
    { text: 'Prepare strategically for CBSE and ISC board exams' },
    { text: 'Track progress with AI-powered analytics dashboard' },
    { text: 'Get 1-on-1 doubt resolution with expert mentors' }
  ];

  skills = [
    { icon: 'graduation', title: 'Mathematics (Class 1\u201312)', learners: '2.5K learners' },
    { icon: 'graduation', title: 'Science & Technology', learners: '5.8K learners' },
    { icon: 'graduation', title: 'English Language', learners: '230K learners' },
    { icon: 'graduation', title: 'Social Studies', learners: '58K learners' },
    { icon: 'graduation', title: 'Computer Science', learners: '370K learners' },
    { icon: 'graduation', title: 'CBSE Preparation', learners: '180K learners' },
    { icon: 'graduation', title: 'ISC Preparation', learners: '120K learners' },
    { icon: 'graduation', title: 'AI-Powered Learning', learners: '95K learners' }
  ];

  courses: CourseItem[] = [
    {
      id: 1, title: 'Mathematics Fundamentals',
      instructor: 'Dr. Ramesh Kumar', rating: 4.9,
      ratingCount: '(890)', duration: '8.5 hours',
      lectures: '42 lectures', level: 'Beginner',
      image: '../../assets/class 4-10.png',
      badge: 'Most Popular', isExpanded: true,
      highlights: [
        'Number Systems and Algebra basics',
        'Geometry and Mensuration',
        'Trigonometry introduction',
        'Practice tests after every chapter',
        'Downloadable formula sheets'
      ]
    },
    {
      id: 2, title: 'Science & Technology',
      instructor: 'Prof. Anitha Sharma', rating: 4.7,
      ratingCount: '(654)', duration: '6.2 hours',
      lectures: '36 lectures', level: 'Beginner',
      image: '../../assets/jee.png',
      badge: '', isExpanded: false,
      highlights: [
        'Physics \u2014 Motion, Force and Energy',
        'Chemistry \u2014 Elements and Reactions',
        'Biology \u2014 Cell Structure and Functions',
        '3D interactive lab simulations',
        'NCERT-aligned content'
      ]
    },
    {
      id: 3, title: 'English Language Mastery',
      instructor: 'Ms. Priya Nair', rating: 4.8,
      ratingCount: '(512)', duration: '4.8 hours',
      lectures: '28 lectures', level: 'All Levels',
      image: '../../assets/neet.png',
      badge: '', isExpanded: false,
      highlights: [
        'Grammar and Punctuation rules',
        'Reading Comprehension strategies',
        'Essay and creative writing',
        'Spoken English improvement',
        'Literature analysis techniques'
      ]
    },
    {
      id: 4, title: 'Social Studies & History',
      instructor: 'Mr. Vijay Krishnan', rating: 4.6,
      ratingCount: '(380)', duration: '5.1 hours',
      lectures: '32 lectures', level: 'Intermediate',
      image: '../../assets/IAS.png',
      badge: 'New', isExpanded: false,
      highlights: [
        'Indian History \u2014 Ancient to Modern',
        'World Geography and Maps',
        'Political Science and Civics',
        'Current Affairs integration',
        'Map-based exercises'
      ]
    },
    {
      id: 5, title: 'Computer Science Basics',
      instructor: 'Mr. Arjun Dev', rating: 4.9,
      ratingCount: '(720)', duration: '7.0 hours',
      lectures: '44 lectures', level: 'Beginner',
      image: '../../assets/classs 4 - 10.png',
      badge: 'Top Rated', isExpanded: false,
      highlights: [
        'Introduction to Programming',
        'Python for school students',
        'Web basics: HTML and CSS',
        'Database fundamentals',
        'Cyber safety and ethics'
      ]
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Pooja R.', role: 'Grade 10 student, Chennai',
      initials: 'PR', avatarColor: '#6B4EFF',
      quote: 'The Mathematics course completely changed how I understand numbers. I went from 60% to 92% in just 2 months. The mentor sessions are outstanding!',
      rating: 5
    },
    {
      name: 'Brian S.', role: 'Parent, Coimbatore',
      initials: 'BS', avatarColor: '#0F6E56',
      quote: 'My son struggled with Science but Qaroo\'s 3D lab simulations made concepts click instantly. Best investment for his education.',
      rating: 5
    },
    {
      name: 'Ben C.', role: 'Grade 12 student, Mumbai',
      initials: 'BC', avatarColor: '#db2777',
      quote: 'The board exam preparation module is incredibly thorough. Previous year papers, mock tests and detailed solutions \u2014 everything in one place.',
      rating: 5
    }
  ];

  faqs: FaqItem[] = [
    {
      question: 'Who is the Qaroo School Program for?',
      answer: 'This program is designed for students in Grades 5 to 12 following CBSE or ISC curriculum. It is suitable for both regular learners and students preparing for board examinations.',
      isOpen: true
    },
    {
      question: 'How do live doubt sessions work?',
      answer: 'Students can book 1-on-1 sessions with expert mentors through the platform. Sessions are available 7 days a week from 8 AM to 10 PM. Each session is 30\u201345 minutes long.',
      isOpen: false
    },
    {
      question: 'Is content available offline?',
      answer: 'Yes. All video lectures and study materials can be downloaded for offline access through the Qaroo mobile app available on iOS and Android.',
      isOpen: false
    },
    {
      question: 'What certifications do students receive?',
      answer: 'Students who complete each course receive a Qaroo completion certificate. Students completing the full program receive a Qaroo School Excellence Certificate recognised by partner institutions.',
      isOpen: false
    }
  ];

  stats = [
    { num: '12,400+', lbl: 'Students Enrolled' },
    { num: '4.8',     lbl: 'Average Rating'    },
    { num: '120 hrs', lbl: 'Total Content'     },
    { num: '12',      lbl: 'Courses Included'  }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  toggleCourse(id: number): void {
    this.courses = this.courses.map(c => ({
      ...c,
      isExpanded: c.id === id ? !c.isExpanded : false
    }));
  }

  toggleFaq(index: number): void {
    this.faqs = this.faqs.map((f, i) => ({
      ...f,
      isOpen: i === index ? !f.isOpen : false
    }));
  }

  getStars(n: number): number[] {
    return Array(Math.floor(n)).fill(0);
  }

  goBack(): void {
    this.router.navigate(['/student-overall-model']);
  }

  enroll(): void {
    this.router.navigate(['/student-overall-model']);
  }
}
